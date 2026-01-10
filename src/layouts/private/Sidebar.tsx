"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronsLeft,
  ClipboardClock,
  Table,
  User,
} from "lucide-react";
import clsx from "clsx";
import Dropdown from "@/components/shared/Dropdown";
import Avatar from "@/components/shared/Avatar";
import Menu from "@/components/menu/Menu";
import { MenuItem } from "@/types/menu";
import { useAuthStore } from "@/modules/signin/store/auth.store";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-full bg-[#3b66a3] transition-all duration-300",
        collapsed ? "w-16" : "w-68"
      )}
    >
      {/* Top Branding */}
      {collapsed ? (
        <div className="px-4 py-5 flex justify-center items-center text-white">
          <Table size={16} />
        </div>
      ) : (
        <div className="px-4 py-5">
          <Dropdown
            label="Sidago - CRM"
            buttonClassName="text-white"
            items={[
              {
                label: "Sidago - CRM 2",
                value: "crm-2",
              },
            ]}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        {MENUS.map((menu, idx) => (
          <Menu
            key={idx}
            icon={menu.icon}
            label={menu.label}
            routes={menu.routes}
            submenus={menu.submenus}
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-3 bg-white/10">
        <div
          className={clsx(
            "flex items-center gap-3 transition-all duration-200",
            collapsed
              ? "flex-col-reverse justify-center"
              : "flex-row justify-between"
          )}
        >
          <div
            className={clsx("flex items-center gap-3", collapsed && "flex-col")}
          >
            <Avatar
              initials={user?.name}
              size="xs"
              shape="rounded-full"
              initialsClassName="text-white text-sm bg-purple-500"
            />
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-xs font-normal rounded-md w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-[#3b66a3]/50"
          >
            <ChevronsLeft
              size={16}
              className={clsx(
                "transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

const MENUS: MenuItem[] = [
  {
    id: "tom-silver",
    icon: <User size={16} />,
    label: "Tom Silver",
    routes: ["/calls-log", "/calls-log-beta", "/auto-call"],
    submenus: [
      { label: "Calls Log", href: "/calls-log" },
      { label: "Calls Log Beta", href: "/calls-log-beta" },
      { label: "Auto Mighty Call Tom", href: "/auto-call" },
      { label: "Leads Manual Update", href: "/leads-manual" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },

  {
    id: "mariz-cabido",
    icon: <User size={16} />,
    label: "Mariz Cabido",
    routes: ["/leads-manual", "/dashboard"],
    submenus: [
      { label: "Calls Log", href: "/calls-log" },
      { label: "Calls Log Beta", href: "/calls-log-beta" },
      { label: "Auto Mighty Call Tom", href: "/auto-call" },
      { label: "Leads Manual Update", href: "/leads-manual" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    id: "auxiliary-staff",
    icon: <BookOpen size={16} />,
    label: "Auxiliary Staff",
    routes: [
      "/level-update",
      "/level-history",
      "/fix-lead",
      "/sms",
      "/email",
      "/blocked-email",
      "/add-company",
      "/update-company",
      "/leads",
      "/additional-contact",
      "/email-blacklist",
      "/dead-email",
    ],
    submenus: [
      { label: "Level 2 Update", href: "/level-update" },
      { label: "Level 2 - History", href: "/level-history" },
      { label: "Fix Leads(V4)", href: "/fix-lead" },
      { label: "SMS - Tom Silver", href: "/sms" },
      { label: "Email - Tom Silver", href: "/email" },
      { label: "Blocked Email", href: "/blocked-email" },
      { label: "Add Company", href: "/add-company" },
      { label: "Update Company", href: "/update-company" },
      { label: "All Leads", href: "/leads" },
      { label: "Create Additional Contact", href: "/additional-contact" },
      { label: "Email Blacklist Directory", href: "/email-blacklist" },
      { label: "Dead/Missing Email", href: "/dead-email" },
    ],
  },
  {
    id: "reports",
    icon: <ClipboardClock size={16} />,
    label: "Reports",
    routes: [
      "/level-update",
      "/level-history",
      "/fix-lead",
      "/sms",
      "/email",
      "/blocked-email",
      "/add-company",
      "/update-company",
      "/leads",
      "/additional-contact",
      "/email-blacklist",
      "/dead-email",
    ],
    submenus: [
      // Currently Hot Leads
      { label: "Currently Hot Leads - SVG", href: "/current-leads-svg" },
      { label: "Currently Hot Leads - Benton", href: "/current-leads-benton" },
      { label: "Currently Hot Leads - 95RM", href: "/current-leads-95rm" },

      // Unassigned Hot Leads
      { label: "Unassigned Hot Leads - SVG", href: "/unassigned-leads-svg" },
      {
        label: "Unassigned Hot Leads - Benton",
        href: "/unassigned-leads-benton",
      },
      { label: "Unassigned Hot Leads - 95RM", href: "/unassigned-leads-95rm" },

      // Recent Interest
      { label: "Recent Interest - SVG", href: "/recent-interest-svg" },
      { label: "Recent Interest - Benton", href: "/recent-interest-benton" },
      { label: "Recent Interest - 95RM", href: "/recent-interest-95rm" },

      // Ever been Hot
      { label: "Ever been Hot - SVG", href: "/ever-been-hot-svg" },
      { label: "Ever been Hot - Benton", href: "/ever-been-hot-benton" },
      { label: "Ever been Hot - 95RM", href: "/ever-been-hot-95rm" },

      { label: "Leaderborad", href: "/leaderborad" },
      { label: "Monthly Stats. & Points", href: "/monthly-status" },
      { label: "Closed Contacts", href: "/closed-contact" },
    ],
  },
];
