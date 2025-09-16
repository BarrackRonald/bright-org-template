import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { tid: string } }) {
  const data = await req.formData();
  const saved = await prisma.programTestimonial.update({
    where: { id: Number(params.tid) },
    data: {
      name: data.get("name") as string,
      role: (data.get("role") as string) ?? "",
      message: data.get("message") as string,
      photoUrl: data.get("photo") ? `/uploads/programs/testimonials/${Date.now()}-${(data.get("photo") as File).name}` : undefined,
    },
  });
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: { tid: string } }) {
  await prisma.programTestimonial.delete({ where: { id: Number(params.tid) } });
  return NextResponse.json({ success: true });
}
