"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PayPalPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "10.00";
  const donorName = searchParams.get("name") || "Anonymous";
  const donorEmail = searchParams.get("email");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.paypal) {
        // @ts-ignore
        window.paypal.Buttons({
          createOrder: async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount }),
            });
            const data = await res.json();
            return data.id;
          },
          onApprove: async (data: any) => {
            await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderID,
                donorName,
                donorEmail,
                amount,
              }),
            });
            alert("✅ Donation completed! Thank you.");
          },
        }).render("#paypal-button-container");
      }
    };
    document.body.appendChild(script);
  }, [amount, donorName, donorEmail]);

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6">Donate with PayPal</h1>
      <p className="mb-4">
        You are donating <strong>${amount}</strong> via{" "}
        <strong>PayPal’s secure checkout</strong>.
      </p>
      <div id="paypal-button-container" />
    </div>
  );
}
