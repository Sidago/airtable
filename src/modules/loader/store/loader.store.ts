"use client";

import { create } from "zustand";

type LoaderState = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  showLoader: () => set({ loading: true }),
  hideLoader: () => set({ loading: false }),
}));
