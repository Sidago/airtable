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

  // ✅ Get logged-in user (cookie-based)
  const meQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.me(tokens?.access_token),
    retry: false,
  });

  // ✅ Login
  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ access_token, refresh_token, user }) => {
      setUser(user);
      setTokens({ access_token, refresh_token });
      router.replace("/");
    },
  });

  // ✅ Logout
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
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
