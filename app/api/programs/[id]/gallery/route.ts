import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const program = await prisma.program.findUnique({
    where: { id: Number(params.id) },
    include: { coordinator: true, gallery: true, stats: true, testimonials: true },
  });
  return NextResponse.json(program);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.formData();
  const program = await prisma.program.update({
    where: { id: Number(params.id) },
    data: {
      title: data.get("title") as string,
      slug: data.get("slug") as string,
      summary: data.get("summary") as string,
      content: data.get("content") as string,
      category: data.get("category") as string,
      tags: data.get("tags") as string,
      videoUrl: data.get("videoUrl") as string,
      donationLink: data.get("donationLink") as string,
      signupLink: data.get("signupLink") as string,
      coordinatorId: data.get("coordinatorId") ? Number(data.get("coordinatorId")) : null,
      position: Number(data.get("position") ?? 0),
      isPublished: data.get("isPublished") === "true",
      imageUrl: data.get("image") ? `/uploads/programs/${Date.now()}-${(data.get("image") as File).name}` : undefined,
    },
  });
  return NextResponse.json(program);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.program.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
