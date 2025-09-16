import { prisma } from "@/lib/prisma";
import ProgramsGrid from "./ProgramsGrid"; 

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    include: {
      coordinator: true,
      programImpactStats: {
        take: 2,
        orderBy: { id: "asc" },
      },
      programTestimonials: {
        take: 1,
        orderBy: { id: "asc" },
      },
    },
    orderBy: { position: "asc" },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center text-white">
        <img
          src="/hero-programs.jpg"
          alt="Programs Hero"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold">
          Our Programs
        </h1>
      </section>

      {/* Programs Grid */}
      <section className="container mx-auto px-6 py-16">
        <ProgramsGrid programs={programs} /> {/* 👈 pass data */}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
        <p className="mb-6">
          Support our programs and help us create lasting impact.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Partner With Us
          </a>
          <a
            href="/donate"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Donate
          </a>
        </div>
      </section>
    </div>
  );
}
