// components/CallToAction.tsx
export default function CallToAction() {
  return (
    <section className="py-16 bg-blue-700 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Support Our Work</h2>
        <p className="mb-6">Join us in empowering youth and building a brighter future.</p>
        <div className="flex justify-center gap-4">
          <a href="/donate" className="bg-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
            Donate
          </a>
          <a href="/volunteer" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}
