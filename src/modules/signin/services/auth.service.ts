export const authService = {
  login: async (payload: { email: string; password: string }) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  me: async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return null;
    return res.json();
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
  },
};
