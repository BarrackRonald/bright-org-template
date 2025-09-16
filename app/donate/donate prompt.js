before that let's modify donate page to redirect to the right donation pages istead of the mock. here is the donation page.tsx: "use client";

import { useState } from "react";

export default function DonatePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const donation = {
      name: isAnonymous ? "Anonymous" : formData.get("name")?.toString(),
      email: isAnonymous ? null : formData.get("email")?.toString(),
      amount: formData.get("amount")?.toString() || "0",
      method: formData.get("method")?.toString() || "M-Pesa",
    };

    // Save to DB
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });

      if (!res.ok) throw new Error("Failed to save donation");

      const { donation: savedDonation } = await res.json();

      // --- Mock payment redirect based on method ---
      if (donation.method === "M-Pesa") {
        setStatus("📱 Redirecting to M-Pesa payment...");
      } else if (donation.method === "PayPal") {
        setStatus("🌍 Redirecting to PayPal checkout...");
      } else if (donation.method === "Card") {
        setStatus("💳 Redirecting to secure card payment...");
      } else {
        setStatus("✅ Donation recorded, thank you!");
      }

      console.log("Saved donation:", savedDonation);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to process donation. Please try again.");
    }

    e.currentTarget.reset();
    setIsAnonymous(false);
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Support Our Mission</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 shadow rounded-lg"
      >
        {/* Anonymous Toggle */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <span>Donate anonymously</span>
        </label>

        {/* Show name/email only if not anonymous */}
        {!isAnonymous && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded"
              required
            />
          </>
        )}

        {/* Amount */}
        <input
          name="amount"
          type="number"
          placeholder="Donation Amount (KES)"
          className="w-full border p-3 rounded"
          required
        />

        {/* Method */}
        <select
          name="method"
          className="w-full border p-3 rounded"
          required
        >
          <option value="">-- Select Payment Method --</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="PayPal">PayPal</option>
          <option value="Card">Card</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 w-full"
        >
          Donate Now
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center font-medium text-blue-600">{status}</p>
      )}
    </div>
  );
}   while redirecting to the pages it is still important to tell users that it is directing to secure page.