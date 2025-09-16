import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// CREATE article
export async function POST(req: Request) {
  try {
    const data = await req.formData();

    let coverUrl: string | null = null;
    const cover = data.get("cover") as File | null;

    if (cover) {
      const bytes = Buffer.from(await cover.arrayBuffer());
      const fileName = `${Date.now()}-${cover.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", "articles", fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, bytes);
      coverUrl = `/uploads/articles/${fileName}`;
    }

    const article = await prisma.article.create({
      data: {
        title: data.get("title") as string,
        slug: data.get("slug") as string,
        excerpt: (data.get("excerpt") as string) ?? "",
        content: (data.get("content") as string) ?? "",
        isPublished: data.get("isPublished") === "true",
        publishedAt: data.get("isPublished") === "true" ? new Date() : null,
        coverUrl,
      },
    });

    return NextResponse.json(article);
  } catch (err) {
    console.error("POST /api/articles error:", err);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
