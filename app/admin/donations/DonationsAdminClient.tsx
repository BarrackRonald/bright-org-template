"use client";

import { useState } from "react";

export default function DonationsAdminClient({ donations: initial }: any) {
  const [donations, setDonations] = useState(initial ?? []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;
    await fetch(`/api/donations/${id}`, { method: "DELETE" });
    setDonations((prev: any[]) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Donations — Admin</h1>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-2 text-left">Donor</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Method</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d: any) => (
            <tr key={d.id} className="border-b">
              <td className="p-2">{d.donorName ?? "Anonymous"}</td>
              <td className="p-2">
                {d.amount} {d.currency}
              </td>
              <td className="p-2">{d.method}</td>
              <td className="p-2">{d.status}</td>
              <td className="p-2">
                {new Date(d.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(d.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {donations.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No donations yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
