"use client";

import React, { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import NextTopLoader from "nextjs-toploader";
import Loader from "@/modules/loader/components/Loader";

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });
const MobileSidebar = dynamic(() => import("./MobileSidebar"), { ssr: false });

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const tokens = useAuthStore((s) => s.tokens);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Wait until Zustand store is rehydrated from localStorage
  useEffect(() => {
    const timeout = setTimeout(() => setHydrated(true), 0); 
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Redirect if no access token after hydration
  useEffect(() => {
    if (hydrated && !tokens?.access_token) {
      router.replace("/signin");
    }
  }, [hydrated, tokens, router]);

  // Show nothing until store is rehydrated
  if (!hydrated) return null;

  return (
    <ReactQueryProvider>
      <NextTopLoader showSpinner={false} />
      <Loader/>
      <div className="h-screen overflow-hidden">
        <div className="flex h-full">
          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Mobile Drawer */}
          <MobileSidebar />

          {/* Main Content */}
          <div className="flex flex-col flex-1 mt-12 md:mt-0 min-w-0">
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ReactQueryProvider>
  );
}
