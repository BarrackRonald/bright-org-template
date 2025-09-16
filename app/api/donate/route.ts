import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { donorName, donorEmail, amount, method, anonymous } = data;

    const donation = await prisma.donation.create({
      data: {
        donorName: anonymous ? "Anonymous" : donorName,
        donorEmail: anonymous ? null : donorEmail,
        amount: parseFloat(amount),
        method,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error("❌ Error creating donation:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
