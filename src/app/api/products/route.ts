/**
 * Products API Route — Hardened
 * 
 * GET:  Public read, rate-limited (60 req/min per IP)
 * POST: Admin-only write, rate-limited (30 req/min per IP),
 *       with schema validation and sanitization
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "@/lib/rate-limit";
import { productSchema, validateArray, validationError, safeParseBody } from "@/lib/validate";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  // Rate limit public reads
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.public, prefix: "products-get" });
  if (rateLimited) return rateLimited;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    // OWASP: Don't expose internal error details to clients
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // 1. Rate limit admin writes
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.admin, prefix: "products-post" });
  if (rateLimited) return rateLimited;

  // 2. Require admin auth
  const authError = await requireAdminAuth();
  if (authError) return authError;

  // 3. Parse body safely (max 1MB)
  const { data: body, error: parseError } = await safeParseBody(request);
  if (parseError) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  // 4. Validate and sanitize all product data
  const validation = validateArray(body, productSchema, 50);
  if (!validation.valid) {
    return validationError(validation.errors);
  }

  try {
    const { error } = await supabase
      .from('products')
      .upsert(validation.sanitized);
    
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
