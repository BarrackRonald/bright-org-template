import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// UPDATE article
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.formData();

    let coverUrl: string | undefined;
    const cover = data.get("cover") as File | null;

    if (cover) {
      const bytes = Buffer.from(await cover.arrayBuffer());
      const fileName = `${Date.now()}-${cover.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", "articles", fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, bytes);
      coverUrl = `/uploads/articles/${fileName}`;
    }

    const article = await prisma.article.update({
      where: { id: Number(params.id) },
      data: {
        title: data.get("title") as string,
        slug: data.get("slug") as string,
        excerpt: (data.get("excerpt") as string) ?? "",
        content: (data.get("content") as string) ?? "",
        isPublished: data.get("isPublished") === "true",
        publishedAt: data.get("isPublished") === "true" ? new Date() : null,
        ...(coverUrl && { coverUrl }),
      },
    });

    return NextResponse.json(article);
  } catch (err) {
    console.error("PUT /api/articles/[id] error:", err);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
