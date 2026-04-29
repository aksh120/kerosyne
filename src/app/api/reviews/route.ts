/**
 * Reviews API Route — Hardened
 * 
 * GET:  Public read, rate-limited (60 req/min per IP)
 * POST: Admin-only write, rate-limited (30 req/min per IP),
 *       with schema validation and sanitization
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "@/lib/rate-limit";
import { reviewSchema, validateArray, validationError, safeParseBody } from "@/lib/validate";
import { requireAdminAuth } from "@/lib/auth";

export async function GET() {
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.public, prefix: "reviews-get" });
  if (rateLimited) return rateLimited;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.admin, prefix: "reviews-post" });
  if (rateLimited) return rateLimited;

  const authError = await requireAdminAuth();
  if (authError) return authError;

  const { data: body, error: parseError } = await safeParseBody(request);
  if (parseError) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  const validation = validateArray(body, reviewSchema, 100);
  if (!validation.valid) {
    return validationError(validation.errors);
  }

  try {
    const { error } = await supabase
      .from('reviews')
      .upsert(validation.sanitized);
    
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const rateLimited = await checkRateLimit({ ...RATE_LIMIT_PRESETS.admin, prefix: "reviews-delete" });
  if (rateLimited) return rateLimited;

  const authError = await requireAdminAuth();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
