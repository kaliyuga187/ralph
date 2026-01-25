"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile, logout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Profile, Job } from "@/types/database";

type JobWithDistance = Job & { distance?: number };

export default function TradeDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<JobWithDistance[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Filters
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "closest" | "budget">("newest");

  useEffect(() => {
    async function loadProfile() {
      const userProfile = await getCurrentUserProfile();

      if (!userProfile) {
        router.push("/login");
        return;
      }

      if (userProfile.role !== "trade") {
        router.push("/dashboard/client");
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
      // For now, get all open jobs (geo-matching would filter by distance in production)
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  }

  useEffect(() => {
    let filtered = [...jobs];

    // Filter by service type
    if (serviceFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.service_type === serviceFilter.toLowerCase().replace(/\s+/g, "_")
      );
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "closest") {
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (sortBy === "budget") {
      filtered.sort((a, b) => (b.budget_max || 0) - (a.budget_max || 0));
    }

    setFilteredJobs(filtered);
  }, [jobs, serviceFilter, sortBy]);

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
            <h1 className="text-2xl font-bold">Contractor Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Available Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              >
                <option value="all">All Services</option>
                <option value="Roofing">Roofing</option>
                <option value="Solar">Solar</option>
                <option value="Landscaping">Landscaping</option>
                <option value="General Contracting">General Contracting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="closest">Closest First</option>
                <option value="budget">Highest Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loadingJobs ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No jobs nearby</h3>
            <p className="text-gray-600">
              {serviceFilter !== "all"
                ? "Try changing your filters or expanding your service area!"
                : "Check back soon for new opportunities"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        📍 {job.address}
                      </span>
                      {job.distance && (
                        <span className="px-2 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-semibold">
                          {job.distance.toFixed(1)} mi away
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {job.service_type.replace(/_/g, " ")}
                      </span>
                      {job.budget_min && job.budget_max && (
                        <span className="font-semibold text-success-600">
                          ${job.budget_min.toLocaleString()} - $
                          {job.budget_max.toLocaleString()}
                        </span>
                      )}
                      <span className="text-gray-500">
                        Posted{" "}
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/jobs/${job.id}`)}
                    className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                  >
                    View Details & Submit Bid
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
