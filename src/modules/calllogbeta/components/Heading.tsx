"use client";
import Dropdown from "@/components/shared/Dropdown";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
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
        <div className="w-full md:w-auto relative gap-2 flex">
          <Link
            href="/crm/sidago-crm/agent1/calls-log-beta"
            className="inline-flex items-center gap-1 bg-gray-200 p-2 rounded text-sm font-normal"
          >
            <span>Large Companies</span>
            <ChevronRight size={14} className="opacity-70" />
          </Link>
          <Link
            href="/crm/sidago-crm/agent1/calls-log-beta"
            className="inline-flex items-center gap-1 bg-gray-200 p-2 rounded text-sm font-normal"
          >
            <span>Exclude Canada</span>
            <ChevronRight size={14} className="opacity-70" />
          </Link>
        </div>
      </div>
    </div>
  );
}
