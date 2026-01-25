import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
// Note: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in .env.local
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Auth endpoints: 5 attempts per 15 minutes
export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "ratelimit:auth",
    })
  : null;

// API endpoints: 100 requests per minute
export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  : null;

// Job posting: 10 per hour
export const jobPostRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      analytics: true,
      prefix: "ratelimit:jobs",
    })
  : null;

// Bid submission: 20 per hour
export const bidRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      analytics: true,
      prefix: "ratelimit:bids",
    })
  : null;

/**
 * Helper function to check rate limit and return appropriate response
 */
export async function checkRateLimit(
  limiter: typeof authRateLimit,
  identifier: string
): Promise<{ allowed: boolean; response?: Response }> {
  if (!limiter) {
    // If rate limiting is not configured, allow the request
    return { allowed: true };
  }

  const { success, reset } = await limiter.limit(identifier);

  if (!success) {
    const resetDate = new Date(reset);
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          resetAt: resetDate.toISOString(),
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }

  return { allowed: true };
}
