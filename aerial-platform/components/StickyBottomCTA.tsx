"use client";

import { useState, useEffect } from "react";

export default function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-600 text-white py-4 px-4 shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-semibold text-sm">Ready to get started?</p>
          <p className="text-xs opacity-90">Free to post. No credit card.</p>
        </div>
        <button className="bg-white text-brand-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm whitespace-nowrap">
          Get Started Free
        </button>
      </div>
    </div>
  );
}
