import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const data = await req.formData();
  const saved = await prisma.programTestimonial.create({
    data: {
      programId: Number(params.id),
      name: data.get("name") as string,
      role: (data.get("role") as string) ?? "",
      message: data.get("message") as string,
      photoUrl: data.get("photo") ? `/uploads/programs/testimonials/${Date.now()}-${(data.get("photo") as File).name}` : null,
    },
  });
  return NextResponse.json(saved);
}
