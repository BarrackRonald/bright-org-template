import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: "desc" },
  });

  const now = new Date();
  const upcoming = events.filter((e) => e.startDate > now);
  const past = events.filter((e) => e.startDate <= now);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Events</h1>

      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      {upcoming.length === 0 ? (
        <p className="mb-8 text-gray-500">No upcoming events right now.</p>
      ) : (
        <ul className="mb-12 space-y-6">
          {upcoming.map((event) => (
            <li key={event.id} className="border p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p className="text-gray-600">{event.summary}</p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(event.startDate).toDateString()}
                {event.endDate ? ` - ${new Date(event.endDate).toDateString()}` : ""}
              </p>
              <Link href={`/events/${event.slug}`} className="text-blue-600 hover:underline">
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
      <ul className="space-y-6">
        {past.map((event) => (
          <li key={event.id} className="border p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{event.summary}</p>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(event.startDate).toDateString()}
            </p>
            <Link href={`/events/${event.slug}`} className="text-blue-600 hover:underline">
              View Details →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
