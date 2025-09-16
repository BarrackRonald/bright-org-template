"use client";

import { useState } from "react";

export default function SiteSettingsForm({ settings }) {
  const [form, setForm] = useState({
    title: settings?.title || "",
    tagline: settings?.tagline || "",
    description: settings?.description || "",
    logoUrl: settings?.logoUrl || "",
    heroImageUrl: settings?.heroImageUrl || "",
    heroVideoUrl: settings?.heroVideoUrl || "",
    contactEmail: settings?.contactEmail || "",
    contactPhone: settings?.contactPhone || "",
    address: settings?.address || "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (logoFile) formData.append("logo", logoFile);
    if (heroFile) formData.append("hero", heroFile);

    const res = await fetch("/api/site-settings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Settings updated!");
      window.location.reload();
    } else {
      alert("Failed to update settings");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Website Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-medium mb-1">Tagline</label>
        <input
          type="text"
          name="tagline"
          value={form.tagline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block text-sm font-medium mb-1">Logo</label>
        {form.logoUrl && (
          <img src={form.logoUrl} alt="Logo preview" className="h-16 mb-2" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setLogoFile)}
        />
      </div>

      {/* Hero Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Hero Image</label>
        {form.heroImageUrl && (
          <img src={form.heroImageUrl} alt="Hero preview" className="h-24 mb-2" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setHeroFile)}
        />
      </div>

      {/* Hero Video URL */}
      <div>
        <label className="block text-sm font-medium mb-1">Hero Video URL (YouTube/MP4)</label>
        <input
          type="text"
          name="heroVideoUrl"
          value={form.heroVideoUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-medium mb-1">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Phone</label>
        <input
          type="text"
          name="contactPhone"
          value={form.contactPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Settings
      </button>
    </form>
  );
}
