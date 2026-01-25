"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import MapboxMap from "@/components/MapboxMap";
import type { Job, Bid, TradeProfile } from "@/types/database";

type BidWithTrade = Bid & {
  trade_profile?: TradeProfile;
};

export default function ClientJobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [bids, setBids] = useState<BidWithTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobAndBids() {
      try {
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

        // Load job
        const { data: jobData, error: jobError } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .eq("client_id", user.id)
          .single();

        if (jobError) throw jobError;
        setJob(jobData);

        // Load bids with trade profiles
        const { data: bidsData, error: bidsError } = await supabase
          .from("bids")
          .select(`
            *,
            trade_profile:trade_profiles!bids_trade_id_fkey(*)
          `)
          .eq("job_id", jobId)
          .order("amount", { ascending: true });

        if (bidsError) throw bidsError;
        setBids(bidsData || []);

        setLoading(false);
      } catch (err) {
        console.error("Error loading job:", err);
        setError("Failed to load job");
        setLoading(false);
      }
    }

    loadJobAndBids();
  }, [jobId, router]);

  const handleAcceptBid = async (bidId: string) => {
    const confirmed = window.confirm(
      "Accept this bid? This will reject all other bids and update the job status."
    );

    if (!confirmed) return;

    setAccepting(true);
    setError(null);

    try {
      // Update accepted bid
      const { error: updateError } = await supabase
        .from("bids")
        .update({ status: "accepted" })
        .eq("id", bidId);

      if (updateError) throw updateError;

      // Reject other bids
      const { error: rejectError } = await supabase
        .from("bids")
        .update({ status: "rejected" })
        .eq("job_id", jobId)
        .neq("id", bidId);

      if (rejectError) throw rejectError;

      // Update job status
      const { error: jobUpdateError } = await supabase
        .from("jobs")
        .update({ status: "in_progress" })
        .eq("id", jobId);

      if (jobUpdateError) throw jobUpdateError;

      // Reload data
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept bid");
      setAccepting(false);
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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Job not found</p>
          <button
            onClick={() => router.push("/dashboard/client")}
            className="mt-4 text-brand-600 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const acceptedBid = bids.find((bid) => bid.status === "accepted");

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/dashboard/client")}
          className="text-gray-600 hover:text-gray-800 mb-6 flex items-center gap-2"
        >
          ← Back to My Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">{job.title}</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      job.status === "open"
                        ? "bg-green-100 text-green-800"
                        : job.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-semibold">{job.service_type.replace(/_/g, " ")}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-700">📍 {job.address}</p>
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
                  <p className="text-gray-700 text-sm">{job.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Aerial View</p>
                  <MapboxMap
                    center={[job.lng, job.lat]}
                    zoom={18}
                    className="w-full h-48 rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bids List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {acceptedBid ? "Accepted Bid" : "Bids Received"}
              </h2>
              <p className="text-gray-600 mb-6">
                {acceptedBid
                  ? "You've accepted a bid for this job"
                  : bids.length === 0
                  ? "No bids yet - contractors typically respond within 6 hours"
                  : `${bids.length} ${bids.length === 1 ? "bid" : "bids"} - sorted by lowest price`}
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {bids.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="text-xl font-semibold mb-2">Waiting for bids...</h3>
                  <p className="text-gray-600">
                    Average wait time is 6 hours. You'll be notified when contractors submit bids.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`border-2 rounded-lg p-6 ${
                        bid.status === "accepted"
                          ? "border-success-500 bg-success-50"
                          : bid.status === "rejected"
                          ? "border-gray-300 bg-gray-50 opacity-60"
                          : "border-gray-200 hover:border-brand-300 transition-colors"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold">
                              {bid.trade_profile?.business_name || "Contractor"}
                            </h3>
                            {bid.status === "accepted" && (
                              <span className="px-3 py-1 bg-success-500 text-white rounded-full text-xs font-semibold">
                                ✓ Accepted
                              </span>
                            )}
                            {bid.status === "rejected" && (
                              <span className="px-3 py-1 bg-gray-400 text-white rounded-full text-xs font-semibold">
                                Rejected
                              </span>
                            )}
                          </div>

                          {bid.trade_profile && (
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              {bid.trade_profile.rating > 0 && (
                                <span className="flex items-center gap-1">
                                  ⭐ {bid.trade_profile.rating.toFixed(1)}
                                </span>
                              )}
                              <span>{bid.trade_profile.total_jobs}+ jobs completed</span>
                              {bid.trade_profile.phone && <span>📞 {bid.trade_profile.phone}</span>}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-3xl font-bold text-brand-600">
                            ${bid.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {bid.estimated_timeline && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-500">Timeline</p>
                          <p className="text-gray-700">{bid.estimated_timeline}</p>
                        </div>
                      )}

                      {bid.message && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Message</p>
                          <p className="text-gray-700">{bid.message}</p>
                        </div>
                      )}

                      <div className="text-sm text-gray-500">
                        Submitted {new Date(bid.created_at).toLocaleString()}
                      </div>

                      {bid.status === "pending" && job.status === "open" && (
                        <button
                          onClick={() => handleAcceptBid(bid.id)}
                          disabled={accepting}
                          className="mt-4 w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {accepting ? "Accepting..." : `Accept Bid - $${bid.amount.toLocaleString()}`}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
