"use client";

import { useState } from "react";
import ArticleForm from "./ArticleForm";

export default function ArticlesAdminClient({ articles: initialArticles }: any) {
  const [articles, setArticles] = useState(initialArticles ?? []);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">Articles — Admin</h1>

      {!selected && (
        <div>
          <button
            onClick={() => setSelected({})}
            className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            + New Article
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((a: any) => (
              <div
                key={a.id}
                className="border rounded p-4 bg-purple-50 cursor-pointer hover:bg-purple-100"
                onClick={() => setSelected(a)}
              >
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm text-gray-600">{a.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <ArticleForm
          article={selected}
          onBack={() => setSelected(null)}
          onSaved={(saved: any) => {
            if (selected?.id) {
              setArticles((prev: any[]) =>
                prev.map((p) => (p.id === saved.id ? saved : p))
              );
            } else {
              setArticles((prev: any[]) => [saved, ...prev]);
            }
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
