// useAuth.ts
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export function useAuth() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setTokens = useAuthStore((s) => s.setTokens);
  const tokens = useAuthStore((s) => s.tokens);

  const meQuery = useQuery({
    queryKey: ["auth-user", tokens?.access_token],
    retry: false,
    queryFn: async () => {
      if (!tokens?.access_token) return null;

      const me = await authService.me(tokens.access_token);

      // ✅ Access token expired
      if (me?.status === 401) {
        if (!tokens?.refresh_token) {
          logout.mutate();
          return null;
        }

        // 🔁 Try refresh token
        const refreshed = await authService.refreshToken(tokens.refresh_token);
        console.log(refreshed)

        if (!refreshed?.access_token) {
          logout.mutate();
          return null;
        }

        // ✅ Save new tokens
        setTokens({
          access_token: refreshed.access_token,
          refresh_token: refreshed.refresh_token,
        });

        // 🔁 Retry me API
        const meRetry = await authService.me(refreshed.access_token);
        return meRetry;
      }

      return me;
    },
  });

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ access_token, refresh_token, user }) => {
      setUser(user);
      setTokens({ access_token, refresh_token });
      router.replace("/");
    },
  });

  const logout = useMutation({
    mutationFn: () => authService.logout(tokens?.access_token),
    onSuccess: () => {
      setUser(null);
      setTokens(null);
      router.replace("/signin");
    },
  });

  return {
    user: meQuery.data,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isLoading,
    login,
    logout,
  };
}
