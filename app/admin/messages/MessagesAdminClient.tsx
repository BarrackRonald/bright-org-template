"use client";

import { useState } from "react";

export default function MessagesAdminClient({ messages: initial }: any) {
  const [messages, setMessages] = useState(initial ?? []);
  const [selected, setSelected] = useState<any | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev: any[]) => prev.filter((m) => m.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Messages — Admin</h1>

      {!selected && (
        <table className="w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m: any) => (
              <tr key={m.id} className="border-b">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2">{m.subject}</td>
                <td className="p-2">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => setSelected(m)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {selected && (
        <div className="bg-white rounded shadow p-6 space-y-3">
          <button
            onClick={() => setSelected(null)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold">{selected.subject}</h2>
          <p className="text-sm text-gray-600">
            From: {selected.name} ({selected.email})
          </p>
          <p className="mt-4 whitespace-pre-line">{selected.message}</p>
        </div>
      )}
    </div>
  );
}
