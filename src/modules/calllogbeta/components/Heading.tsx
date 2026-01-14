"use client";
import Dropdown from "@/components/shared/Dropdown";
import { Funnel } from "lucide-react";
import React from "react";

export default function Heading() {
  return (
    <div className="sticky top-4 md:top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 md:px-10">
        {/* Left section */}
        <div className="w-full md:w-auto">
          <Dropdown
            label="NASDAQ : FRPT - Mr. Christopher Kraus"
            buttonClassName="text-gray-950 font-normal"
            menuClassName="w-full md:w-80"
            search
            items={[
              { label: "NASDAQ : NAUT - Melissa Epperly", value: "all" },
              { label: "PDIV - Stephen Lumb", value: "record" },
            ]}
          />
        </div>

        {/* Right section */}
        <div className="w-full md:w-auto relative">
          {/* flex container to hold dropdown + funnel */}
          <div className="w-full">
            <Dropdown
              label="All"
              buttonClassName="text-gray-950 font-normal w-full pr-10" // space for funnel
              menuClassName="w-full md:w-60"
              items={[
                { label: "All", value: "all" },
                { label: "Large Companies", value: "large-companies" },
                { label: "Exclude Canada", value: "exclude-canada" },
              ]}
            />
            {/* Funnel Icon absolute on the right */}
            <Funnel
              size={16}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
