"use client";

import { useState } from "react";

export default function TeamManager({ team: initialTeam }: any) {
  const [team, setTeam] = useState(initialTeam ?? []);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    orderNum: 0,
    photo: null as File | null,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setForm((s) => ({ ...s, photo: e.target.files[0] }));
    }
  };

  const resetForm = () => {
    setForm({ name: "", role: "", bio: "", orderNum: 0, photo: null });
    setEditingId(null);
    const fileInput = document.getElementById(
      "team-photo"
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  const saveMember = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      alert("Name and role are required.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("bio", form.bio);
      fd.append("orderNum", String(form.orderNum));
      if (form.photo) fd.append("photo", form.photo);

      const url = editingId
        ? `/api/about/team/${editingId}`
        : "/api/about/team";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error("Failed to save team member");
      const saved = await res.json();

      if (editingId) {
        setTeam((t: any[]) => t.map((x) => (x.id === editingId ? saved : x)));
      } else {
        setTeam((t: any[]) => [...t, saved]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving team member");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (m: any) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      orderNum: m.orderNum ?? 0,
      photo: null,
    });
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this team member?")) return;
    try {
      const res = await fetch(`/api/about/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTeam((t: any[]) => t.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting team member");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-indigo-600">Team</h2>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {team.length === 0 && (
          <p className="text-sm text-gray-500">No team members added yet.</p>
        )}
        {team.map((m: any) => (
          <div
            key={m.id}
            className="flex items-center justify-between border rounded p-3 bg-indigo-50"
          >
            <div className="flex items-center gap-3">
              {m.photoUrl && (
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="h-12 w-12 object-cover rounded-full border"
                />
              )}
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-600">{m.role}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{m.bio}</p>
              </div>
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
        ))}
      </div>

      {/* Add/Edit Form */}
      <form
        onSubmit={saveMember}
        className="bg-white p-4 rounded border border-indigo-200"
      >
        <h3 className="font-medium mb-3">
          {editingId ? "Edit Team Member" : "Add New Team Member"}
        </h3>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. Director"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Short bio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order Number</label>
            <input
              type="number"
              name="orderNum"
              value={form.orderNum}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              id="team-photo"
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
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {loading ? "Saving..." : editingId ? "Update Member" : "Add Member"}
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
