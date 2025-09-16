// app/api/about/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Upsert single about record (we assume one record)
    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: data,
      create: data,
    });

    return NextResponse.json(about);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update About" }, { status: 500 });
  }
}
