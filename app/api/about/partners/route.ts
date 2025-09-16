import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const website = formData.get("website") as string;

    let logoUrl: string | null = null;
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
    }

    const partner = await prisma.partner.create({
      data: { name, website, logoUrl },
    });

    return NextResponse.json(partner);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
