import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all programs
export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: { coordinator: true },
      orderBy: { position: "asc" },
    });
    return NextResponse.json(programs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// CREATE program
export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const program = await prisma.program.create({
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
        imageUrl: data.get("image") ? `/uploads/programs/${Date.now()}-${(data.get("image") as File).name}` : null,
      },
    });
    return NextResponse.json(program);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
