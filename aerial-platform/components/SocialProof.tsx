"use client";

import { useEffect, useState } from "react";

export default function SocialProof() {
  const [count, setCount] = useState(0);
  const target = 10000;

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-brand-600 mb-2">
              {count.toLocaleString()}+
            </div>
            <div className="text-gray-600 text-lg">Jobs Completed</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-success-600 mb-2">5,000+</div>
            <div className="text-gray-600 text-lg">Verified Contractors</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-urgent-600 mb-2">4.9★</div>
            <div className="text-gray-600 text-lg">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
