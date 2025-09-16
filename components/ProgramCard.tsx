import Link from "next/link";
import Image from "next/image";

export default function ProgramCard({ program }: { program: any }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
      {program.imageUrl && (
        <Image
          src={program.imageUrl}
          alt={program.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
        <p className="text-gray-600 mb-4">{program.summary}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
