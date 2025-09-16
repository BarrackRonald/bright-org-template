import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const orderNum = parseInt(formData.get("orderNum") as string, 10) || 0;

    let photoUrl: string | null = null;
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
    }

    const member = await prisma.teamMember.create({
      data: { name, role, bio, orderNum, photoUrl },
    });

    return NextResponse.json(member);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
