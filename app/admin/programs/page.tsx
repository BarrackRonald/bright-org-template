import { prisma } from "@/lib/prisma";
import ProgramsAdminClient from "./ProgramsAdminClient";

export default async function ProgramsAdminPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      coordinator: true,
      programGallery: true,
      programImpactStats: true,
      programTestimonials: true,
    },
  });

  const team = await prisma.teamMember.findMany({
    orderBy: { orderNum: "asc" },
  });

  return (
    <div className="p-6">
      <ProgramsAdminClient programs={programs} team={team} />
    </div>
  );
}
