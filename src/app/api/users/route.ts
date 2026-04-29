/**
 * Users API Route — Hardened
 * 
 * GET:  Admin-only (user data is PII), rate-limited
 * POST: Admin-only write, rate-limited, validated
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "@/lib/rate-limit";
import { userSchema, validateArray, validationError, safeParseBody } from "@/lib/validate";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.admin, prefix: "users-get" });
  if (rateLimited) return rateLimited;

  // Users contain PII — require admin auth
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.admin, prefix: "users-post" });
  if (rateLimited) return rateLimited;

  const authError = await requireAdminAuth();
  if (authError) return authError;

  const { data: body, error: parseError } = await safeParseBody(request);
  if (parseError) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  const validation = validateArray(body, userSchema, 50);
  if (!validation.valid) {
    return validationError(validation.errors);
  }

  try {
    const { error } = await supabase
      .from('users')
      .upsert(validation.sanitized);
    
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
