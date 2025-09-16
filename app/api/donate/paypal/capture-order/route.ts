import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderId, donorName, donorEmail, amount } = await req.json();

  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const auth = Buffer.from(clientId + ":" + secret).toString("base64");

  // Get access token
  const tokenRes = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const { access_token } = await tokenRes.json();

  // Capture payment
  const captureRes = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const capture = await captureRes.json();

  // Save donation in DB
  await prisma.donation.create({
    data: {
      donorName: donorName || null,
      donorEmail: donorEmail || null,
      amount: parseFloat(amount),
      currency: "USD",
      method: "PayPal",
      transactionId: capture.id,
      status: capture.status === "COMPLETED" ? "completed" : "pending",
    },
  });

  return NextResponse.json(capture);
}
