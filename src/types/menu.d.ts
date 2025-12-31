export interface SubmenuItem {
  label: string | React.ReactNode;
  href: string;
}

export interface MenuItem {
  id?: string;
  label: string | React.ReactNode;
  routes: string[];
  submenus: SubmenuItem[];
}
