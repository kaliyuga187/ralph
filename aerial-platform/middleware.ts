import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Strict-Transport-Security (HSTS)
  // Force HTTPS connections for 2 years, including subdomains
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // X-Frame-Options
  // Prevent clickjacking by disallowing embedding in iframes
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  // X-Content-Type-Options
  // Prevent MIME sniffing attacks
  response.headers.set("X-Content-Type-Options", "nosniff");

  // X-XSS-Protection
  // Enable browser XSS protection (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer-Policy
  // Control referrer information leakage
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions-Policy
  // Disable potentially dangerous browser features
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=()"
  );

  // Content-Security-Policy
  // Prevent XSS, code injection, and other attacks
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com",
    "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://api.mapbox.com https://events.mapbox.com wss://*.supabase.co",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ];
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));

  // X-DNS-Prefetch-Control
  // Control DNS prefetching for performance/privacy
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
