import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const saved = await prisma.programStat.create({
    data: { programId: Number(params.id), ...body },
  });
  return NextResponse.json(saved);
}
