import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            <Image
              src={item.imageUrl}
              alt={item.title ?? "Gallery Image"}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
