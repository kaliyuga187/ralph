"use client";

import { useEffect, useState } from "react";

const messages = [
  "🔥 Limited spots for contractors in Austin, TX - Only 2 left this week!",
  "⚡ Sarah in Brooklyn just posted a $5,000 roofing job",
  "🎯 Join 500+ contractors earning an average of $12k/month",
  "💼 3 new homeowners in your area need quotes today",
];

export default function UrgencyBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-urgent-600 text-white py-3 px-4 text-center overflow-hidden">
      <div className="animate-pulse font-semibold">
        {messages[currentIndex]}
      </div>
    </div>
  );
}
