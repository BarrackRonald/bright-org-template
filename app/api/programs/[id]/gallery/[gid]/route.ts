import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: { gid: string } }) {
  await prisma.programGallery.delete({ where: { id: Number(params.gid) } });
  return NextResponse.json({ success: true });
}
