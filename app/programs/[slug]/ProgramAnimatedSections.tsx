// app/programs/[slug]/ProgramAnimatedSections.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ImpactStat = {
  id: number;
  label: string;
  value: number;
  description?: string | null;
};

type Testimonial = {
  id: number;
  name: string;
  role?: string | null;
  message: string;
  photoUrl?: string | null;
};

export default function ProgramAnimatedSections({
  impactStats,
  testimonials,
}: {
  impactStats: ImpactStat[];
  testimonials: Testimonial[];
}) {
  return (
    <>
      {/* Impact Stats */}
      {impactStats && impactStats.length > 0 && (
        <section className="mb-16 bg-gray-50 py-12 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center px-4">
            {impactStats.map((stat) => (
              <motion.div
                key={stat.id}
                className="p-6 bg-white rounded-lg shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-4xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="font-medium">{stat.label}</p>
                {stat.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {stat.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="mb-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                className="bg-white p-6 rounded-lg shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {t.photoUrl && (
                  // Using next/image for testimonial photos
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src={t.photoUrl}
                      alt={t.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <p className="italic text-gray-700 mb-4">"{t.message}"</p>
                <h4 className="font-semibold text-center">{t.name}</h4>
                {t.role && (
                  <p className="text-sm text-blue-600 text-center mt-1">{t.role}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
