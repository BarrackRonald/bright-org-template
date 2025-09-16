import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // ✅ Counts
  const donations = await prisma.donation.count();
  const programs = await prisma.program.count();
  const events = await prisma.event.count();
  const messages = await prisma.contactMessage.count(); // FIXED

  // ✅ Recent donations
  const recentDonations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // ✅ Recent messages
  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-sm text-gray-500">Donations</h2>
          <p className="text-2xl font-bold">{donations}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-sm text-gray-500">Programs</h2>
          <p className="text-2xl font-bold">{programs}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-sm text-gray-500">Events</h2>
          <p className="text-2xl font-bold">{events}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-sm text-gray-500">Messages</h2>
          <p className="text-2xl font-bold">{messages}</p>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Recent Donations</h2>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentDonations.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-2">
                  {d.amount} {d.currency}
                </td>
                <td className="p-2">{d.method}</td>
                <td className="p-2">{d.status}</td>
                <td className="p-2">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Messages */}
      <div>
        <h2 className="text-lg font-bold mb-2">Recent Messages</h2>
        <ul className="bg-white rounded shadow divide-y">
          {recentMessages.map((m) => (
            <li key={m.id} className="p-2">
              <p className="font-semibold">
                {m.name} ({m.email})
              </p>
              {m.subject && (
                <p className="text-sm text-gray-600">{m.subject}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
