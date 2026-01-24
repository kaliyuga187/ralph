"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Michael Rodriguez",
    location: "Austin, TX",
    photo: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Got 7 bids in 12 hours! Saved $2,000 by comparing quotes. The aerial view made it so easy to explain exactly what I needed.",
    role: "Homeowner",
  },
  {
    id: 2,
    name: "Jennifer Chen",
    location: "Portland, OR",
    photo: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "As a contractor, this platform has tripled my leads. No more driving across town for quotes that go nowhere. Game changer!",
    role: "Roofing Contractor",
  },
  {
    id: 3,
    name: "David Thompson",
    location: "Brooklyn, NY",
    photo: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: "Found a local solar installer through here and saved $800 on my installation. The whole process took 3 days from post to install.",
    role: "Homeowner",
  },
  {
    id: 4,
    name: "Sarah Martinez",
    location: "Denver, CO",
    photo: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    text: "I've completed 50+ jobs from this platform in 6 months. The aerial imagery helps me quote accurately without leaving my office.",
    role: "Landscaping Contractor",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by 10,000+ Homeowners & Contractors
        </h2>

        <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={current.photo}
              alt={current.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2">
                {[...Array(current.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{current.text}"</p>
              <div>
                <p className="font-semibold text-brand-600">{current.name}</p>
                <p className="text-sm text-gray-500">
                  {current.role} • {current.location}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-brand-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
