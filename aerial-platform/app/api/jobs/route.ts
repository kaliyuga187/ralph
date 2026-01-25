import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { jobSchema, validate } from "@/lib/validation";
import { sanitizeJobDescription, sanitizeText } from "@/lib/sanitize";
import { checkRateLimit, jobPostRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/jobs
 * Create a new job posting
 *
 * This route demonstrates comprehensive security implementation:
 * - Rate limiting
 * - Input validation with Zod
 * - HTML sanitization
 * - Authentication check
 * - Authorization check (homeowner only)
 * - Audit logging (via database trigger)
 */
export async function POST(request: NextRequest) {
  try {
    // ============================================
    // 1. RATE LIMITING
    // ============================================
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const rateLimitResult = await checkRateLimit(jobPostRateLimit, ip);

    if (!rateLimitResult.allowed) {
      return rateLimitResult.response;
    }

    // ============================================
    // 2. AUTHENTICATION
    // ============================================
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // ============================================
    // 3. PARSE REQUEST BODY
    // ============================================
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // ============================================
    // 4. INPUT VALIDATION
    // ============================================
    const validation = validate(jobSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // ============================================
    // 5. HTML SANITIZATION
    // ============================================
    const sanitizedData = {
      title: sanitizeText(data.title),
      description: sanitizeJobDescription(data.description),
      serviceType: data.serviceType,
      budgetMin: data.budgetMin,
      budgetMax: data.budgetMax,
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address ? sanitizeText(data.address) : null,
      urgency: data.urgency ?? "medium",
      preferredStartDate: data.preferredStartDate ?? null,
    };

    // ============================================
    // 6. AUTHORIZATION CHECK
    // ============================================
    // Verify user is a homeowner
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    if (profile.user_type !== "homeowner") {
      return NextResponse.json(
        { error: "Only homeowners can post jobs" },
        { status: 403 }
      );
    }

    // ============================================
    // 7. DATABASE INSERT
    // ============================================
    const { data: job, error: insertError } = await supabase
      .from("jobs")
      .insert({
        user_id: user.id,
        title: sanitizedData.title,
        description: sanitizedData.description,
        service_type: sanitizedData.serviceType,
        budget_min: sanitizedData.budgetMin,
        budget_max: sanitizedData.budgetMax,
        latitude: sanitizedData.latitude,
        longitude: sanitizedData.longitude,
        address: sanitizedData.address,
        urgency: sanitizedData.urgency,
        preferred_start_date: sanitizedData.preferredStartDate,
        status: "open",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Job creation error:", insertError);
      return NextResponse.json(
        { error: "Failed to create job" },
        { status: 500 }
      );
    }

    // ============================================
    // 8. LOG SECURITY EVENT (Optional)
    // ============================================
    // Log successful job creation for audit trail
    await supabase.rpc("log_security_event", {
      p_event_type: "job_created",
      p_severity: "low",
      p_description: `Job created: ${job.id}`,
      p_metadata: {
        job_id: job.id,
        service_type: job.service_type,
      },
      p_user_id: user.id,
      p_ip_address: ip,
      p_user_agent: request.headers.get("user-agent"),
    });

    // ============================================
    // 9. RETURN SUCCESS
    // ============================================
    return NextResponse.json(
      {
        success: true,
        data: job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error in POST /api/jobs:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/jobs
 * Get list of jobs with filters
 *
 * Security features:
 * - Rate limiting
 * - Input validation
 * - Row Level Security (enforced by Supabase)
 */
export async function GET(request: NextRequest) {
  try {
    // ============================================
    // 1. RATE LIMITING
    // ============================================
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const rateLimitResult = await checkRateLimit(jobPostRateLimit, ip);

    if (!rateLimitResult.allowed) {
      return rateLimitResult.response;
    }

    // ============================================
    // 2. AUTHENTICATION (Optional for browsing)
    // ============================================
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // ============================================
    // 3. PARSE QUERY PARAMETERS
    // ============================================
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType");
    const status = searchParams.get("status") ?? "open";
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "20"),
      100
    );

    // ============================================
    // 4. BUILD QUERY
    // ============================================
    let query = supabase
      .from("jobs")
      .select(
        `
        id,
        title,
        description,
        service_type,
        budget_min,
        budget_max,
        latitude,
        longitude,
        status,
        urgency,
        created_at,
        profiles:user_id (
          full_name,
          profile_image_url
        )
      `
      )
      .eq("status", status)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (serviceType) {
      query = query.eq("service_type", serviceType);
    }

    // ============================================
    // 5. EXECUTE QUERY
    // ============================================
    const { data: jobs, error } = await query;

    if (error) {
      console.error("Job fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: 500 }
      );
    }

    // ============================================
    // 6. RETURN RESULTS
    // ============================================
    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs?.length ?? 0,
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/jobs:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
