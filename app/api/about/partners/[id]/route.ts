import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const website = formData.get("website") as string;

    let logoUrl = existing.logoUrl;

    const file = formData.get("logo");
    if (file && typeof (file as File).arrayBuffer === "function") {
      const f = file as File;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "partners");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${f.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await f.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      logoUrl = `/uploads/partners/${fileName}`;

      // delete old file if exists
      if (existing.logoUrl) {
        const oldPath = path.join(process.cwd(), "public", existing.logoUrl.replace(/^\//, ""));
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (err) {
            console.warn("Could not delete old logo:", err);
          }
        }
      }
    }

    const updated = await prisma.partner.update({
      where: { id },
      data: { name, website, logoUrl },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const partner = await prisma.partner.findUnique({ where: { id } });
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (partner.logoUrl) {
      const possiblePath = path.join(process.cwd(), "public", partner.logoUrl.replace(/^\//, ""));
      if (fs.existsSync(possiblePath)) {
        try {
          fs.unlinkSync(possiblePath);
        } catch (err) {
          console.warn("Failed to delete logo:", err);
        }
      }
    }

    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
