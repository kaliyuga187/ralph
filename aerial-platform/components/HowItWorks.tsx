"use client";

import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"client" | "contractor">("client");

  const clientSteps = [
    {
      number: 1,
      title: "Post Your Job",
      description: "Enter your address and describe the work needed. Our AI analyzes aerial imagery of your property.",
    },
    {
      number: 2,
      title: "Get Local Bids",
      description: "Receive 3-5 competitive bids from verified contractors in your area within 24 hours.",
    },
    {
      number: 3,
      title: "Hire & Complete",
      description: "Compare bids, chat with contractors, and hire the best one. Pay only when the job is done.",
    },
  ];

  const contractorSteps = [
    {
      number: 1,
      title: "Set Your Service Area",
      description: "Choose your ZIP code and service radius. Only see jobs you can actually reach.",
    },
    {
      number: 2,
      title: "Browse Local Jobs",
      description: "View aerial imagery to create accurate bids without driving to every property.",
    },
    {
      number: 3,
      title: "Win Jobs & Earn",
      description: "Submit competitive bids, get hired, and build your reputation with 5-star reviews.",
    },
  ];

  const steps = activeTab === "client" ? clientSteps : contractorSteps;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-xl text-center text-gray-600 mb-10">
          Simple, fast, and built for your success
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === "client"
                  ? "bg-brand-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Clients
            </button>
            <button
              onClick={() => setActiveTab("contractor")}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === "contractor"
                  ? "bg-success-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Contractors
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-700 text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
