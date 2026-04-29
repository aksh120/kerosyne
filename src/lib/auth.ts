/**
 * Server-side admin authentication utilities.
 * 
 * OWASP: Credentials are stored in environment variables,
 * never hard-coded in source code. Auth checks happen server-side
 * via a secure API route, not client-side JS comparisons.
 */

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

// ─── Credential Management ────────────────────────────────

/**
 * Get admin credentials from environment variables.
 * Falls back to empty strings if not set (will always fail auth).
 */
function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

/**
 * Timing-safe comparison to prevent timing attacks.
 * OWASP: Standard string comparison leaks information about
 * which characters matched, allowing attackers to guess credentials
 * one character at a time.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do a comparison to maintain constant time
    crypto.timingSafeEqual(
      Buffer.from(a.padEnd(Math.max(a.length, b.length))),
      Buffer.from(b.padEnd(Math.max(a.length, b.length)))
    );
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Validate admin credentials server-side.
 * Returns true only if both email and password match exactly.
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const creds = getAdminCredentials();

  // Ensure env vars are configured
  if (!creds.email || !creds.password) {
    console.error("SECURITY: Admin credentials not configured in environment variables!");
    return false;
  }

  const emailMatch = timingSafeEqual(email.toLowerCase(), creds.email.toLowerCase());
  const passwordMatch = timingSafeEqual(password, creds.password);

  return emailMatch && passwordMatch;
}

/**
 * Generate a simple session token.
 * In production, use a proper JWT or session management library.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// ─── API Route Auth Guard ──────────────────────────────────

import fs from "fs";
import path from "path";

// ─── Persistent Session Management ─────────────────────────

// Store sessions in a local file so they survive server restarts
const SESSION_FILE = path.join(process.cwd(), ".sessions.json");

function getSessions(): Set<string> {
  try {
    if (fs.existsSync(SESSION_FILE)) {
      const data = fs.readFileSync(SESSION_FILE, "utf-8");
      return new Set(JSON.parse(data));
    }
  } catch (e) {
    console.error("Error reading sessions:", e);
  }
  return new Set();
}

function saveSessions(sessions: Set<string>) {
  try {
    fs.writeFileSync(SESSION_FILE, JSON.stringify(Array.from(sessions)), "utf-8");
  } catch (e) {
    console.error("Error saving sessions:", e);
  }
}

export function addSession(token: string): void {
  const sessions = getSessions();
  sessions.add(token);
  saveSessions(sessions);
}

export function removeSession(token: string): void {
  const sessions = getSessions();
  sessions.delete(token);
  saveSessions(sessions);
}

export function isValidSession(token: string): boolean {
  const sessions = getSessions();
  return sessions.has(token);
}

/**
 * Verify that a request has a valid admin session.
 * Checks the Authorization header for a Bearer token.
 * Returns null if authorized, or a 401 response if not.
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "");
  if (!isValidSession(token)) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }

  return null;
}
