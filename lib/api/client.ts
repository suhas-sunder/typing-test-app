export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = readAuthToken();
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Server returned an invalid response.");
  }
}

function readAuthToken() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem("jwt_token");
  } catch {
    return null;
  }
}

async function readErrorMessage(response: Response) {
  const text = await response.text();
  if (!text) return "";

  try {
    const parsed = JSON.parse(text) as unknown;
    if (typeof parsed === "string") return parsed.slice(0, 500);
    if (parsed && typeof parsed === "object" && "error" in parsed) {
      const error = (parsed as { error?: unknown }).error;
      return typeof error === "string" ? error.slice(0, 500) : "";
    }
  } catch {
    // Fall back to bounded plain text.
  }

  return text.slice(0, 500);
}
