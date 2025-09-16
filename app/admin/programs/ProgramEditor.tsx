"use client";

import { useState } from "react";
import ProgramForm from "./ProgramForm";
import ProgramGalleryManager from "./ProgramGalleryManager";
import ProgramStatsManager from "./ProgramStatsManager";
import ProgramTestimonialsManager from "./ProgramTestimonialsManager";

const tabs = [
  { id: "main", label: "Main Info" },
  { id: "gallery", label: "Gallery" },
  { id: "stats", label: "Impact Stats" },
  { id: "testimonials", label: "Testimonials" },
];

export default function ProgramEditor({ program, team, onBack, onSaved }: any) {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <nav className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === t.id
                ? "bg-emerald-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {activeTab === "main" && (
          <ProgramForm program={program} team={team} onSaved={onSaved} />
        )}
        {activeTab === "gallery" && (
          <ProgramGalleryManager initialItems={program.programGallery} programId={program.id} />
        )}
        {activeTab === "stats" && (
          <ProgramStatsManager stats={program.programImpactStats} programId={program.id} />
        )}
        {activeTab === "testimonials" && (
          <ProgramTestimonialsManager testimonials={program.programTestimonials} programId={program.id} />
        )}
      </div>
    </div>
  );
}
