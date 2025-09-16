"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2s
    const stepTime = Math.abs(Math.floor(duration / value));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

export default function ImpactStats({ stats }: { stats: any[] }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
        {stats.map((s) => (
          <motion.div
            key={s.id}
            className="p-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-4xl font-bold text-blue-600">
              <Counter value={s.value} />
            </p>
            <p className="text-lg font-semibold">{s.label}</p>
            <p className="text-gray-600">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
