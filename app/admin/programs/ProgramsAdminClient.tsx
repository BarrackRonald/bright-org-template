"use client";

import { useState } from "react";
import ProgramEditor from "./ProgramEditor";

export default function ProgramsAdminClient({ programs: initialPrograms, team }: any) {
  const [programs, setPrograms] = useState(initialPrograms ?? []);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-700">Programs — Admin</h1>

      {/* List of programs */}
      {!selected && (
        <div>
          <button
            onClick={() => setSelected({})}
            className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            + Add New Program
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map((p: any) => (
              <div
                key={p.id}
                className="border rounded p-4 bg-emerald-50 cursor-pointer hover:bg-emerald-100"
                onClick={() => setSelected(p)}
              >
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Program editor */}
      {selected && (
        <ProgramEditor
          program={selected}
          team={team}
          onBack={() => setSelected(null)}
          onSaved={(saved: any) => {
            if (selected?.id) {
              setPrograms((prev: any[]) =>
                prev.map((p) => (p.id === saved.id ? saved : p))
              );
            } else {
              setPrograms((prev: any[]) => [...prev, saved]);
            }
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
