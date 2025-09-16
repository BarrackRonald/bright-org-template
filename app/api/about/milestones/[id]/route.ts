// app/api/about/milestones/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await prisma.milestone.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const formData = await req.formData();

    const year = parseInt(formData.get("year") as string);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    let imageUrl = existing.imageUrl;

    const file = formData.get("image");
    if (file && typeof (file as File).arrayBuffer === "function") {
      const f = file as File;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "milestones");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${f.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await f.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/milestones/${fileName}`;

      // delete old file if existed
      if (existing.imageUrl) {
        const oldPath = path.join(process.cwd(), "public", existing.imageUrl.replace(/^\//, ""));
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (err) {
            console.warn("Could not delete old milestone image:", err);
          }
        }
      }
    }

    const updated = await prisma.milestone.update({
      where: { id },
      data: { year, title, description, imageUrl },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const milestone = await prisma.milestone.findUnique({ where: { id } });
    if (!milestone) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (milestone.imageUrl) {
      const possiblePath = path.join(process.cwd(), "public", milestone.imageUrl.replace(/^\//, ""));
      if (fs.existsSync(possiblePath)) {
        try {
          fs.unlinkSync(possiblePath);
        } catch (err) {
          console.warn("Failed to delete milestone image:", err);
        }
      }
    }

    await prisma.milestone.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete milestone" }, { status: 500 });
  }
}
