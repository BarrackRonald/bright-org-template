// app/admin/about/MilestonesManager.tsx
"use client";

import { useState } from "react";

export default function MilestonesManager({ initialMilestones }: any) {
  const [milestones, setMilestones] = useState(initialMilestones ?? []);
  const [form, setForm] = useState({
    year: "",
    title: "",
    description: "",
    image: null as File | null,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setForm((s) => ({ ...s, image: e.target.files[0] }));
    }
  };

  const resetForm = () => {
    setForm({ year: "", title: "", description: "", image: null });
    setEditingId(null);
    (document.getElementById("milestone-image") as HTMLInputElement | null)?.value &&
      ((document.getElementById("milestone-image") as HTMLInputElement).value = "");
  };

  const onAddOrUpdate = async (e: any) => {
    e.preventDefault();
    if (!form.year || !form.title || !form.description) {
      alert("Please fill year, title and description.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("year", String(form.year));
      fd.append("title", form.title);
      fd.append("description", form.description);
      if (form.image) fd.append("image", form.image);

      let url = "/api/about/milestones";
      let method: "POST" | "PUT" = "POST";
      if (editingId) {
        url = `/api/about/milestones/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        body: fd,
      });
      if (!res.ok) throw new Error("Failed to save milestone");
      const saved = await res.json();

      if (editingId) {
        setMilestones((m: any[]) => m.map((x) => (x.id === editingId ? saved : x)));
      } else {
        setMilestones((m: any[]) => [...m, saved]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving milestone");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this milestone?")) return;
    try {
      const res = await fetch(`/api/about/milestones/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setMilestones((m: any[]) => m.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting milestone");
    }
  };

  const startEdit = (m: any) => {
    setEditingId(m.id);
    setForm({
      year: m.year,
      title: m.title,
      description: m.description,
      image: null,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-emerald-600">Milestones / Timeline</h2>

      {/* List */}
      <div className="space-y-3">
        {milestones.length === 0 && <p className="text-sm text-gray-500">No milestones added yet.</p>}
        {milestones.map((m: any) => (
          <div key={m.id} className="flex items-start gap-4 border rounded p-3 bg-emerald-50">
            <div className="w-24 text-center">
              <div className="text-2xl font-bold">{m.year}</div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-sm text-gray-700">{m.description}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(m)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(m.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {m.imageUrl && (
                <img src={m.imageUrl} alt={m.title} className="h-20 mt-3 rounded object-cover" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add or Edit */}
      <form onSubmit={onAddOrUpdate} className="bg-white p-4 rounded border border-emerald-100">
        <h3 className="font-medium mb-3">
          {editingId ? "Edit Milestone" : "Add New Milestone"}
        </h3>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              type="number"
              className="w-full p-2 border rounded"
              placeholder="e.g. 2023"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Milestone title"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="Describe the milestone."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <input
              id="milestone-image"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload will replace existing image if selected.
            </p>
          </div>

          <div className="md:col-span-2 flex items-end gap-2">
            <button
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              {loading ? "Saving..." : editingId ? "Update Milestone" : "Add Milestone"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
