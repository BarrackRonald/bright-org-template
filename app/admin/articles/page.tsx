import { prisma } from "@/lib/prisma";
import ArticlesAdminClient from "./ArticlesAdminClient";

export default async function ArticlesAdminPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <ArticlesAdminClient articles={articles} />
    </div>
  );
}
