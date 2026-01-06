"use client";
import React from "react";
import { RotateCcw, UserLock } from "lucide-react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";

export default function Content() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* main content */}
      <div className="flex-1">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Add a New Company</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <Input
              label={
                <span>
                  Company Symbol <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />
            <Input
              label={
                <span>
                  Company Name <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />
            <Select
              label="Timezone"
              options={[
                { label: "1-EST", value: "1est" },
                { label: "2-EST", value: "2est" },
              ]}
              rules={[
                {
                  type: "custom",
                  validator: (v) => v !== "inactive",
                  message: "Inactive not allowed",
                },
              ]}
            />
            <Select
              label="Country"
              options={[
                { label: "USA", value: "usa" },
                { label: "Canada", value: "canada" },
              ]}
              rules={[
                {
                  type: "custom",
                  validator: (v) => v !== "inactive",
                  message: "Inactive not allowed",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="bg-white border-t border-gray-200 mt-auto">
        <div className="w-full flex justify-between items-center px-5 py-5 md:px-20">
          <div className="flex items-center gap-1">
            <UserLock size={16} className="text-red-400" />
            <span className="text-xs font-normal">
              You don’t have permission to add new records.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-blue-400">
              <RotateCcw size={16} />
              <span className="text-xs font-normal">Clear form</span>
            </button>

            <button className="bg-gray-400 px-2 py-1 rounded text-xs text-white font-semibold">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
