"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import Item from "./Item";
import { MenuItem } from "@/types/menu";
import useMenuTree from "@/modules/navigation/hooks/useMenuTree";

export default function Menu({
  collapsed,
  toggleCollapsed,
  icon,
  label,
  routes,
  submenus = [],
}: MenuItem) {
  const { isParentActive } = useMenuTree();

  // Determine if this parent is active based on URL
  const parentActive = isParentActive(routes);

  // Allow toggling only when not collapsed
  const [open, setOpen] = useState(parentActive);

  const menuRef = useRef<HTMLDivElement>(null);

  // Outside click → close submenu only if:
  // 1. parent is NOT active
  // 2. menu is currently open
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !parentActive &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [parentActive]);

  // Derived visible state
  const computedOpen = collapsed ? false : open;

  return (
    <div ref={menuRef} className="w-full">
      {/* Trigger */}
      <button
        onClick={() => !collapsed && setOpen((p) => !p)}
        className={clsx(
          "w-full flex items-center px-2 mb-2 cursor-pointer",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className="flex items-center gap-2 text-black md:text-white">
          {/* Icon */}
          {icon && (
            <span
              onClick={() => {
                if (collapsed && toggleCollapsed) toggleCollapsed();
              }}
            >
              {icon}
            </span>
          )}

          {!collapsed && <span className="text-sm font-medium">{label}</span>}
        </div>

        {/* Arrow */}
        {!collapsed && (
          <ChevronRight
            size={16}
            className={clsx(
              "text-black md:text-white/80 transition-transform duration-200",
              computedOpen && "rotate-90"
            )}
          />
        )}
      </button>

      {/* Animated Content */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          computedOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {submenus.map((item, idx) => (
            <Item key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
