import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const stat = await prisma.impactStat.create({ data });
    return NextResponse.json(stat);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create stat" }, { status: 500 });
  }
}
