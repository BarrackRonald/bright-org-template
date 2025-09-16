// app/programs/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProgramAnimatedSections from "./ProgramAnimatedSections";

export default async function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = await prisma.program.findUnique({
    where: { slug: params.slug },
    include: {
      coordinator: true,
      programGallery: true,
      programImpactStats: true,
      programTestimonials: true,
    },
  });

  if (!program) return notFound();

  // Prepare serializable props for client component (if needed)
  const impactStats = program.programImpactStats || [];
  const testimonials = program.programTestimonials || [];

  return (
    <section className="pb-16">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center text-white">
        {program.imageUrl && (
          <Image
            src={program.imageUrl}
            alt={program.title}
            fill
            className="object-cover absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-center">
          {program.title}
        </h1>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {/* Summary + Coordinator */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">{program.summary}</p>
          {program.coordinator && (
            <p className="text-blue-600 font-medium">
              Coordinator: {program.coordinator.name}
            </p>
          )}
        </div>

        {/* Content */}
        {program.content && (
          <article className="prose max-w-none mb-12">
            <p>{program.content}</p>
          </article>
        )}

        {/* Gallery (server rendered) */}
        {program.programGallery && program.programGallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {program.programGallery.map((g) => (
                <div key={g.id} className="relative">
                  {g.type === "image" ? (
                    <Image
                      src={g.mediaUrl}
                      alt={g.caption || "Gallery image"}
                      width={400}
                      height={300}
                      className="rounded-lg shadow object-cover w-full h-64"
                    />
                  ) : (
                    <video
                      src={g.mediaUrl}
                      controls
                      className="rounded-lg shadow w-full h-64 object-cover"
                    />
                  )}
                  {g.caption && (
                    <p className="mt-2 text-sm text-gray-600 text-center">
                      {g.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Animated sections (client) */}
        <ProgramAnimatedSections
          impactStats={impactStats}
          testimonials={testimonials}
        />

        {/* CTA */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/donate"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Donate
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Volunteer / Contact
            </Link>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/programs"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
