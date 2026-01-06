export interface BreadcrumbItem {
  label: string;
  active?: boolean;
}
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
