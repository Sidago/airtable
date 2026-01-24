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

  me: async (accessToken: string | null | undefined) => {
    const res = await fetch(`${apiConfig.endpoints.me}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    return res.json();
  },

  logout: async (accessToken: string | null | undefined) => {
    await fetch(apiConfig.endpoints.logout, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
