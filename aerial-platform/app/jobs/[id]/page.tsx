"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import MapboxMap from "@/components/MapboxMap";
import type { Job, Bid } from "@/types/database";

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [existingBid, setExistingBid] = useState<Bid | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Bid form fields
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
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

        // Load job
        const { data: jobData, error: jobError } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (jobError) throw jobError;
        setJob(jobData);

        // Check if user already bid on this job
        const { data: bidData } = await supabase
          .from("bids")
          .select("*")
          .eq("job_id", jobId)
          .eq("trade_id", user.id)
          .single();

        if (bidData) {
          setExistingBid(bidData);
          setAmount(bidData.amount.toString());
          setMessage(bidData.message || "");
          setTimeline(bidData.estimated_timeline || "");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading job:", err);
        setError("Failed to load job");
        setLoading(false);
      }
    }

    loadJob();
  }, [jobId, router]);

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Not authenticated");

      const { error: bidError } = await supabase.from("bids").insert({
        job_id: jobId,
        trade_id: user.id,
        amount: parseInt(amount),
        message,
        estimated_timeline: timeline,
      });

      if (bidError) throw bidError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/trade");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit bid");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Job not found</p>
          <button
            onClick={() => router.push("/dashboard/trade")}
            className="mt-4 text-brand-600 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/dashboard/trade")}
          className="text-gray-600 hover:text-gray-800 mb-6 flex items-center gap-2"
        >
          ← Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">{job.title}</h1>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-semibold">{job.service_type.replace(/_/g, " ")}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold">📍 {job.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold text-success-600">
                  {job.budget_min && job.budget_max
                    ? `$${job.budget_min.toLocaleString()} - $${job.budget_max.toLocaleString()}`
                    : "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">{job.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="text-gray-700">
                  {new Date(job.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Aerial View */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Property Aerial View</h3>
              <MapboxMap
                center={[job.lng, job.lat]}
                zoom={18}
                className="w-full h-64 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Bid Form */}
          <div className="bg-white rounded-lg shadow p-6">
            {existingBid ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Your Bid</h2>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    ✓ You've already submitted a bid for this job!
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold text-2xl text-brand-600">
                      ${existingBid.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Timeline</p>
                    <p className="text-gray-700">{existingBid.estimated_timeline || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Your Message</p>
                    <p className="text-gray-700">{existingBid.message || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        existingBid.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : existingBid.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {existingBid.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-2">Submit Your Bid</h2>
                <p className="text-gray-600 mb-6">
                  Provide a competitive estimate to win this project
                </p>

                {success && (
                  <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-4">
                    ✓ Bid submitted successfully! Redirecting...
                  </div>
                )}

                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Estimate Amount ($)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Timeline
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="e.g., 2-3 weeks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message to Client
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="Introduce yourself and explain your approach..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
                    <p className="text-sm text-brand-800">
                      💡 <strong>Submit Bid Now - Beat the Competition!</strong>{" "}
                      Early bids get 30% more responses from clients.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting Bid..." : "Submit Bid"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
