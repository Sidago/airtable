"use client";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import React, { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
