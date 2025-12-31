"use client";

import { useState } from "react";
import { ChevronsLeft, User } from "lucide-react";
import clsx from "clsx";
import Dropdown from "@/components/shared/Dropdown";
import Avatar from "@/components/shared/Avatar";
import Menu from "@/components/menu/Menu";
import { MenuItem } from "@/types/menu";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-full bg-[#3b66a3] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Top Branding */}
      <div className="px-4 py-5">
        <Dropdown
          label="Sidago - CRM"
          buttonClassName="text-white"
          items={[]}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1">
        {MENUS.map((menu, idx) => (
          <Menu
            key={idx}
            label={menu.label}
            routes={menu.routes}
            submenus={menu.submenus}
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
              initials="M"
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
    label: (
      <div className="flex items-center gap-1 text-white text-sm">
        <User size={16} />
        Tom Silver
      </div>
    ),
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
    label: (
      <div className="flex items-center gap-1 text-white text-sm">
        <User size={16} />
        Mariz Cabido
      </div>
    ),
    routes: ["/leads-manual", "/dashboard"],
    submenus: [
      { label: "Calls Log", href: "/calls-log" },
      { label: "Calls Log Beta", href: "/calls-log-beta" },
      { label: "Auto Mighty Call Tom", href: "/auto-call" },
      { label: "Leads Manual Update", href: "/leads-manual" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];
