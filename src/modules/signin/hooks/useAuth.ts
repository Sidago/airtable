/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export function useAuth() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setTokens = useAuthStore((s) => s.setTokens);
  const tokens = useAuthStore((s) => s.tokens);
  const logoutStore = useAuthStore((s) => s.logout); // Assuming you have a clear action

  const meQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.me(tokens?.access_token),
    retry: false,
    // Prevents the query from running if there's no token at all
    enabled: !!tokens?.access_token, 
  });

  // ✅ Automatically logout on 401
  useEffect(() => {
    if (meQuery.error) {
      const status = (meQuery.error as any)?.response?.status;
      if (status === 401) {
        // Clear local state
        setUser(null);
        setTokens(null);
        // Redirect to login
        router.replace("/signin");
      }
    }
  }, [meQuery.error, setUser, setTokens, router]);

  // ✅ Manual Logout Mutation
  const logout = useMutation({
    mutationFn: authService.logout,
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
    error: meQuery.error,
    login: useMutation({
        mutationFn: authService.login,
        onSuccess: ({ access_token, refresh_token, user }) => {
          setUser(user);
          setTokens({ access_token, refresh_token });
          router.replace("/");
        },
    }),
    logout,
  };
}