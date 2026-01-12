"use client";

import { useMemo } from "react";
import { MenuItem, SubmenuItem } from "@/types/menu";
import { User, BookOpen, ClipboardClock } from "lucide-react";
import { usePathname } from "next/navigation";

const CRM_ID = "sidago-crm";

export const CRMAGENT = [
  { crm_id: CRM_ID, id: "tom-silver", label: "Tom Silver" },
  { crm_id: CRM_ID, id: "mariz-cabido", label: "Mariz Cabido" },
  { crm_id: CRM_ID, id: "alex-grant", label: "Alex Grant" },
  { crm_id: CRM_ID, id: "sophia-rivera", label: "Sophia Rivera" },
];

const AGENT_MENU_ITEMS = [
  "Calls Log",
  "Calls Log Beta",
  "Auto Mighty Call",
  "Leads Manual Update",
  "Dashboard",
] as const;

const AGENT_MENU_PATHS = {
  "Calls Log": "calls-log",
  "Calls Log Beta": "calls-log-beta",
  "Auto Mighty Call": "auto-call",
  "Leads Manual Update": "leads-manual",
  Dashboard: "dashboard",
} as const;

const AUXILIARY_BASE_SUBMENUS = [
  { label: "Level 2 Update", path: "level-update" },
  { label: "Level 2 - History", path: "level-history" },
  { label: "Fix Leads(V4)", path: "fix-lead" },
  { label: "Add Company", path: "add-company" },
  { label: "Update Company", path: "update-company" },
  { label: "All Leads", path: "leads" },
  { label: "Create Additional Contact", path: "additional-contact" },
  { label: "Email Blacklist Directory", path: "email-blacklist" },
  { label: "Dead/Missing Email", path: "dead-email" },
] as const;

const REPORT_SUBMENUS = [
  { label: "Currently Hot Leads - SVG", path: "current-leads-svg" },
  { label: "Currently Hot Leads - Benton", path: "current-leads-benton" },
  { label: "Currently Hot Leads - 95RM", path: "current-leads-95rm" },
  { label: "Unassigned Hot Leads - SVG", path: "unassigned-leads-svg" },
  { label: "Unassigned Hot Leads - Benton", path: "unassigned-leads-benton" },
  { label: "Unassigned Hot Leads - 95RM", path: "unassigned-leads-95rm" },
  { label: "Recent Interest - SVG", path: "recent-interest-svg" },
  { label: "Recent Interest - Benton", path: "recent-interest-benton" },
  { label: "Recent Interest - 95RM", path: "recent-interest-95rm" },
  { label: "Ever been Hot - SVG", path: "ever-been-hot-svg" },
  { label: "Ever been Hot - Benton", path: "ever-been-hot-benton" },
  { label: "Ever been Hot - 95RM", path: "ever-been-hot-95rm" },
  { label: "Leaderborad", path: "leaderborad" },
  { label: "Monthly Stats. & Points", path: "monthly-status" },
  { label: "Closed Contacts", path: "closed-contact" },
] as const;

export default function useMenuTree() {
  const pathname = usePathname();

  // --- Build full menus ---
  const menus: MenuItem[] = useMemo(() => {
    const agents = CRMAGENT.filter((a) => a.crm_id === CRM_ID);

    const agentMenus: MenuItem[] = agents.map((agent) => {
      const submenus: SubmenuItem[] = AGENT_MENU_ITEMS.map((label) => ({
        label,
        href: `/crm/${CRM_ID}/${agent.id}/${AGENT_MENU_PATHS[label]}`,
      }));

      return {
        id: agent.id,
        icon: <User size={16} />,
        label: agent.label,
        routes: submenus.map((s) => s.href),
        submenus,
      };
    });

    const auxiliarySubmenus: SubmenuItem[] = [
      ...AUXILIARY_BASE_SUBMENUS.map((m) => ({
        label: m.label,
        href: `/crm/${CRM_ID}/${m.path}`,
      })),
      ...agents.map((agent) => ({
        label: `SMS - ${agent.label}`,
        href: `/crm/${CRM_ID}/${agent.id}/sms`,
      })),
      ...agents.map((agent) => ({
        label: `Email - ${agent.label}`,
        href: `/crm/${CRM_ID}/${agent.id}/email`,
      })),
    ];

    const auxiliaryMenu: MenuItem = {
      id: "auxiliary-staff",
      icon: <BookOpen size={16} />,
      label: "Auxiliary Staff",
      routes: auxiliarySubmenus.map((s) => s.href),
      submenus: auxiliarySubmenus,
    };

    const reportSubmenus: SubmenuItem[] = REPORT_SUBMENUS.map((r) => ({
      label: r.label,
      href: `/crm/${CRM_ID}/${r.path}`,
    }));

    const reportMenu: MenuItem = {
      id: "reports",
      icon: <ClipboardClock size={16} />,
      label: "Reports",
      routes: reportSubmenus.map((s) => s.href),
      submenus: reportSubmenus,
    };

    return [...agentMenus, auxiliaryMenu, reportMenu];
  }, []);

  // --- Derive activeParentId and activeTab directly from URL ---
  const { activeParentId, activeTab } = useMemo(() => {
    if (!pathname) return { activeParentId: null, activeTab: null };
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "crm") return { activeParentId: null, activeTab: null };
    return { activeParentId: parts[2] || null, activeTab: pathname };
  }, [pathname]);

  const isParentActive = (routes: string[]) => {
    if (!activeTab) return false;
    // Check if activeTab starts with any of the routes
    return routes.some((route) => activeTab.startsWith(route));
  };

  return {
    menus,
    activeParentId,
    isParentActive,
    activeTab,
  };
}
