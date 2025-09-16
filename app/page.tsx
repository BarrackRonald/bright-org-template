import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ProgramCard from "@/components/ProgramCard";
import ImpactStats from "@/components/ImpactStats";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ArticlesPreview from "@/components/ArticlesPreview";
import CallToAction from "@/components/CallToAction";

export default async function HomePage() {
  const settings = await prisma.siteSettings.findFirst();
  const about = await prisma.about.findFirst();
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: { position: "asc" },
  });
  const stats = await prisma.impactStat.findMany();
  const testimonials = await prisma.testimonial.findMany();
  const partners = await prisma.partner.findMany();
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    take: 2,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <Hero
        title={settings?.title || "Welcome"}
        tagline={settings?.tagline || ""}
        description={settings?.description || ""}
        heroImageUrl={settings?.heroImageUrl || null}
      />

      <AboutPreview mission={about?.mission || ""} vision={about?.vision || ""} />

      {/* Programs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Our Programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <ImpactStats stats={stats} />
      <Testimonials testimonials={testimonials} />
      <Partners partners={partners} />
      <ArticlesPreview articles={articles} />
      <CallToAction />
    </div>
  );
}
