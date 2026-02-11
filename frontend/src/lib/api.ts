const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function getCsrfToken(): Promise<string> {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  if (match) return match.split("=")[1];

  // If no cookie yet, hit the session endpoint to get one
  await fetch(`${API_BASE}/api/auth/browser/v1/auth/session`, {
    credentials: "include",
  });
  const after = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return after?.split("=")[1] ?? "";
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw { status: res.status, body };
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---- Auth API (allauth headless browser) ----

const AUTH = "/api/auth/browser/v1";

export interface AuthUser {
  id: number;
  email: string;
  username: string;
}

export interface AuthSession {
  user: AuthUser;
}

export async function getSession(): Promise<AuthSession | null> {
  try {
    const data = await apiFetch<{ data: AuthSession }>(`${AUTH}/auth/session`);
    return data.data;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  return apiFetch<{ data: AuthSession }>(`${AUTH}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(
  email: string,
  password1: string,
  password2: string,
) {
  return apiFetch<{ data: AuthSession }>(`${AUTH}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password1, password2 }),
  });
}

export async function logout() {
  return apiFetch(`${AUTH}/auth/session`, { method: "DELETE" });
}

export function getProviderRedirectUrl(provider: "github" | "google") {
  const callbackUrl = `${window.location.origin}/auth/callback/${provider}`;
  return `${API_BASE}${AUTH}/auth/provider/redirect?provider=${provider}&callback_url=${encodeURIComponent(callbackUrl)}&process=login`;
}

// ---- Products API ----

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
}

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/api/products/");
}
