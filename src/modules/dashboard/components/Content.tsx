"use client";
import React from "react";
import Header from "./Header";
import StatCard from "@/components/shared/StatCard";
import Divider from "@/components/shared/Divider";
import Select from "@/components/shared/Select";
import Checkbox from "@/components/shared/Checkbox";
import Badge from "@/components/shared/Badge";

export default function Content() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed header */}
      <Header />

      {/* Main content */}
      <div className="w-full p-10">
        <div className="w-full space-y-5 mb-10">
          <div className="text-xl font-medium">
            <p>{`Today's`} call report</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Number of Calls" count={10} />
            <StatCard label="No Answer" count={10} />
            <StatCard label="Left Message" count={10} />
            <StatCard label="Interested" count={10} />
            <StatCard label="Call Lead Back" count={10} />
            <StatCard label="Bad Number" count={10} />
            <StatCard label="Not Interested" count={10} />
            <StatCard label="DNC" count={10} />
          </div>
        </div>
        <Divider />
        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Call Details</p>
          </div>
          <div>
            {/* sort and filters */}
            <div className="flex items-center gap-4">
              <Select
                wrapperClassName="w-40"
                placeholder="Lead Type"
                searchable
                options={[
                  {
                    label: (
                      <div className="flex items-center gap-2">
                        <Checkbox wrapperClassName="mt-1" />
                        <Badge>
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                            Hot
                          </span>
                        </Badge>
                      </div>
                    ),
                    value: "hot",
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2">
                        <Checkbox wrapperClassName="mt-1" />
                        <Badge>
                          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                            General
                          </span>
                        </Badge>
                      </div>
                    ),
                    value: "general",
                  },
                ]}
              />
              <Select
                wrapperClassName="w-40"
                placeholder="Call Result"
                searchable
                options={[
                  {
                    label: (
                      <div className="flex items-center gap-2">
                        <Checkbox wrapperClassName="mt-1" />
                        <Badge>
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                            Hot
                          </span>
                        </Badge>
                      </div>
                    ),
                    value: "hot",
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2">
                        <Checkbox wrapperClassName="mt-1" />
                        <Badge>
                          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                            General
                          </span>
                        </Badge>
                      </div>
                    ),
                    value: "general",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
