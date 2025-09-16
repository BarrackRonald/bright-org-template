import AboutAdminClient from "./AboutAdminClient";
import { prisma } from "@/lib/prisma";

export default async function AboutAdminPage() {
  const [about, milestones, stats, partners, team] = await Promise.all([
    prisma.about.findFirst(),
    prisma.milestone.findMany({ orderBy: { year: "asc" } }),
    prisma.impactStat.findMany(),
    prisma.partner.findMany(),
    prisma.teamMember.findMany({ orderBy: { orderNum: "asc" } }),
  ]);

  return (
    <div className="p-6">
      <AboutAdminClient
        about={about}
        milestones={milestones}
        stats={stats}
        partners={partners}
        team={team}
      />
    </div>
  );
}
