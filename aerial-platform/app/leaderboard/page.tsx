// US-021: Trade Leaderboard
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { TradeProfile } from "@/types/database";

export default function LeaderboardPage() {
  const [trades, setTrades] = useState<TradeProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      const { data } = await supabase
        .from("trade_profiles")
        .select("*")
        .order("rating", { ascending: false })
        .limit(10);

      setTrades(data || []);
      setLoading(false);
    }

    loadLeaderboard();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Top Rated Contractors</h1>
        <p className="text-center text-gray-600 mb-12">See how you rank against other pros in your area</p>

        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-12 text-center">Loading...</div>
          ) : (
            <div className="divide-y">
              {trades.map((trade, idx) => (
                <div key={trade.user_id} className="p-6 flex items-center gap-4">
                  <div className="text-3xl font-bold text-gray-400 w-12">#{idx + 1}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{trade.business_name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>⭐ {trade.rating.toFixed(1)}</span>
                      <span>{trade.total_jobs}+ jobs</span>
                      <span>{trade.services.join(", ")}</span>
                    </div>
                  </div>
                  {idx === 0 && <span className="text-4xl">🏆</span>}
                  {idx === 1 && <span className="text-4xl">🥈</span>}
                  {idx === 2 && <span className="text-4xl">🥉</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
