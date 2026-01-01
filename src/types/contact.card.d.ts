import { ReactNode } from "react";

export interface ContactCardProps {
  onClick?: () => void;
  label: string | ReactNode;
  rows?: { label: string | ReactNode; value: string | ReactNode }[];
}
