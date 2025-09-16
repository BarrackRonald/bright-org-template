"use client";

import { motion } from "framer-motion";

export default function Hero({
  title,
  tagline,
  description,
  heroImageUrl,
  heroVideoUrl,
}: {
  title: string;
  tagline: string;
  description: string;
  heroImageUrl?: string | null;
  heroVideoUrl?: string | null;
}) {
  return (
    <section className="relative text-white py-20 text-center h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {heroVideoUrl ? (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
      ) : heroImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        ></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500"></div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl mb-4"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
