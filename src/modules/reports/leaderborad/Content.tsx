"use client";

import Breadcrumb from "@/components/shared/Breadcrumb";
import Divider from "@/components/shared/Divider";
import StatCard from "@/components/shared/StatCard";
import React from "react";

export default function Content() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Fixed header */}
      <div className="sticky top-4 md:top-0 z-30 bg-white border-b border-gray-200 p-4">
        <Breadcrumb
          items={[
            { label: "Reports", active: false },
            { label: "Leaderboard", active: true },
          ]}
        />
      </div>

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full space-y-5 mt-4 mb-10">
          <div className="text-xl font-medium">
            <p>{`Today's`} Winner</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard
              label={
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-gray-500">MARIZ CABIDO</div>
                  <div className="text-xs text-gray-500">Hot Leads Today</div>
                </div>
              }
              count={10}
            />
            <StatCard
              label={
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-gray-500">CHRIS MOORE</div>
                  <div className="text-xs text-gray-500">Hot Leads Today</div>
                </div>
              }
              count={5}
            />
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Tom Silver</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Calls Today" count={10} />
            <StatCard label="Hot Leads Today" count={5} />
            <StatCard label="Current Hot Leads" count={8} />
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Mariz Cabido</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Calls Today" count={10} />
            <StatCard label="Hot Leads Today" count={5} />
            <StatCard label="Current Hot Leads" count={8} />
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Chris Moore</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Calls Today" count={10} />
            <StatCard label="Hot Leads Today" count={5} />
            <StatCard label="Current Hot Leads" count={8} />
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Bryan Miller</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Calls Today" count={10} />
            <StatCard label="Hot Leads Today" count={5} />
            <StatCard label="Current Hot Leads" count={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
