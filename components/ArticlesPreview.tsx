// components/ArticlesPreview.tsx
export default function ArticlesPreview({ articles }: { articles: any[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Latest News</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((a) => (
            <a
              key={a.id}
              href={`/articles/${a.slug}`}
              className="block p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
              <p className="text-gray-600">{a.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
