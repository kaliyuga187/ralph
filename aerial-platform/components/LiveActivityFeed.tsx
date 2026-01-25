"use client";

import { useState, useEffect } from "react";

const activities = [
  "Sarah in Brooklyn just posted a roofing job worth $8,500",
  "Mike from Austin hired a landscaper - project starts Monday",
  "Elite Roofing Co. just won their 150th job on the platform",
  "Jennifer in Portland received 5 bids in 6 hours",
  "David accepted a $12,000 solar installation bid",
  "GreenScape Design completed another 5-star job",
  "Carlos in Denver just posted a deck renovation project",
  "Top-rated contractor joined from Seattle - welcome!",
];

export default function LiveActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500); // Fade out for 500ms before changing
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-40">
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              {activities[currentActivity]}
            </p>
            <p className="text-xs text-gray-400 mt-1">Just now</p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
