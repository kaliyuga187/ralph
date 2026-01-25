"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import MapboxMap from "@/components/MapboxMap";
import { AVAILABLE_SERVICES } from "@/types/database";

export default function NewJobPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(30.2672); // Austin default
  const [lng, setLng] = useState(-97.7431);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const profile = await getCurrentUserProfile();
      if (!profile || profile.role !== "client") {
        router.push("/dashboard/trade");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error: insertError } = await supabase
        .from("jobs")
        .insert({
          client_id: user.id,
          title,
          service_type: serviceType.toLowerCase().replace(/\s+/g, "_"),
          description,
          address,
          lat,
          lng,
          budget_min: budgetMin ? parseInt(budgetMin) : null,
          budget_max: budgetMax ? parseInt(budgetMax) : null,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      router.push("/dashboard/client");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create job");
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
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 3</span>
            <span>Post your job</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Job Details</h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="e.g., Roof Replacement Needed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  >
                    <option value="">Select a service...</option>
                    {AVAILABLE_SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="Describe what work needs to be done..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                        placeholder="Min ($)"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                        placeholder="Max ($)"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Property Location</h1>
              <p className="text-gray-600 mb-6">
                View your property from above to help contractors understand the
                scope of work
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="123 Main St, Austin, TX 78701"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Search for your exact address on the map to center it
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aerial View
                  </label>
                  <MapboxMap
                    center={[lng, lat]}
                    zoom={18}
                    className="w-full h-96 rounded-lg border border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use navigation controls to zoom and explore your property
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                  >
                    Review & Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Review Your Job</h1>

              <div className="space-y-4 mb-6">
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-semibold">{title}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-semibold">{serviceType}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{description}</p>
                </div>

                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-semibold">
                    {budgetMin && budgetMax
                      ? `$${budgetMin} - $${budgetMax}`
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Property Address</p>
                  <p className="font-semibold">{address}</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="p-4 bg-success-50 border border-success-200 rounded-lg mb-6">
                <p className="text-sm text-success-800">
                  🎯 <strong>Post Job & Get Bids in 24 Hours!</strong> On average,
                  jobs receive 5 competitive bids within the first day.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Posting Job..." : "Post Job Now"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
