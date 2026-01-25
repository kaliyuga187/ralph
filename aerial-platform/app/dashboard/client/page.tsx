"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile, logout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Profile, Job } from "@/types/database";

type JobWithBidCount = Job & { bid_count?: number };

export default function ClientDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<JobWithBidCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const userProfile = await getCurrentUserProfile();

      if (!userProfile) {
        router.push("/login");
        return;
      }

      if (userProfile.role !== "client") {
        router.push("/dashboard/trade");
        return;
      }

      setProfile(userProfile);
      setLoading(false);
      loadJobs(userProfile.id);
    }

    loadProfile();
  }, [router]);

  async function loadJobs(userId: string) {
    setLoadingJobs(true);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          bids(count)
        `)
        .eq("client_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map the response to add bid_count
      const jobsWithCounts = data?.map((job: any) => ({
        ...job,
        bid_count: job.bids[0]?.count || 0,
        bids: undefined, // Remove the bids array
      })) || [];

      setJobs(jobsWithCounts);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
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
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Jobs</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/jobs/new")}
                className="bg-brand-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                + Post New Job
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingJobs ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
            <p className="text-gray-600 mb-6">
              Post your first job to start getting bids from local contractors
            </p>
            <button
              onClick={() => router.push("/jobs/new")}
              className="bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>📍 {job.address}</span>
                      <span className="text-gray-400">•</span>
                      <span>{job.service_type.replace(/_/g, " ")}</span>
                      <span className="text-gray-400">•</span>
                      <span>
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {job.budget_min && job.budget_max && (
                      <p className="text-sm text-gray-600">
                        Budget: ${job.budget_min.toLocaleString()} - $
                        {job.budget_max.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    {job.bid_count && job.bid_count > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-brand-600">
                          {job.bid_count}
                        </span>
                        <span className="text-gray-600">
                          {job.bid_count === 1 ? "bid" : "bids"} received
                        </span>
                        {job.bid_count > 0 && job.status === "open" && (
                          <span className="ml-2 px-2 py-1 bg-success-100 text-success-700 text-xs font-semibold rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No bids yet - avg wait time is 6 hours
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => router.push(`/client/jobs/${job.id}`)}
                    className="bg-brand-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                  >
                    {job.bid_count && job.bid_count > 0
                      ? "View Bids"
                      : "View Job"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
