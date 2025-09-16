"use client";

import { useState } from "react";

export default function ProgramGalleryManager({ initialItems, programId }: any) {
  const [items, setItems] = useState(initialItems ?? []);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("image");
  const [loading, setLoading] = useState(false);

  const handleFile = (e: any) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const addItem = async (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Choose a file");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("caption", caption);
      fd.append("type", type);

      const res = await fetch(`/api/programs/${programId}/gallery`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const saved = await res.json();
      setItems((prev: any[]) => [...prev, saved]);
      setFile(null);
      setCaption("");
    } catch (err) {
      console.error(err);
      alert("Error saving gallery item");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/programs/${programId}/gallery/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev: any[]) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting gallery item");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-emerald-600">Program Gallery</h2>

      {/* List */}
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((i: any) => (
          <div
            key={i.id}
            className="border rounded p-2 flex flex-col items-center bg-emerald-50"
          >
            {i.type === "image" ? (
              <img src={i.mediaUrl} alt={i.caption} className="h-32 object-cover" />
            ) : (
              <video src={i.mediaUrl} controls className="h-32" />
            )}
            <p className="text-sm mt-1">{i.caption}</p>
            <button
              onClick={() => onDelete(i.id)}
              className="mt-2 px-2 py-1 bg-red-600 text-white rounded text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={addItem} className="space-y-3 bg-white p-4 rounded border">
        <div>
          <label className="block text-sm font-medium">File</label>
          <input type="file" onChange={handleFile} accept="image/*,video/*" />
        </div>
        <div>
          <label className="block text-sm font-medium">Caption</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <button
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          {loading ? "Saving..." : "Add Gallery Item"}
        </button>
      </form>
    </div>
  );
}
