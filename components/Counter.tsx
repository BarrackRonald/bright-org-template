// components/Counter.tsx
"use client";

import { useEffect, useState } from "react";

export default function Counter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.max(0, value);
    if (end === 0) return;

    const stepTime = Math.max(10, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span className="text-4xl font-bold text-blue-600">{count.toLocaleString()}</span>;
}
