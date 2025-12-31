import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import Item from "./Item";
import { MenuItem } from "@/types/menu";
import useActiveRoute from "@/hooks/useActiveRoute";

export default function Menu({ label, routes, submenus = [] }: MenuItem) {
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
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-1 mb-2 cursor-pointer"
      >
        <div className="flex-1 text-left">
          {typeof label === "string" ? (
            <span className="text-sm text-white font-medium">{label}</span>
          ) : (
            label
          )}
        </div>

        <ChevronRight
          size={16}
          className={clsx(
            "text-white/80 transition-transform duration-200 shrink-0",
            open && "rotate-90"
          )}
        />
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
