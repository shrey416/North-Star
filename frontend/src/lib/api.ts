// frontend/src/lib/api.ts
import { auth } from "./firebase"; // Your existing firebase setup

const API_URL = "http://127.0.0.1:8000/api"; // Your backend URL

/**
 * A helper function to make authenticated requests to our FastAPI backend.
 * It automatically includes the Firebase auth token in the headers.
 */
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const token = await user.getIdToken();

  const headers = new Headers(options.headers || {});
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // You can handle errors more gracefully here
    const errorData = await response.json();
    throw new Error(errorData.detail || "API request failed");
  }

  return response;
};