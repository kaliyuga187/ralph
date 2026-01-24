"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile, logout } from "@/lib/auth";
import type { Profile } from "@/types/database";

export default function ClientDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
    }

    loadProfile();
  }, [router]);

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
            <h1 className="text-2xl font-bold">Client Dashboard</h1>
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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {profile?.email}!</h2>
          <p className="text-gray-600 mb-4">
            This is your client dashboard. Here you'll be able to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Post new jobs</li>
            <li>View bids from contractors</li>
            <li>Message contractors</li>
            <li>Manage active projects</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              📍 <strong>Next up:</strong> Complete onboarding to post your first job
              (US-007)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
