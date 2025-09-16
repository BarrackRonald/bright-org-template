"use client";

import { useState } from "react";

export default function ProgramStatsManager({ stats: initialStats, programId }: any) {
  const [stats, setStats] = useState(initialStats ?? []);
  const [form, setForm] = useState({ label: "", value: "", description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const saveStat = async (e: any) => {
    e.preventDefault();
    const payload = {
      label: form.label,
      value: parseInt(form.value, 10),
      description: form.description,
    };

    const url = editingId
      ? `/api/programs/${programId}/stats/${editingId}`
      : `/api/programs/${programId}/stats`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const saved = await res.json();
    if (editingId) {
      setStats((prev: any[]) => prev.map((s) => (s.id === saved.id ? saved : s)));
    } else {
      setStats((prev: any[]) => [...prev, saved]);
    }
    setForm({ label: "", value: "", description: "" });
    setEditingId(null);
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
    await fetch(`/api/programs/${programId}/stats/${id}`, { method: "DELETE" });
    setStats((prev: any[]) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-emerald-600">Program Stats</h2>

      {stats.map((s: any) => (
        <div key={s.id} className="flex justify-between border p-2 rounded bg-emerald-50">
          <div>
            <p>
              <strong>{s.label}</strong>: {s.value}
            </p>
            {s.description && <p className="text-sm">{s.description}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(s)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Edit</button>
            <button onClick={() => onDelete(s.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
          </div>
        </div>
      ))}

      <form onSubmit={saveStat} className="space-y-3 bg-white p-4 rounded border">
        <h3>{editingId ? "Edit Stat" : "Add Stat"}</h3>
        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          placeholder="Label"
          className="w-full border p-2 rounded"
        />
        <input
          name="value"
          type="number"
          value={form.value}
          onChange={handleChange}
          placeholder="Value"
          className="w-full border p-2 rounded"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded">
          {editingId ? "Update" : "Add Stat"}
        </button>
      </form>
    </div>
  );
}
