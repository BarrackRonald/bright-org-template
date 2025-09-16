import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const about = await prisma.about.findFirst();

    if (!about) {
      return NextResponse.json({ error: "About record not found" }, { status: 404 });
    }

    const updated = await prisma.about.update({
      where: { id: about.id },
      data: {
        ctaTitle: data.ctaTitle,
        ctaMessage: data.ctaMessage,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update CTA" }, { status: 500 });
  }
}
