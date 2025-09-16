"use client";

import { useState } from "react";

export default function QuoteForm({ about }: any) {
  const [form, setForm] = useState({
    quoteText: about?.quoteText ?? "",
    quoteAuthor: about?.quoteAuthor ?? "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const saveQuote = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/about/quote", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save quote");
      alert("Quote updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={saveQuote} className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-600">Inspirational Quote</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Quote</label>
        <textarea
          name="quoteText"
          value={form.quoteText}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Enter inspirational quote"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          name="quoteAuthor"
          value={form.quoteAuthor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Quote author"
        />
      </div>

      <button
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {loading ? "Saving..." : "Save Quote"}
      </button>
    </form>
  );
}
