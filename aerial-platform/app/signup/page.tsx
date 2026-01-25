"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";
import type { UserRole } from "@/types/database";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setLoading(true);
    setError(null);

    const { user, error: signUpError } = await signUp({ email, password, role });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Redirect based on role
    if (role === "client") {
      router.push("/onboarding/client");
    } else {
      router.push("/onboarding/trade");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {step === 1 ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-2">
              Join Aerial Estimate
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Choose how you want to use the platform
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("client")}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-brand-600 hover:bg-brand-50 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏠</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-600">
                      I Need Work Done
                    </h3>
                    <p className="text-sm text-gray-600">
                      Post jobs and get bids from local contractors
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("trade")}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-brand-600 hover:bg-brand-50 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔧</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-600">
                      I'm a Contractor
                    </h3>
                    <p className="text-sm text-gray-600">
                      Find local jobs and grow your business
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-brand-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setStep(1)}
              className="text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
            >
              ← Back
            </button>

            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600 mb-6">
              Signing up as a{" "}
              <span className="font-semibold">
                {role === "client" ? "Homeowner" : "Contractor"}
              </span>
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
