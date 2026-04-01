import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry on 429 (rate limit) — surface the error immediately
      retry: (failureCount, error) => {
        if (error instanceof RateLimitError) return false;
        return failureCount < 2;
      },
      // Data is considered fresh for 55s to align with the 60s auto-refresh
      staleTime: 55_000,
    },
  },
});

// ------------------------------------------------------------
// Custom error classes — lets React Query's `retry` fn discriminate
// ------------------------------------------------------------

class RateLimitError extends Error {
  constructor() {
    super("API rate limit reached. Please wait a moment and try again.");
    this.name = "RateLimitError";
  }
}

class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ------------------------------------------------------------
// Base fetch wrapper — throws typed errors
// ------------------------------------------------------------

export async function coinGeckoFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status === 429) {
    throw new RateLimitError();
  }

  if (!res.ok) {
    throw new ApiError(res.status, `Request failed: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
