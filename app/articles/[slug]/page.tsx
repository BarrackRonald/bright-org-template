import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article || !article.isPublished) return notFound();

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/articles" className="hover:underline text-blue-600">
          ← Back to Articles
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      {/* Meta */}
      <p className="text-gray-500 mb-6">
        Published on{" "}
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unpublished"}
      </p>

      {/* Cover Image */}
      {article.coverUrl && (
        <div className="mb-6">
          <Image
            src={article.coverUrl}
            alt={article.title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full max-h-[400px]"
          />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <p className="text-gray-600">No content available.</p>
        )}
      </article>

      {/* CTA */}
      <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">
          Want to support our mission?
        </h2>
        <p className="text-gray-600 mb-4">
          Your donations help us create more impact through our programs.
        </p>
        <Link
          href="/donate"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}
