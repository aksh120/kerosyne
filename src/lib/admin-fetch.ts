/**
 * Authenticated fetch wrapper for admin API calls.
 * Automatically attaches the session token from localStorage.
 * 
 * OWASP: Centralizes auth header injection so no endpoint
 * is accidentally left unprotected.
 */

/**
 * Get the current admin session token.
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("kerosyne_admin_token");
}

/**
 * Fetch wrapper that attaches the admin Bearer token.
 * Falls back to a regular fetch if no token is available.
 */
export async function adminFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken();

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  // SECURITY: If the session is expired or invalid, redirect to login
  if (res.status === 401 || res.status === 403) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kerosyne_admin_auth");
      localStorage.removeItem("kerosyne_admin_token");
      window.location.href = "/admin/login";
    }
  }

  return res;
}
