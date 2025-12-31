import PrivateLayout from "@/layouts/private/PrivateLayout";
import React, { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
