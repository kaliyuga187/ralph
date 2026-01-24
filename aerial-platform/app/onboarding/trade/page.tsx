"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { AVAILABLE_SERVICES } from "@/types/database";

export default function TradeOnboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [serviceRadius, setServiceRadius] = useState(25);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const profile = await getCurrentUserProfile();
      if (!profile || profile.role !== "trade") {
        router.push("/dashboard/client");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (services.length === 0) {
      setError("Please select at least one service");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Not authenticated");

      // Create trade profile
      const { error: insertError } = await supabase
        .from("trade_profiles")
        .insert({
          user_id: user.id,
          business_name: businessName,
          services,
          service_radius_miles: serviceRadius,
          zip_code: zipCode,
          phone,
        });

      if (insertError) throw insertError;

      router.push("/dashboard/trade");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Set Up Your Business Profile</h1>
        <p className="text-gray-600 mb-8">
          Complete your profile to start receiving job leads in your area
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              placeholder="ABC Roofing Co."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Offered <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_SERVICES.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    services.includes(service)
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-brand-300"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                maxLength={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                placeholder="78701"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Radius: {serviceRadius} miles
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={serviceRadius}
                onChange={(e) => setServiceRadius(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 mi</span>
                <span>50 mi</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
            <p className="text-sm text-brand-800">
              🎯 <strong>Complete profile to unlock leads!</strong> Contractors with
              complete profiles get 3x more job opportunities.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating Profile..." : "Complete Setup & Start Bidding"}
          </button>
        </form>
      </div>
    </main>
  );
}
