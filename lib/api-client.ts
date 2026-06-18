import type { AuthResponse, Feedback, HistoryResponse, Interaction, Recap, User } from "@/lib/domain";

const TOKEN_KEY = "ult_token";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8787";
}

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function isSignedIn() {
  return Boolean(getToken());
}

async function request<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers
  });

  const payload = (await response.json().catch(() => null)) as { error?: string } | T | null;
  if (!response.ok) {
    throw new Error((payload as { error?: string } | null)?.error || `Request failed with ${response.status}`);
  }
  return payload as T;
}

export async function signUp(input: { name: string; email: string; password: string }) {
  const response = await request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input)
  });
  setToken(response.token);
  return response;
}

export async function signIn(input: { email: string; password: string }) {
  const response = await request<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(input)
  });
  setToken(response.token);
  return response;
}

export async function getMe() {
  return request<{ user: User }>("/me");
}

export async function savePreferences(input: { preferred: string[]; avoided: string[] }) {
  return request<{ user: User }>("/preferences", {
    method: "PUT",
    body: JSON.stringify(input)
  });
}

export async function launchMoment() {
  return request<{ interaction: Interaction }>("/moments/launch", {
    method: "POST",
    body: JSON.stringify({})
  });
}

export async function recordFeedback(input: {
  interactionId: string;
  feedback: Feedback;
  quizAnswer?: string;
}) {
  return request<{ interaction: Interaction }>(`/interactions/${input.interactionId}/feedback`, {
    method: "POST",
    body: JSON.stringify({
      feedback: input.feedback,
      quizAnswer: input.quizAnswer
    })
  });
}

export async function createRecap() {
  return request<{ recap: Recap }>("/recaps", {
    method: "POST",
    body: JSON.stringify({})
  });
}

export async function getHistory() {
  return request<HistoryResponse>("/history");
}

export async function getRecap(id: string) {
  return request<{ recap: Recap }>(`/recaps/${id}`);
}
