"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      e.currentTarget.reset();
    } else {
      setStatus("❌ Failed to send message.");
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-lg">
        <input name="name" placeholder="Your Name" required className="w-full border p-3 rounded" />
        <input name="email" type="email" placeholder="Your Email" required className="w-full border p-3 rounded" />
        <input name="subject" placeholder="Subject" className="w-full border p-3 rounded" />
        <textarea name="message" placeholder="Message" required rows={5} className="w-full border p-3 rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
