import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  try {
    // Get trade profile to find service area
    const { data: tradeProfile, error: profileError } = await supabase
      .from("trade_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileError || !tradeProfile) {
      return NextResponse.json(
        { error: "Trade profile not found" },
        { status: 404 }
      );
    }

    // Get ZIP code coordinates (in production, use geocoding API)
    // For now, using hardcoded coordinates for Austin, TX
    const tradeLat = 30.2672;
    const tradeLng = -97.7431;

    // Query jobs using the calculate_distance function
    const { data: jobs, error: jobsError } = await supabase.rpc(
      "get_nearby_jobs",
      {
        trade_lat: tradeLat,
        trade_lng: tradeLng,
        max_distance: tradeProfile.service_radius_miles,
      }
    );

    if (jobsError) {
      console.error("Error fetching nearby jobs:", jobsError);
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: 500 }
      );
    }

    return NextResponse.json({ jobs: jobs || [] });
  } catch (error) {
    console.error("Nearby jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
