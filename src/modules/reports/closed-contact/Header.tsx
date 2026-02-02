"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Dropdown from "@/components/shared/Dropdown";
import { ArrowDownUp, Copy, Ellipsis, Funnel, Printer, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Menu as HeadlessMenu, MenuButton as HeadlessMenuButton, MenuItems as HeadlessMenuItems, MenuItem as HeadlessMenuItem, Portal } from "@headlessui/react";

interface HeaderProps {
  breadcrumbs: { label: string; active?: boolean }[];
  groupBy: string | null;
  onGroupByChange: (value: string | null) => void;
  options: { label: string; value: string | null }[];
}

export default function Header({ breadcrumbs, groupBy, onGroupByChange, options }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  const activeGroupLabel = options.find((o) => o.value === groupBy)?.label || "Group";

  return (
    <div className="sticky top-4 md:top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="w-full md:w-auto">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center md:w-auto md:gap-6">
          {/* Group */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              label={activeGroupLabel}
              buttonClassName="text-gray-950 font-normal w-full"
              items={options.map((o) => ({ label: o.label, value: o.value ?? "" }))}
              onChange={(val) => onGroupByChange(typeof val === "string" ? val : null)}
            />

            {groupBy && (
              <button
                onClick={() => onGroupByChange(null)}
                className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                title="Clear grouping"
              >
                <X size={14} className="text-gray-500" />
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              label="Filter"
              buttonClassName="text-gray-950 font-normal w-full"
              items={[
                { label: "All", value: "all" },
                { label: "Large Companies", value: "large-companies" },
                { label: "Exclude Canada", value: "exclude-canada" },
              ]}
            />
            <Funnel size={16} />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              label="Sort"
              buttonClassName="text-gray-950 font-normal w-full"
              items={[
                { label: "All", value: "all" },
                { label: "Large Companies", value: "large-companies" },
                { label: "Exclude Canada", value: "exclude-canada" },
              ]}
            />
            <ArrowDownUp size={16} />
          </div>

          {/* Search */}
          <div className="w-full md:w-auto">
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 w-full md:hidden">
              <Search size={16} className="text-gray-400 mr-2" />
              <input type="text" placeholder="Search..." className="flex-1 outline-none text-sm bg-transparent h-6" />
            </div>

            <div className="hidden md:flex items-center">
              {showSearch ? (
                <div className="flex items-center border border-gray-200 rounded px-2 py-1 w-64">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input type="text" placeholder="Search..." className="flex-1 outline-none text-sm bg-transparent" />
                  <button onClick={() => setShowSearch(false)} className="ml-2 flex items-center justify-center">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm">
                  <Search size={16} />
                </button>
              )}
            </div>
          </div>

          {/* More menu */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenuButton className="outline-0 ring-0 cursor-pointer">
              <Ellipsis size={16} />
            </HeadlessMenuButton>

            <Portal>
              <HeadlessMenuItems className="outline-0 ring-0 absolute z-50 w-65 rounded-md bg-white shadow-lg right-0 top-10">
                <div className="p-4 flex flex-col gap-1">
                  <HeadlessMenuItem as="button" className="flex items-center gap-2 px-3 py-2 outline-0 ring-0 hover:bg-gray-100">
                    <Printer size={14} /> Print this page
                  </HeadlessMenuItem>
                  <HeadlessMenuItem as="button" className="flex flex-col px-3 py-2 outline-0 ring-0 hover:bg-gray-100">
                    <span className="flex items-center gap-2"><Copy size={14} /> Print all leads</span>
                    <span className="text-xs text-gray-500 ml-6">Print lead details for all leads</span>
                  </HeadlessMenuItem>
                </div>
              </HeadlessMenuItems>
            </Portal>
          </HeadlessMenu>
        </div>
      </div>
    </div>
  );
}
