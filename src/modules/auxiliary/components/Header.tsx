import Breadcrumb from "@/components/shared/Breadcrumb";
import Dropdown from "@/components/shared/Dropdown";
import { ArrowDownUp, Funnel, Search, X } from "lucide-react";
import React, { useState } from "react";

interface HeaderProps {
  breadcrumbs: { label: string; active?: boolean }[];
}

export default function Header({ breadcrumbs = [] }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false); // for md+

  return (
    <div className="sticky top-4 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">

        {/* Breadcrumb */}
        <div className="w-full md:w-auto">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Controls wrapper */}
        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center md:w-auto md:gap-6">

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
            <Funnel size={16} className="shrink-0" />
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
            <ArrowDownUp size={16} className="shrink-0" />
          </div>

          {/* Search */}
          <div className="w-full md:w-auto">

            {/* 🟢 Mobile: Always show full input */}
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 w-full md:hidden">
              <Search size={16} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm bg-transparent h-6"
              />
            </div>

            {/* 🟣 Desktop: Toggle button + conditional input */}
            <div className="hidden md:flex items-center">
              {showSearch ? (
                <div className="flex items-center border border-gray-200 rounded px-2 py-1 w-64">
                  <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="ml-2 flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-1 px-3 py-1.5 ring-0 text-sm cursor-pointer"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
