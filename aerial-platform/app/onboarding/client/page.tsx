"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function ClientOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  const handleSkip = () => {
    router.push("/dashboard/client");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Not authenticated");

      // Update profile with additional info
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // For now, we're just capturing the info
      // In future stories, we'll add a client_profiles table
      console.log("Client onboarding data:", { name, phone, address });

      router.push("/dashboard/client");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 2</span>
            <span>Almost there!</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div>
            <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-gray-600 mb-6">
              Add your details to get faster bids from contractors
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="John Doe"
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

              <button
                type="submit"
                className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                Continue
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 <strong>Complete now to get faster bids!</strong> Contractors respond
                30% faster to complete profiles.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-2">Property Address</h1>
            <p className="text-gray-600 mb-6">
              Where do you need work done?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  This will be used to show you local contractors
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

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
                  disabled={submitting}
                  className="flex-1 bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Saving..." : "Complete Setup"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-gray-500 text-sm hover:text-gray-700"
              >
                Skip for now
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
