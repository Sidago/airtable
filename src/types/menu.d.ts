import { ReactNode } from "react";
export interface SubmenuItem {
  label: string | ReactNode;
  href: string;
}

export interface MenuItem {
  id?: string;
  icon: ReactNode;
  label: string | ReactNode;
  routes: string[];
  submenus: SubmenuItem[];
  collapsed?: boolean;
  toggleCollapsed?: () => void;
}
