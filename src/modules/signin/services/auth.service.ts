import { apiConfig } from "@/config/api.config";

export const authService = {
  login: async (payload: { email: string; password: string }) => {
    const res = await fetch(apiConfig.endpoints.signin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  me: async (accessToken?: string | null) => {
    const res = await fetch(apiConfig.endpoints.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 401) {
      return { status: 401 };
    }

    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },

  refreshToken: async (refreshToken?: string | null) => {
    const res = await fetch(apiConfig.endpoints.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) return null;
    return res.json();
  },

  logout: async (accessToken?: string | null) => {
    await fetch(apiConfig.endpoints.logout, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
