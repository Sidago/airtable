import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import Item from "./Item";
import { MenuItem } from "@/types/menu";
import useActiveRoute from "@/hooks/useActiveRoute";

export default function Menu({
  collapsed,
  toggleCollapsed,
  icon,
  label,
  routes,
  submenus = [],
}: MenuItem) {
  const { isRouteExist } = useActiveRoute();
  const active = isRouteExist(routes);

  // ✅ Use active only as the initial state
  const [open, setOpen] = useState(active);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {/* Icon + Label */}
        <div className="flex items-center gap-2 text-white">
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

        {/* Arrow (hide when collapsed) */}
        {!collapsed && (
          <ChevronRight
            size={16}
            className={clsx(
              "text-white/80 transition-transform duration-200",
              open && "rotate-90"
            )}
          />
        )}
      </button>

      {/* Animated Content */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
