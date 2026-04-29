/**
 * Admin Login API Route
 * 
 * OWASP: Server-side credential validation with:
 * - Rate limiting (5 attempts per 5 minutes per IP)
 * - Input validation and sanitization
 * - Timing-safe credential comparison
 * - Generic error messages (no credential enumeration)
 */

import { NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "@/lib/rate-limit";
import { loginSchema, validateObject, safeParseBody } from "@/lib/validate";
import { validateAdminCredentials, generateSessionToken, addSession } from "@/lib/auth";

export async function POST(request: Request) {
  // 1. Rate limit — strict for login (5 attempts per 5 minutes)
  const rateLimited = await checkRateLimit(RATE_LIMIT_PRESETS.login);
  if (rateLimited) return rateLimited;

  // 2. Parse body safely (max 10KB for login)
  const { data: body, error: parseError } = await safeParseBody(request, 10_240);
  if (parseError) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  // 3. Validate input schema
  const validation = validateObject(body, loginSchema);
  if (!validation.valid) {
    // OWASP: Return generic message, don't expose validation details for login
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { email, password } = validation.sanitized as { email: string; password: string };

  // 4. Validate credentials server-side (timing-safe)
  if (!validateAdminCredentials(email, password)) {
    // OWASP: Generic error — don't reveal if email or password was wrong
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // 5. Generate session token
  const token = generateSessionToken();
  addSession(token);

  return NextResponse.json({ success: true, token });
}
