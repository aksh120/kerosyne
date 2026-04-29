/**
 * Input validation and sanitization utilities.
 * Schema-based validation with type checks, length limits, and field whitelisting.
 * 
 * OWASP: Protects against injection attacks, mass assignment,
 * and unexpected data corruption.
 */

import { NextResponse } from "next/server";

// ─── Sanitization ──────────────────────────────────────────

/**
 * Strip HTML tags and trim whitespace to prevent XSS.
 * Does NOT remove valid characters — only strips dangerous markup.
 */
function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")   // Strip HTML tags
    .replace(/&lt;/g, "<")     // Decode common entities for re-sanitization
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>/g, "")   // Strip again after decoding
    .trim();
}

// ─── Field Schema Definition ───────────────────────────────

type FieldType = "string" | "number" | "array" | "object" | "boolean";

interface FieldSchema {
  type: FieldType;
  required?: boolean;
  maxLength?: number;       // For strings
  minLength?: number;       // For strings
  min?: number;             // For numbers
  max?: number;             // For numbers
  maxItems?: number;        // For arrays
  pattern?: RegExp;         // Regex validation
  sanitize?: boolean;       // Whether to sanitize strings (default: true)
}

// ─── Validation Schemas for Each Entity ────────────────────

/**
 * Product schema — only these fields are accepted.
 * Any unexpected fields will be silently stripped (mass assignment protection).
 */
export const productSchema: Record<string, FieldSchema> = {
  id: { type: "number", required: true, min: 1, max: 999999 },
  title: { type: "string", required: true, minLength: 1, maxLength: 200, sanitize: true },
  srcUrl: { type: "string", required: true, maxLength: 2000 },
  gallery: { type: "array", maxItems: 20 },
  price: { type: "number", required: true, min: 0, max: 9999999 },
  discount: { type: "object" },
  rating: { type: "number", min: 0, max: 5 },
  category: { type: "string", required: true, maxLength: 100, sanitize: true },
};

/**
 * Review schema
 */
export const reviewSchema: Record<string, FieldSchema> = {
  id: { type: "number", required: true, min: 1, max: 999999 },
  user: { type: "string", required: true, minLength: 1, maxLength: 100, sanitize: true },
  content: { type: "string", required: true, minLength: 1, maxLength: 5000, sanitize: true },
  rating: { type: "number", required: true, min: 1, max: 5 },
  date: { type: "string", required: true, maxLength: 100, sanitize: true },
};

/**
 * Order schema
 */
