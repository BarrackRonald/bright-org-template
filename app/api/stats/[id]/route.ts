import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const data = await req.json();
    const updated = await prisma.impactStat.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update stat" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params?: { id?: string } }) {
  try {
    const id = params?.id ? parseInt(params.id, 10) : null;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.impactStat.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete stat" }, { status: 500 });
  }
}
