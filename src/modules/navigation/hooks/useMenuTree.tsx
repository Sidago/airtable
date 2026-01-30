/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MenuItem, SubmenuItem } from "@/types/menu";
import { User, BookOpen, ClipboardClock } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLoaderStore } from "@/modules/loader/store/loader.store";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { agentService } from "../services/agent.service";

const CRM_ID = "sidago-crm";

/* ======================================================
   MENU CONSTANTS
====================================================== */

const AGENT_MENU_ITEMS = [
  "Calls Log",
  "Calls Log Beta",
  "Auto Mighty Call",
  "Leads Manual Update",
  "Dashboard",
] as const;

const AGENT_MENU_PATHS: Record<(typeof AGENT_MENU_ITEMS)[number], string> = {
  "Calls Log": "calls-log",
  "Calls Log Beta": "calls-log-beta",
  "Auto Mighty Call": "auto-call",
  "Leads Manual Update": "leads-manual",
  Dashboard: "dashboard",
};

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

/* ======================================================
   HOOK
====================================================== */

export default function useMenuTree() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.tokens?.access_token);

  const showLoader = useLoaderStore((s) => s.showLoader);
  const hideLoader = useLoaderStore((s) => s.hideLoader);

  const [agentList, setAgentList] = useState<string[]>([]);
  const [isFetchingAgents, setIsFetchingAgents] = useState(false);

  /* ======================================================
     FETCH AGENTS
  ====================================================== */

  const fetchAgents = useCallback(async () => {
    if (!token) return;

    setIsFetchingAgents(true);
    try {
      const data = await agentService.agentList(token);
      setAgentList(data.map((a: any) => a.username));
    } catch {
      setAgentList([]);
    } finally {
      setIsFetchingAgents(false);
    }
  }, [token]);

  /* ======================================================
     ROLE-BASED AGENT SOURCE
  ====================================================== */

  useEffect(() => {
    if (!user) return;

    if (user.roles.includes("admin")) {
      fetchAgents();
    } else {
      setAgentList([user.username]);
    }
  }, [user, fetchAgents]);

  /* ======================================================
     AGENT MODELS
  ====================================================== */

  const agents = useMemo(
    () =>
      agentList.map((username) => ({
        id: username,
        label: username.replace(/[-_]/g, " "),
      })),
    [agentList]
  );

  /* ======================================================
     MENUS (PURE DERIVATION)
  ====================================================== */

  const menus: MenuItem[] = useMemo(() => {
    if (!user || agents.length === 0) return [];

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

    const reportMenu: MenuItem = {
      id: "reports",
      icon: <ClipboardClock size={16} />,
      label: "Reports",
      routes: REPORT_SUBMENUS.map((r) => `/crm/${CRM_ID}/${r.path}`),
      submenus: REPORT_SUBMENUS.map((r) => ({
        label: r.label,
        href: `/crm/${CRM_ID}/${r.path}`,
      })),
    };

    const auxiliaryMenu: MenuItem = {
      id: "auxiliary",
      icon: <BookOpen size={16} />,
      label: "Auxiliary Staff",
      routes: AUXILIARY_BASE_SUBMENUS.map(
        (m) => `/crm/${CRM_ID}/${m.path}`
      ),
      submenus: AUXILIARY_BASE_SUBMENUS.map((m) => ({
        label: m.label,
        href: `/crm/${CRM_ID}/${m.path}`,
      })),
    };

    if (user.roles.includes("backoffice")) {
      return [reportMenu];
    }

    if (user.roles.includes("agent")) {
      return agentMenus.filter((m) => m.id === user.username);
    }

    return [...agentMenus, auxiliaryMenu, reportMenu];
  }, [user, agents]);

  /* ======================================================
     GLOBAL LOADER (SINGLE SOURCE OF TRUTH)
  ====================================================== */

  const isLoading =
    !user ||
    isFetchingAgents ||
    (user.roles.includes("admin") && agentList.length === 0);

  useEffect(() => {
    if (isLoading) showLoader();
    else hideLoader();
  }, [isLoading, showLoader, hideLoader]);

  /* ======================================================
     ACTIVE STATE
  ====================================================== */

  const { activeParentId, activeTab } = useMemo(() => {
    if (!pathname) return { activeParentId: null, activeTab: null };

    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "crm") return { activeParentId: null, activeTab: null };

    return {
      activeParentId: parts[2] ?? null,
      activeTab: pathname,
    };
  }, [pathname]);

  const isParentActive = useCallback(
    (routes: string[]) =>
      !!activeTab && routes.some((r) => activeTab.startsWith(r)),
    [activeTab]
  );

  return {
    menus,
    activeParentId,
    activeTab,
    isParentActive,
  };
}
