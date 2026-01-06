import Breadcrumb from "@/components/shared/Breadcrumb";
import Dropdown from "@/components/shared/Dropdown";
import { ArrowDownUp, Funnel, Search, X } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

interface HeaderProps {
  breadcrumbs: { label: string; active?: boolean }[];
}

export default function Header({ breadcrumbs=[] }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center gap-4 px-10">
        <Breadcrumb
          items={breadcrumbs}
        />

        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Dropdown
              label="Filter"
              buttonClassName="text-gray-950 font-normal!"
              items={[
                { label: "All", value: "all" },
                { label: "Large Companies", value: "large-companies" },
                { label: "Exclude Canada", value: "exclude-canada" },
              ]}
            />
            <Funnel size={16} />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <Dropdown
              label="Sort"
              buttonClassName="text-gray-950 font-normal!"
              items={[
                { label: "All", value: "all" },
                { label: "Large Companies", value: "large-companies" },
                { label: "Exclude Canada", value: "exclude-canada" },
              ]}
            />
            <ArrowDownUp size={16} />
          </div>

          {/* Animated Search */}
          <div className="relative">
            <div
              className={clsx(
                "flex items-center border border-gray-100 rounded px-2 py-0.5 transition-all duration-300 ease-in-out overflow-hidden",
                open ? "w-64 opacity-100" : "w-6 opacity-0"
              )}
            >
              {/* Left: Search Icon */}
              <Search size={16} className="text-gray-400 mr-2 shrink-0" />

              {/* Input */}
              <input
                className={clsx(
                  "flex-1 outline-none text-sm bg-transparent transition-opacity duration-300",
                  open ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                type="text"
                placeholder="Search..."
              />

              {/* Right: Close Button */}
              {open && (
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 cursor-pointer flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Collapsed button when closed */}
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="cursor-pointer w-6 h-6 flex items-center justify-center absolute top-0 left-0"
              >
                <Search size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
