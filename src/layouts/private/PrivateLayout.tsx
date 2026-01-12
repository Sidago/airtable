"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false, // or remove if SSR is fine
});

const MobileSidebar = dynamic(() => import("./MobileSidebar"), {
  ssr: false, // optional
});

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
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
