import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findFirst();
  const about = await prisma.about.findFirst();
  const milestones = await prisma.milestone.findMany({
    orderBy: { year: "asc" },
  });
  const team = await prisma.teamMember.findMany({
    orderBy: { orderNum: "asc" },
  });

  if (!about) {
    return <div className="container mx-auto px-6 py-12">About info not found.</div>;
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center text-white">
        {settings?.heroImageUrl && (
          <Image
            src={settings.heroImageUrl}
            alt="About Hero"
            fill
            className="object-cover absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold">About Us</h1>
      </section>

      {/* History / Overview */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{about.history}</p>
      </section>

      {/* Mission / Vision / Objectives */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Mission</h3>
            <p className="text-gray-600">{about.mission}</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Vision</h3>
            <p className="text-gray-600">{about.vision}</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Objectives</h3>
            <p className="text-gray-600 whitespace-pre-line">{about.objectives}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {about.coreValues?.split(",").map((value, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              {value.trim()}
            </span>
          ))}
        </div>
      </section>

      {/* Milestones / Timeline */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
          <div className="relative border-l-4 border-blue-600 pl-6">
            {milestones.map((m) => (
              <div key={m.id} className="mb-10">
                <h3 className="text-xl font-semibold text-blue-600">{m.year}</h3>
                <p className="text-lg font-medium">{m.title}</p>
                <p className="text-gray-700 mb-3">{m.description}</p>
                {m.imageUrl && (
                  <Image
                    src={m.imageUrl}
                    alt={m.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Leadership</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white shadow rounded-lg p-6 text-center">
              {member.photoUrl && (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
        <p className="mb-6">Join us in empowering youth and building a brighter tomorrow.</p>
        <div className="flex justify-center gap-6">
          <Link
            href="/volunteer"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Volunteer
          </Link>
          <Link
            href="/donate"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Donate
          </Link>
        </div>
      </section>
    </div>
  );
}
