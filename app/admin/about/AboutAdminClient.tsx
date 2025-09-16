"use client";

import { useState } from "react";
import AboutForm from "./AboutForm";
import MilestonesManager from "./MilestonesManager";
import ImpactStatsManager from "./ImpactStatsManager";
import PartnersManager from "./PartnersManager";
import TeamManager from "./TeamManager";
import QuoteForm from "./QuoteForm";
import CTAForm from "./CTAForm";

const tabs = [
  { id: "main", label: "Main Content" },
  { id: "milestones", label: "Milestones" },
  { id: "stats", label: "Impact Stats" },
  { id: "partners", label: "Partners" },
  { id: "team", label: "Team" },
  { id: "quote", label: "Quote" },
  { id: "cta", label: "CTA" },
];

export default function AboutAdminClient({
  about,
  milestones,
  stats,
  partners,
  team,
}: any) {
  const [activeTab, setActiveTab] = useState<string>("main");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-sky-700">About Page — Admin</h1>

      {/* Navigation */}
      <div className="mt-4">
        <nav className="flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition ${
                activeTab === t.id
                  ? "bg-sky-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="mt-4 bg-white rounded-lg p-6 shadow">
          {activeTab === "main" && <AboutForm about={about} />}
          {activeTab === "milestones" && (
            <MilestonesManager initialMilestones={milestones} />
          )}
          {activeTab === "stats" && <ImpactStatsManager stats={stats} />}
          {activeTab === "partners" && <PartnersManager partners={partners} />}
          {activeTab === "team" && <TeamManager team={team} />}
          {activeTab === "quote" && <QuoteForm about={about} />}
          {activeTab === "cta" && <CTAForm about={about} />}
        </div>
      </div>
    </div>
  );
}
