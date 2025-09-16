// components/Partners.tsx
export default function Partners({ partners }: { partners: any[] }) {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {partners.map((p) => (
            <a key={p.id} href={p.website || "#"} target="_blank" rel="noreferrer">
              <div className="bg-white shadow p-4 rounded-lg hover:shadow-lg">
                {p.logoUrl ? (
                  <img src={p.logoUrl} alt={p.name} className="h-12" />
                ) : (
                  <span className="font-semibold">{p.name}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
