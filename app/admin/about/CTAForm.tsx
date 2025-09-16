"use client";

import { useState } from "react";

export default function CTAForm({ about }: any) {
  const [form, setForm] = useState({
    ctaTitle: about?.ctaTitle ?? "",
    ctaMessage: about?.ctaMessage ?? "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const saveCTA = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/about/cta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save CTA");
      alert("CTA updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving CTA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={saveCTA} className="space-y-4">
      <h2 className="text-xl font-semibold text-green-600">Call To Action (CTA)</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="ctaTitle"
          value={form.ctaTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="CTA title (e.g. Support Our Work)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          name="ctaMessage"
          value={form.ctaMessage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="CTA message content"
        />
      </div>

      <button
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Saving..." : "Save CTA"}
      </button>
    </form>
  );
}
