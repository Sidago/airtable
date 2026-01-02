"use client";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Badge from "@/components/shared/Badge";
import Submenu from "./Submenu";
import { MenuProps } from "@/types/menu.calllog";

export default function Menu({ label, badge, children = [] }: MenuProps) {
  const [open, setOpen] = useState(false);
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
    <div ref={menuRef} className="border-b border-gray-200">
      <button
        className="w-full px-4 py-2 bg-gray-100 cursor-pointer"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="flex items-center gap-2 text-xs">
          <ChevronRight
            size={16}
            className={clsx(
              "text-gray-400 transition-transform duration-200 ease-in-out",
              open && "rotate-90"
            )}
          />
          <div className="flex items-center gap-4">
            <p className="mr-4">{label}</p>
            {badge &&
            typeof badge === "object" &&
            "label" in badge &&
            "bg" in badge &&
            "color" in badge ? (
              <Badge
                standalone
                count={badge.label}
                color={badge.bg}
                textColor={badge.color}
              />
            ) : (
              badge
            )}
          </div>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "opacity-100 max-h-2499" : "max-h-0 opacity-0"
        }`}
      >
        {children.map((submenu, idx) => (
          <Submenu key={idx} {...submenu} />
        ))}
      </div>
    </div>
  );
}
