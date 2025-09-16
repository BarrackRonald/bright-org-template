// components/Timeline.tsx
"use client";

import Image from "next/image";

export default function Timeline({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500">No milestones available.</p>;
  }

  return (
    <div className="relative">
      <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-blue-200" />
      <div className="space-y-12">
        {items.map((it, idx) => {
          const left = idx % 2 === 0;
          return (
            <div key={it.id} className={`relative md:flex md:items-center ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="md:w-1/2 md:px-6">
                <div className={`bg-white p-6 rounded-lg shadow ${left ? "md:ml-8" : "md:mr-8"}`}>
                  <div className="text-sm font-semibold text-blue-600">{it.year}</div>
                  <h4 className="text-lg font-bold mt-2">{it.title}</h4>
                  <p className="text-gray-700 mt-2">{it.description}</p>
                  {it.imageUrl && (
                    <div className="mt-4">
                      <Image src={it.imageUrl} alt={it.title} width={640} height={360} className="rounded-md object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 md:flex md:items-center justify-center">
                <div className="relative z-10 flex items-center justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold shadow-lg">{it.year}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
