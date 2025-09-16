import { prisma } from "@/lib/prisma";
import DonationsAdminClient from "./DonationsAdminClient";

export default async function DonationsAdminPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <DonationsAdminClient donations={donations} />
    </div>
  );
}