export const orderSchema: Record<string, FieldSchema> = {
  id: { type: "string", required: true, maxLength: 50, sanitize: true },
  customer: { type: "string", required: true, minLength: 1, maxLength: 200, sanitize: true },
  email: { type: "string", required: true, maxLength: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  status: { type: "string", required: true, maxLength: 50, sanitize: true },
  total: { type: "number", required: true, min: 0, max: 99999999 },
  date: { type: "string", required: true, maxLength: 50 },
  items: { type: "object" },
};

/**
 * User schema
 */
export const userSchema: Record<string, FieldSchema> = {
  id: { type: "number", required: true, min: 1, max: 999999 },
  name: { type: "string", required: true, minLength: 1, maxLength: 200, sanitize: true },
  email: { type: "string", required: true, maxLength: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  role: { type: "string", maxLength: 50, sanitize: true },
  joined: { type: "string", maxLength: 50, sanitize: true },
};

/**
 * Login schema — strict limits for auth inputs
 */
export const loginSchema: Record<string, FieldSchema> = {
  email: { type: "string", required: true, maxLength: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: "string", required: true, minLength: 1, maxLength: 128 },
};

// ─── Validation Engine ─────────────────────────────────────

interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: Record<string, unknown>;
}

/**
 * Validate a single object against a schema.
 * - Rejects unexpected fields (mass assignment protection)
 * - Enforces type checks, length limits, and regex patterns
 * - Sanitizes strings to prevent XSS
 */
export function validateObject(
  data: unknown,
  schema: Record<string, FieldSchema>
): ValidationResult {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { valid: false, errors: ["Input must be an object"], sanitized: {} };
  }

  const obj = data as Record<string, unknown>;

  // Check for required fields
  for (const [fieldName, fieldSchema] of Object.entries(schema)) {
    if (fieldSchema.required && !(fieldName in obj)) {
      errors.push(`Missing required field: ${fieldName}`);
    }
  }

  // Validate and sanitize each field — reject unexpected fields
  for (const [key, value] of Object.entries(obj)) {
    const fieldSchema = schema[key];

    // OWASP: Reject unexpected fields (mass assignment protection)
    if (!fieldSchema) {
      // Silently skip unknown fields instead of copying them through
      continue;
    }

    // Allow null/undefined for non-required fields
    if (value === null || value === undefined) {
      if (fieldSchema.required) {
        errors.push(`Field '${key}' is required but was null/undefined`);
      }
      continue;
    }

    // Type checking
    if (fieldSchema.type === "array") {
      if (!Array.isArray(value)) {
        errors.push(`Field '${key}' must be an array`);
        continue;
      }
      if (fieldSchema.maxItems && (value as unknown[]).length > fieldSchema.maxItems) {
        errors.push(`Field '${key}' exceeds max items (${fieldSchema.maxItems})`);
        continue;
      }
      sanitized[key] = value;
    } else if (fieldSchema.type === "object") {
      if (typeof value !== "object") {
        errors.push(`Field '${key}' must be an object`);
        continue;
      }
      sanitized[key] = value;
    } else if (fieldSchema.type === "number") {
      const num = Number(value);
      if (isNaN(num)) {
        errors.push(`Field '${key}' must be a number`);
        continue;
      }
      if (fieldSchema.min !== undefined && num < fieldSchema.min) {
        errors.push(`Field '${key}' must be >= ${fieldSchema.min}`);
        continue;
      }
      if (fieldSchema.max !== undefined && num > fieldSchema.max) {
        errors.push(`Field '${key}' must be <= ${fieldSchema.max}`);
        continue;
      }
      sanitized[key] = num;
    } else if (fieldSchema.type === "string") {
      if (typeof value !== "string") {
        errors.push(`Field '${key}' must be a string`);
        continue;
      }

      // Sanitize strings by default
      const cleaned = fieldSchema.sanitize !== false ? sanitizeString(value) : value.trim();

      if (fieldSchema.minLength !== undefined && cleaned.length < fieldSchema.minLength) {
        errors.push(`Field '${key}' must be at least ${fieldSchema.minLength} characters`);
        continue;
      }
      if (fieldSchema.maxLength !== undefined && cleaned.length > fieldSchema.maxLength) {
        errors.push(`Field '${key}' exceeds max length (${fieldSchema.maxLength})`);
        continue;
      }
      if (fieldSchema.pattern && !fieldSchema.pattern.test(cleaned)) {
        errors.push(`Field '${key}' has an invalid format`);
        continue;
      }
      sanitized[key] = cleaned;
    } else if (fieldSchema.type === "boolean") {
      if (typeof value !== "boolean") {
        errors.push(`Field '${key}' must be a boolean`);
        continue;
      }
      sanitized[key] = value;
    }
  }

  return { valid: errors.length === 0, errors, sanitized };
}

/**
 * Validate an array of objects against a schema.
 * Limits the maximum batch size to prevent abuse.
 */
export function validateArray(
  data: unknown,
  schema: Record<string, FieldSchema>,
  maxBatchSize: number = 100
): { valid: boolean; errors: string[]; sanitized: Record<string, unknown>[] } {
  if (!Array.isArray(data)) {
    return { valid: false, errors: ["Input must be an array"], sanitized: [] };
  }

  if (data.length > maxBatchSize) {
    return { valid: false, errors: [`Batch size exceeds limit (${maxBatchSize})`], sanitized: [] };
  }

  if (data.length === 0) {
    return { valid: false, errors: ["Input array cannot be empty"], sanitized: [] };
  }

  const allErrors: string[] = [];
  const allSanitized: Record<string, unknown>[] = [];

  for (let i = 0; i < data.length; i++) {
    const result = validateObject(data[i], schema);
    if (!result.valid) {
      allErrors.push(`Item ${i}: ${result.errors.join(", ")}`);
    } else {
      allSanitized.push(result.sanitized);
    }
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    sanitized: allSanitized,
  };
}

/**
 * Helper to return a standardized 400 validation error response.
 */
export function validationError(errors: string[]): NextResponse {
  return NextResponse.json(
    { error: "Validation failed", details: errors },
    { status: 400 }
  );
}

/**
 * Safely parse the request body as JSON, with a size limit.
 * OWASP: Protects against oversized payloads / JSON bombs.
 */
export async function safeParseBody(
  request: Request,
  maxSizeBytes: number = 1_048_576 // 1MB default
): Promise<{ data: unknown; error: string | null }> {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > maxSizeBytes) {
      return { data: null, error: "Request body too large" };
    }

    const body = await request.text();
    if (body.length > maxSizeBytes) {
      return { data: null, error: "Request body too large" };
    }

    const data = JSON.parse(body);
    return { data, error: null };
  } catch {
    return { data: null, error: "Invalid JSON body" };
  }
}
