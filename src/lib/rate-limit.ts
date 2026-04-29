/**
 * In-memory rate limiter for API routes.
 * Uses a sliding window approach with IP-based tracking.
 * 
 * OWASP: Protects against brute-force, credential stuffing,
 * and denial-of-service attacks on API endpoints.
 * 
 * Note: In production with multiple instances, replace with
 * Redis-based rate limiting (e.g., @upstash/ratelimit).
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Store rate limit entries per IP
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60_000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSizeSeconds: number;
  /** Optional prefix to namespace rate limits (e.g., "login", "api") */
  prefix?: string;
}

// Sensible defaults per endpoint type
export const RATE_LIMIT_PRESETS = {
  /** Public read endpoints: generous limits */
  public: { maxRequests: 60, windowSizeSeconds: 60 } as RateLimitConfig,
  /** Admin write endpoints: moderate limits */
  admin: { maxRequests: 30, windowSizeSeconds: 60 } as RateLimitConfig,
  /** Login endpoint: strict limits to prevent brute-force */
  login: { maxRequests: 5, windowSizeSeconds: 300, prefix: "login" } as RateLimitConfig,
} as const;

/**
 * Get the client IP from request headers.
 * Checks X-Forwarded-For (proxy/CDN) first, falls back to X-Real-Ip.
 */
function getClientIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    // Take only the first IP (client IP) to prevent spoofing
    return forwarded.split(",")[0].trim();
  }
  return headersList.get("x-real-ip") || "unknown";
}

/**
 * Check rate limit for the current request.
 * Returns null if within limits, or a 429 response if exceeded.
 */
export async function checkRateLimit(
  config: RateLimitConfig = RATE_LIMIT_PRESETS.public
): Promise<NextResponse | null> {
  cleanup();

  const headersList = await headers();
  const ip = getClientIp(headersList);
  const key = `${config.prefix || "api"}:${ip}`;
  const now = Date.now();

  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    // First request or window expired — start fresh
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowSizeSeconds * 1000,
    });
    return null;
  }

  existing.count++;

  if (existing.count > config.maxRequests) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

    // OWASP: Return 429 with Retry-After header, no internal details
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfterSeconds: retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(config.maxRequests),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(existing.resetAt / 1000)),
        },
      }
    );
  }

  return null;
}
