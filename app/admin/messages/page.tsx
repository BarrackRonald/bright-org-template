import { prisma } from "@/lib/prisma";
import MessagesAdminClient from "./MessagesAdminClient";

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <MessagesAdminClient messages={messages} />
    </div>
  );
}
