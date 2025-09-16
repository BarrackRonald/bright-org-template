"use client";

import { useState } from "react";

export default function ProgramTestimonialsManager({ testimonials: initial, programId }: any) {
  const [testimonials, setTestimonials] = useState(initial ?? []);
  const [form, setForm] = useState({ name: "", role: "", message: "", photo: null as File | null });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };
  const handleFile = (e: any) => {
    if (e.target.files?.[0]) setForm((s) => ({ ...s, photo: e.target.files[0] }));
  };

  const saveTestimonial = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("message", form.message);
    if (form.photo) fd.append("photo", form.photo);

    const url = editingId
      ? `/api/programs/${programId}/testimonials/${editingId}`
      : `/api/programs/${programId}/testimonials`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    const saved = await res.json();
    if (editingId) {
      setTestimonials((prev: any[]) =>
        prev.map((t) => (t.id === saved.id ? saved : t))
      );
    } else {
      setTestimonials((prev: any[]) => [...prev, saved]);
    }
    setForm({ name: "", role: "", message: "", photo: null });
    setEditingId(null);
  };

  const startEdit = (t: any) => {
    setEditingId(t.id);
    setForm({ name: t.name, role: t.role ?? "", message: t.message, photo: null });
  };

  const onDelete = async (id: number) => {
    await fetch(`/api/programs/${programId}/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev: any[]) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-emerald-600">Program Testimonials</h2>

      {testimonials.map((t: any) => (
        <div key={t.id} className="flex justify-between border p-2 rounded bg-emerald-50">
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm">{t.role}</p>
            <p className="text-gray-700">{t.message}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(t)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Edit</button>
            <button onClick={() => onDelete(t.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
          </div>
        </div>
      ))}

      <form onSubmit={saveTestimonial} className="space-y-3 bg-white p-4 rounded border">
        <h3>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role (optional)"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={3}
          className="w-full border p-2 rounded"
        />
        <input type="file" onChange={handleFile} />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded">
          {editingId ? "Update" : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}
