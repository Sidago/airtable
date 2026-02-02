"use client";
import Dropdown from "@/components/shared/Dropdown";
import React from "react";

export default function Heading() {
  return (
    <div className="sticky top-4 md:top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-4 px-4 md:px-10">
        {/* Left */}
        <Dropdown
          label="NASDAQ : FRPT - Mr. Christopher Kraus"
          buttonClassName="text-gray-950 font-normal"
          menuClassName="w-80"
          search
          items={[
            { label: "NASDAQ : NAUT - Melissa Epperly", value: "all" },
            { label: "PDIV - Stephen Lumb", value: "record" },
          ]}
        />

        {/* Right */}
        <div className="flex items-stretch gap-2">
          <div className="flex items-stretch border border-gray-200">
            <div className="px-3 text-xs font-medium border-r  border-gray-200 whitespace-nowrap bg-gray-50 flex items-center">
              Filter
            </div>

            <Dropdown
              label="is"
              buttonClassName="h-full text-gray-950 font-normal rounded-none border-r border-gray-200"
              menuClassName="w-56"
              search
              items={[
                { label: "is", value: "is" },
                { label: "is not", value: "is_not" },
              ]}
            />

            <Dropdown
              label="Select an option"
              buttonClassName="h-full text-gray-950 font-normal rounded-none"
              menuClassName="w-64"
              search
              items={[
                { label: "Exclude Canada", value: "active" },
                { label: "Large Companies", value: "inactive" },
              ]}
            />
          </div>

          <button className="cursor-pointer bg-gray-100 px-3 py-1.5 text-xs font-medium hover:bg-gray-200 h-full">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
