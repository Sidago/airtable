"use client";

import Divider from "@/components/shared/Divider";
import StatCard from "@/components/shared/StatCard";
import Header from "@/modules/auxiliary/components/Header";
import React from "react";

export default function Content() {
  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Reports", active: false },
          { label: "Leaderborad", active: true },
        ]}
      />
      {/* Main content */}
      <div className="w-full p-10">
        <div className="w-full space-y-5 mb-10">
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
