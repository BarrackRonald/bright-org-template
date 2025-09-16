"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Import from react-quill-new instead of react-quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function ArticleForm({ article, onBack, onSaved }: any) {
  const [form, setForm] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "", // will be HTML from Quill
    coverUrl: article?.coverUrl || "",
    isPublished: article?.isPublished || false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (value: string) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v as any));

    if (article?.id) {
      await fetch(`/api/articles/${article.id}`, { method: "PUT", body: fd });
    } else {
      await fetch("/api/articles", { method: "POST", body: fd });
    }
    onSaved(form);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <button
        onClick={onBack}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-4">
        {article?.id ? "Edit Article" : "New Article"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Content (Quill) */}
        <div>
          <label className="block text-sm font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={handleContentChange}
            className="bg-white"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            name="cover"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setForm((prev) => ({ ...prev, coverUrl: file.name }));
            }}
          />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          <label>Publish</label>
        </div>

        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
}
