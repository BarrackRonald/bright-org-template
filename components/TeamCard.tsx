// components/TeamCard.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function TeamCard({ member }: { member: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center">
        {member.photoUrl ? (
          <Image src={member.photoUrl} alt={member.name} width={120} height={120} className="rounded-full object-cover mb-4" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-xl font-semibold">{member.name?.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        )}

        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-blue-600 mb-2">{member.role}</p>
        <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>

        <button onClick={() => setOpen(true)} className="mt-4 text-sm font-medium text-blue-600 hover:underline">
          Read profile
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full z-10 p-6 overflow-auto max-h-[80vh]">
            <div className="flex gap-4">
              {member.photoUrl && <Image src={member.photoUrl} alt={member.name} width={140} height={140} className="rounded-lg object-cover" />}
              <div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="mt-4 text-gray-700 whitespace-pre-line">{member.bio}</p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button onClick={() => setOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
