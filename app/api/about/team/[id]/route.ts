import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function PUT(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const orderNum = parseInt(formData.get("orderNum") as string, 10) || 0;

    let photoUrl = existing.photoUrl;

    const file = formData.get("photo");
    if (file && typeof (file as File).arrayBuffer === "function") {
      const f = file as File;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "team");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${f.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await f.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      photoUrl = `/uploads/team/${fileName}`;

      // remove old photo
      if (existing.photoUrl) {
        const oldPath = path.join(process.cwd(), "public", existing.photoUrl.replace(/^\//, ""));
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (err) {
            console.warn("Could not delete old photo:", err);
          }
        }
      }
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: { name, role, bio, orderNum, photoUrl },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (member.photoUrl) {
      const possiblePath = path.join(process.cwd(), "public", member.photoUrl.replace(/^\//, ""));
      if (fs.existsSync(possiblePath)) {
        try {
          fs.unlinkSync(possiblePath);
        } catch (err) {
          console.warn("Failed to delete photo:", err);
        }
      }
    }

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
