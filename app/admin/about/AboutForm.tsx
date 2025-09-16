// app/admin/about/AboutForm.tsx
"use client";

import { useState } from "react";

export default function AboutForm({ about }: any) {
  const [form, setForm] = useState({
    history: about?.history ?? "",
    mission: about?.mission ?? "",
    vision: about?.vision ?? "",
    objectives: about?.objectives ?? "",
    coreValues: about?.coreValues ?? "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("About content updated");
    } catch (err) {
      console.error(err);
      alert("Error updating About content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSave} className="space-y-4">
      <h2 className="text-xl font-semibold text-sky-600">Main About Content</h2>

      <div>
        <label className="block text-sm font-medium mb-1">History (Who we are)</label>
        <textarea
          name="history"
          value={form.history}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 border rounded bg-sky-50"
          placeholder="Write the organisation history..."
        />
        <p className="text-xs text-gray-500 mt-1">Shown on the About page hero section.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Mission</label>
          <textarea
            name="mission"
            value={form.mission}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded bg-sky-50"
            placeholder="Organization mission..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vision</label>
          <textarea
            name="vision"
            value={form.vision}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded bg-sky-50"
            placeholder="Organization vision..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Objectives</label>
        <textarea
          name="objectives"
          value={form.objectives}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded bg-sky-50"
          placeholder="Objectives separated by new lines..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Core Values (comma separated)</label>
        <input
          name="coreValues"
          value={form.coreValues}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-sky-50"
          placeholder="Integrity, Inclusion, Innovation..."
        />
        <p className="text-xs text-gray-500 mt-1">Displayed as pills on the About page.</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          {loading ? "Saving..." : "Save About Content"}
        </button>
        <button
          type="button"
          onClick={() => {
            setForm({
              history: about?.history ?? "",
              mission: about?.mission ?? "",
              vision: about?.vision ?? "",
              objectives: about?.objectives ?? "",
              coreValues: about?.coreValues ?? "",
            });
          }}
          className="px-4 py-2 border rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
