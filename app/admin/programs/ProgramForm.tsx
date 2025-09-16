"use client";

import { useState } from "react";

export default function ProgramForm({ program, team, onSaved }: any) {
  const [form, setForm] = useState({
    title: program?.title ?? "",
    slug: program?.slug ?? "",
    summary: program?.summary ?? "",
    content: program?.content ?? "",
    category: program?.category ?? "",
    tags: program?.tags ?? "",
    videoUrl: program?.videoUrl ?? "",
    donationLink: program?.donationLink ?? "",
    signupLink: program?.signupLink ?? "",
    coordinatorId: program?.coordinatorId ?? "",
    isPublished: program?.isPublished ?? false,
    position: program?.position ?? 0,
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e: any) => {
    if (e.target.files?.[0]) {
      setForm((s) => ({ ...s, image: e.target.files[0] }));
    }
  };

  const saveProgram = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null) fd.append(k, String(v));
      });
      if (form.image) fd.append("image", form.image);

      const url = program?.id
        ? `/api/programs/${program.id}`
        : "/api/programs";
      const method = program?.id ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Failed to save program");
      const saved = await res.json();
      onSaved(saved);
    } catch (err) {
      console.error(err);
      alert("Error saving program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={saveProgram} className="space-y-4">
      <h2 className="text-xl font-semibold text-emerald-600">
        {program?.id ? "Edit Program" : "Add Program"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="unique-url-slug"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Summary</label>
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Video URL</label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Donation Link</label>
          <input
            name="donationLink"
            value={form.donationLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Signup Link</label>
          <input
            name="signupLink"
            value={form.signupLink}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Coordinator</label>
          <select
            name="coordinatorId"
            value={form.coordinatorId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- None --</option>
            {team.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Order</label>
          <input
            type="number"
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          <label className="text-sm">Published</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={6}
        />
      </div>

      <button
        disabled={loading}
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        {loading ? "Saving..." : "Save Program"}
      </button>
    </form>
  );
}
