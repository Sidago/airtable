"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export function useAuth() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  // ✅ Get logged-in user (cookie-based)
  const meQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: authService.me,
    retry: false,
  });

  // ✅ Login
  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ user }) => {
      setUser(user);
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
