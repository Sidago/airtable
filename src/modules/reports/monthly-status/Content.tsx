"use client";

import Divider from "@/components/shared/Divider";
import StatCard from "@/components/shared/StatCard";
import Header from "@/modules/auxiliary/components/Header";
import React from "react";
import Chart from "./Chart";

export default function Content() {
  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Reports", active: false },
          { label: "Monthly Status & Points", active: true },
        ]}
      />
      {/* Main content */}
      <div className="w-full p-10">
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-5 mb-10">
            <div className="text-xl font-medium">
              <p>Current Month Leader</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <StatCard label="BRYAN TAYLOR" count={10} />
            </div>
          </div>

          <div className="flex-1 space-y-5 mb-10">
            <div className="text-xl font-medium">
              <p>Last Month Leader</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <StatCard label="BRYAN TAYLOR" count={10} />
            </div>
          </div>
        </div>
        <Divider />
        <Chart />
        <Divider />
        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Tom Silver</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <StatCard label="Monthly Calls" count={10} />
            <StatCard label="Monthly New Hot Leads" count={5} />
            <StatCard label="Monthly Lost Hot Leads" count={8} />
            <StatCard label="Monthly Contract Closed" count={8} />
            <StatCard label="Monthly Points" count={8} />
            <StatCard label="Last Month Points" count={8} />
          </div>
        </div>
        <Divider />
        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Mariz Cabido</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <StatCard label="Monthly Calls" count={10} />
            <StatCard label="Monthly New Hot Leads" count={5} />
            <StatCard label="Monthly Lost Hot Leads" count={8} />
            <StatCard label="Monthly Contract Closed" count={8} />
            <StatCard label="Monthly Points" count={8} />
            <StatCard label="Last Month Points" count={8} />
          </div>
        </div>
        <Divider />
        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Chris Moore</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <StatCard label="Monthly Calls" count={10} />
            <StatCard label="Monthly New Hot Leads" count={5} />
            <StatCard label="Monthly Lost Hot Leads" count={8} />
            <StatCard label="Monthly Contract Closed" count={8} />
            <StatCard label="Monthly Points" count={8} />
            <StatCard label="Last Month Points" count={8} />
          </div>
        </div>
        <Divider />
        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Bryan Miller</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <StatCard label="Monthly Calls" count={10} />
            <StatCard label="Monthly New Hot Leads" count={5} />
            <StatCard label="Monthly Lost Hot Leads" count={8} />
            <StatCard label="Monthly Contract Closed" count={8} />
            <StatCard label="Monthly Points" count={8} />
            <StatCard label="Last Month Points" count={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
