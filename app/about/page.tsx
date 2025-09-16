// app/about/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ValuesPills from "@/components/ValuesPills";
import ImpactGrid from "@/components/ImpactGrid";
import Timeline from "@/components/Timeline";
import TeamCard from "@/components/TeamCard";

export default async function AboutPage() {
  // fetch site settings + about + milestones + team + stats + partners (all used on the page)
  const [settings, about, milestones, team, stats, partners] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.about.findFirst(),
    prisma.milestone.findMany({ orderBy: { year: "asc" } }),
    prisma.teamMember.findMany({ orderBy: { orderNum: "asc" } }),
    prisma.impactStat.findMany(),
    prisma.partner.findMany(),
  ]);

  if (!about) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold">About information is not available.</h2>
      </div>
    );
  }

  return (
    <main className="text-gray-900">
      {/* HERO */}
      <header className="relative h-[50vh] flex items-center justify-center text-white">
        {settings?.heroImageUrl ? (
          <Image src={settings.heroImageUrl} alt="Hero" fill className="object-cover absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{settings?.title ?? "About"}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{settings?.tagline ?? about.mission}</p>
        </div>
      </header>

      {/* WHO WE ARE / STATS */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{about.history}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/programs" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">
                Explore Programs
              </Link>
              <Link href="/donate" className="inline-block bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600">
                Donate
              </Link>
              <Link href="/volunteer" className="inline-block border border-blue-600 text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50">
                Volunteer
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <ImpactGrid stats={stats} />
            {partners.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-3">Partners</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  {partners.map((p) => (
                    <a key={p.id} href={p.website ?? "#"} target="_blank" rel="noreferrer" className="p-2">
                      {p.logoUrl ? (
                        <Image src={p.logoUrl} alt={p.name} width={100} height={48} className="object-contain" />
                      ) : (
                        <span className="text-sm font-medium">{p.name}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* mission/vision/objectives */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Mission</h3>
              <p className="text-gray-700">{about.mission}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Vision</h3>
              <p className="text-gray-700">{about.vision}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Objectives</h3>
              <p className="text-gray-700 whitespace-pre-line">{about.objectives}</p>
            </div>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Our Core Values</h2>
        <ValuesPills values={about.coreValues ?? ""} />
      </section>

      {/* Timeline / Milestones */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
          <Timeline items={milestones} />
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="max-w-3xl mx-auto text-xl italic">“Service is the noblest way to leave footprints in the sands of time.”</blockquote>
          <p className="mt-4 font-semibold">— Aloo Denish Obiero</p>
          <p className="mt-3 text-sm opacity-90">(From the Bright Beginner Foundation profile)</p>
        </div>
      </section>

      {/* Leadership */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Leadership & Governance</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-3">Support Our Work</h3>
          <p className="mb-6 max-w-2xl mx-auto">We welcome partners and donors. Join us to empower youth and scale our programs.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/donate" className="bg-green-500 px-6 py-3 rounded font-semibold hover:bg-green-600">Donate</Link>
            <Link href="/contact" className="border border-white px-6 py-3 rounded hover:bg-white/10">Contact Us</Link>
            <Link href="/volunteer" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100">Volunteer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
