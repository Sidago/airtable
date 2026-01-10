import PublicLayout from "@/layouts/public/PublicLayout";
import React, { ReactNode } from "react";

export default function Authlayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
