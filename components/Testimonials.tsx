"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // rotate every 5s
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What People Say</h2>
        <div className="relative h-40 md:h-48 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <p className="italic mb-4 text-lg">
                “{testimonials[index].message}”
              </p>
              <h4 className="font-semibold">{testimonials[index].name}</h4>
              {testimonials[index].role && (
                <p className="text-sm">{testimonials[index].role}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
