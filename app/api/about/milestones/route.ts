import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const year = parseInt(formData.get("year") as string);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    let imageUrl: string | null = null;

    if (formData.get("image") instanceof File) {
      const file = formData.get("image") as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads", "milestones");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/milestones/${file.name}`;
    }

    const milestone = await prisma.milestone.create({
      data: { year, title, description, imageUrl },
    });

    return NextResponse.json(milestone);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add milestone" }, { status: 500 });
  }
}
