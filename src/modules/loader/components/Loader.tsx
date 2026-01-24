"use client";

import { useLoaderStore } from "../store/loader.store";

export default function Loader() {
  const loading = useLoaderStore((s) => s.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
