// components/ValuesPills.tsx
"use client";

export default function ValuesPills({ values }: { values: string }) {
  const list = values.split(/[,\n•]+/).map((v) => v.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {list.map((val, idx) => (
        <div key={idx} className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-800 rounded-full shadow-sm">
          {val}
        </div>
      ))}
    </div>
  );
}
