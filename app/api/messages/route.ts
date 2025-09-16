import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const data: any = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") data[key] = value;
    });

    // Handle file uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const saveFile = async (file: File, name: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);
      data[name] = `/uploads/${file.name}`;
    };

    if (formData.get("logo") instanceof File) {
      await saveFile(formData.get("logo") as File, "logoUrl");
    }
    if (formData.get("hero") instanceof File) {
      await saveFile(formData.get("hero") as File, "heroImageUrl");
    }

    // Upsert settings (only one record)
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: data,
    });

    return NextResponse.json(settings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
