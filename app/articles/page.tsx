import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">News & Updates</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            {article.coverUrl && (
              <Image
                src={article.coverUrl}
                alt={article.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <p className="text-sm text-gray-500 mb-4">
                {article.publishedAt?.toLocaleDateString()}
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
