// components/ImpactGrid.tsx
import Counter from "./Counter";

export default function ImpactGrid({ stats }: { stats: any[] }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.id} className="bg-white p-4 rounded-lg shadow text-center">
          <Counter value={s.value} />
          <p className="mt-2 font-semibold">{s.label}</p>
          {s.description && <p className="text-sm text-gray-500 mt-1">{s.description}</p>}
        </div>
      ))}
    </div>
  );
}
