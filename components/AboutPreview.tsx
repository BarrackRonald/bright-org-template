// components/AboutPreview.tsx
export default function AboutPreview({
  mission,
  vision,
}: {
  mission: string | null;
  vision: string | null;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
        <p className="text-lg mb-4"><strong>Mission:</strong> {mission}</p>
        <p className="text-lg mb-6"><strong>Vision:</strong> {vision}</p>
        <a
          href="/about"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
