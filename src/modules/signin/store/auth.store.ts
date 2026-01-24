import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --------------------
// Types
// --------------------
export type User = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

type AuthState = {
  user: User | null;
  tokens: Tokens | null;

  setUser: (user: User | null) => void;
  setTokens: (tokens: Tokens | null) => void;
  logout: () => void;
};

// --------------------
// Zustand Store
// --------------------
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,

      setUser: (user: User | null) => set({ user }),
      setTokens: (tokens: Tokens | null) => set({ tokens }),

      logout: () => set({ user: null, tokens: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
