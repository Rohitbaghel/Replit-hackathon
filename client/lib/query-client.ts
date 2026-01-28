import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * Gets the base URL for the Express API server (e.g., "http://localhost:5000")
 * @returns {string} The API base URL
 */
export function getApiUrl(): string {
  let host = process.env.EXPO_PUBLIC_DOMAIN;

  // For local development, default to localhost:5001
  if (!host) {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Use the current origin but change port to 5001 (where the server runs)
      const currentOrigin = window.location.origin;
      try {
        const url = new URL(currentOrigin);
        // Default to port 5001 for the API server
        const apiUrl = `${url.protocol}//${url.hostname}:5001`;
        console.log("[getApiUrl] Using localhost API:", apiUrl);
        return apiUrl;
      } catch {
        // Fallback to localhost:5001
        console.log("[getApiUrl] Using fallback localhost:5001");
        return "http://localhost:5001";
      }
    }
    // For non-browser environments, default to localhost:5001
    console.log("[getApiUrl] Using localhost:5001 for non-browser");
    return "http://localhost:5001";
  }

  // For production/Replit, use the configured domain
  // Handle both with and without protocol
  if (host.startsWith("http://") || host.startsWith("https://")) {
    return host;
  }

  // Default to https for production domains
  return `https://${host}`;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  route: string,
  data?: unknown | undefined,
): Promise<Response> {
  const baseUrl = getApiUrl();
  const url = new URL(route, baseUrl);

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const baseUrl = getApiUrl();
    const url = new URL(queryKey.join("/") as string, baseUrl);

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
