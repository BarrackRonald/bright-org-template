"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProgramsGrid({ programs }: { programs: any[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {programs.map((program) => (
        <motion.div
          key={program.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {program.imageUrl && (
            <Image
              src={program.imageUrl}
              alt={program.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
            <p className="text-gray-600 mb-4">{program.summary}</p>

            {/* Stats Preview */}
            {program.programImpactStats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {program.programImpactStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-gray-50 rounded-md p-2 text-center"
                  >
                    <p className="text-lg font-bold text-blue-600">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonial Preview */}
            {program.programTestimonials.length > 0 && (
              <blockquote className="italic text-gray-700 text-sm mb-4 border-l-4 border-blue-500 pl-3">
                “
                {program.programTestimonials[0].message.length > 100
                  ? program.programTestimonials[0].message.slice(0, 100) + "..."
                  : program.programTestimonials[0].message}
                ”
              </blockquote>
            )}

            {/* Coordinator */}
            {program.coordinator && (
              <div className="mt-auto pt-4 border-t text-sm text-gray-700">
                <p className="font-semibold">
                  Coordinator:{" "}
                  <span className="font-normal">
                    {program.coordinator.name}
                  </span>
                </p>
                <p className="text-gray-500">{program.coordinator.role}</p>
              </div>
            )}

            <Link
              href={`/programs/${program.slug}`}
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Learn More →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
