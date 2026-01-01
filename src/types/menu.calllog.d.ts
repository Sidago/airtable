import { ReactNode } from "react";

// Common badge type
export type BadgeType = { label: string; bg: string; color: string } | ReactNode;

// A single submenu item
export interface SubmenuItemProps {
  label: string;
  badge: BadgeType; // optional if some items may not have a badge
}

// A submenu containing items
export interface SubmenuProps {
  label: string;
  badge: BadgeType;
  children?: SubmenuItemProps[]; // optional, can be empty
}

// A menu containing submenus
export interface MenuProps {
  label: string;
  badge: BadgeType;
  children?: SubmenuProps[]; // optional, can be empty
}
