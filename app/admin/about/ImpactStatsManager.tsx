"use client";

import { useState } from "react";

export default function ImpactStatsManager({ stats: initialStats }: any) {
  const [stats, setStats] = useState(initialStats ?? []);
  const [form, setForm] = useState({ label: "", value: "", description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const resetForm = () => {
    setForm({ label: "", value: "", description: "" });
    setEditingId(null);
  };

  const saveStat = async (e: any) => {
    e.preventDefault();
    if (!form.label || !form.value) {
      alert("Please fill label and value.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        editingId ? `/api/about/stats/${editingId}` : "/api/about/stats",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: form.label,
            value: parseInt(form.value),
            description: form.description,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to save stat");
      const saved = await res.json();

      if (editingId) {
        setStats((s: any[]) => s.map((x) => (x.id === editingId ? saved : x)));
      } else {
        setStats((s: any[]) => [...s, saved]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving stat");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setForm({
      label: s.label,
      value: String(s.value),
      description: s.description ?? "",
    });
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this stat?")) return;
    try {
      const res = await fetch(`/api/about/stats/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setStats((s: any[]) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting stat");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-purple-600">Impact Stats</h2>

      {/* List */}
      <div className="space-y-2">
        {stats.length === 0 && (
          <p className="text-sm text-gray-500">No stats added yet.</p>
        )}
        {stats.map((s: any) => (
          <div
            key={s.id}
            className="flex justify-between items-center border rounded p-3 bg-purple-50"
          >
            <div>
              <p className="font-semibold">
                {s.label}: {s.value}
              </p>
              {s.description && (
                <p className="text-sm text-gray-600">{s.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(s)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(s.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      <form
        onSubmit={saveStat}
        className="bg-white p-4 rounded border border-purple-200"
      >
        <h3 className="font-medium mb-3">
          {editingId ? "Edit Stat" : "Add New Stat"}
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              name="label"
              value={form.label}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. Youths Trained"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="number"
              name="value"
              value={form.value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Extra details..."
            />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Stat"
              : "Add Stat"}
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
      </form>
    </div>
  );
}
