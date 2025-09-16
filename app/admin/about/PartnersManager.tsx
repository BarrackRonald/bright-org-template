"use client";

import { useState } from "react";

export default function PartnersManager({ partners: initialPartners }: any) {
  const [partners, setPartners] = useState(initialPartners ?? []);
  const [form, setForm] = useState({
    name: "",
    website: "",
    logo: null as File | null,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setForm((s) => ({ ...s, logo: e.target.files[0] }));
    }
  };

  const resetForm = () => {
    setForm({ name: "", website: "", logo: null });
    setEditingId(null);
    const fileInput = document.getElementById(
      "partner-logo"
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const savePartner = async (e: any) => {
    e.preventDefault();
    if (!form.name) {
      alert("Please enter partner name.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("website", form.website);
      if (form.logo) fd.append("logo", form.logo);

      const url = editingId
        ? `/api/about/partners/${editingId}`
        : "/api/about/partners";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Failed to save partner");
      const saved = await res.json();

      if (editingId) {
        setPartners((p: any[]) => p.map((x) => (x.id === editingId ? saved : x)));
      } else {
        setPartners((p: any[]) => [...p, saved]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving partner");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setForm({ name: p.name, website: p.website ?? "", logo: null });
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this partner?")) return;
    try {
      const res = await fetch(`/api/about/partners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPartners((p: any[]) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting partner");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-pink-600">Partners</h2>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {partners.length === 0 && (
          <p className="text-sm text-gray-500">No partners added yet.</p>
        )}
        {partners.map((p: any) => (
          <div
            key={p.id}
            className="flex items-center justify-between border rounded p-3 bg-pink-50"
          >
            <div className="flex items-center gap-3">
              {p.logoUrl && (
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="h-10 w-20 object-contain rounded bg-white"
                />
              )}
              <div>
                <p className="font-semibold">{p.name}</p>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    className="text-sm text-blue-600 underline"
                  >
                    {p.website}
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(p)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
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
        onSubmit={savePartner}
        className="bg-white p-4 rounded border border-pink-200"
      >
        <h3 className="font-medium mb-3">
          {editingId ? "Edit Partner" : "Add New Partner"}
        </h3>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Partner name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              id="partner-logo"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            disabled={loading}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            {loading ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
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
