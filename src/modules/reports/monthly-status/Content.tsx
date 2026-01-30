"use client";

import Divider from "@/components/shared/Divider";
import StatCard from "@/components/shared/StatCard";
import React from "react";
import Chart from "./Chart";
import Breadcrumb from "@/components/shared/Breadcrumb";

export default function Content() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-4 md:top-0 z-30 bg-white border-b border-gray-200 p-4">
        <Breadcrumb
          items={[
            { label: "Reports", active: false },
            { label: "Monthly Status & Points", active: true },
          ]}
        />
      </div>

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-4 items-start mb-10">
          {/* Current Month Leader */}
          <div className="w-full md:flex-1 space-y-5">
            <div className="text-xl font-medium">
              <p>Current Month Leader</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-stretch">
              <StatCard label="BRYAN TAYLOR" count={10} />
            </div>
          </div>

          {/* Last Month Leader */}
          <div className="w-full md:flex-1 space-y-5">
            <div className="text-xl font-medium">
              <p>Last Month Leader</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-stretch">
              <StatCard label="BRYAN TAYLOR" count={10} />
            </div>
          </div>
        </div>

        <Divider />

        <Chart />

        <Divider />

        {["Tom Silver", "Mariz Cabido", "Chris Moore", "Bryan Miller"].map(
          (name) => (
            <div key={name} className="w-full space-y-5 mt-10 mb-10">
              <div className="text-xl font-medium">
                <p>{name}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <StatCard label="Monthly Calls" count={10} />
                <StatCard label="Monthly New Hot Leads" count={5} />
                <StatCard label="Monthly Lost Hot Leads" count={8} />
                <StatCard label="Monthly Contract Closed" count={8} />
                <StatCard label="Monthly Points" count={8} />
                <StatCard label="Last Month Points" count={8} />
              </div>
              <Divider />
            </div>
          )
        )}
      </div>
    </div>
  );
}
