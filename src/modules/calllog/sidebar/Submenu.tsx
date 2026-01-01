"use client";
import Badge from "@/components/shared/Badge";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SubmenuItem from "./SubmenuItem";
import { SubmenuProps } from "@/types/menu.calllog";

export default function Submenu({ label, badge, children = [] }: SubmenuProps) {
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
    <div ref={menuRef}>
      <div className="relative w-full border-b border-gray-200 last:border-b-0 py-1 bg-gray-100">
        {/* Vertical connector */}
        <span className="absolute left-6 top-0 h-1/2 w-px bg-gray-300" />
        {/* Horizontal connector */}
        <span className="absolute left-6 top-1/2 h-px w-4 bg-gray-300" />

        {/* Row content */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-full py-1 ps-9 text-xs font-normal rounded-lg cursor-pointer transition-colors flex items-center gap-2"
        >
          {/* Left side: icon */}
          <div className="shrink-0">
            <ChevronRight
              size={14}
              className={clsx(
                "text-gray-400 transition-transform duration-200 ease-in-out",
                open && "rotate-90"
              )}
            />
          </div>

          {/* Right side: text + badge (takes remaining width) */}
          <div className="flex-1 flex items-center gap-2">
            <span>{label}</span>
            {badge &&
            typeof badge === "object" &&
            "label" in badge &&
            "bg" in badge &&
            "color" in badge ? (
              <Badge>
                <span
                  className={`bg-amber-200 text-white ${badge.bg} ${badge.color}`}
                >
                  {label}
                </span>
              </Badge>
            ) : (
              badge
            )}
          </div>
        </button>
      </div>
      {/* Animated Child items */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "opacity-100 max-h-2499" : "max-h-0 opacity-0"
        }`}
      >
        {children.map((submenu, idx) => (
          <SubmenuItem key={idx} {...submenu} />
        ))}
      </div>
    </div>
  );
}
