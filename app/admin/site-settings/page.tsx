import { prisma } from "@/lib/prisma";
import SiteSettingsForm from "./SiteSettingsForm";

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
