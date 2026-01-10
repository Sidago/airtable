import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ✅ Define a proper User type instead of any
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
