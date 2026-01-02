"use client";
import React from "react";
import { RotateCcw, UserLock } from "lucide-react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import DateInput from "@/components/shared/DateInput";
import Checkbox from "@/components/shared/Checkbox";

export default function Content() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* main content */}
      <div className="flex-1">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Leads Manual Update</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <Select
              label={
                <span className="flex flex-col">
                  <span>
                    Lead <span className="text-red-400">*</span>
                  </span>
                  <span className="font-normal mb-1">
                    Choose the lead to update
                  </span>
                </span>
              }
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              rules={[
                {
                  type: "custom",
                  validator: (v) => v !== "inactive",
                  message: "Inactive not allowed",
                },
              ]}
            />
            <Input
              label={
                <span className="flex flex-col">
                  <span>
                    Result Update <span className="text-red-400">*</span>
                  </span>
                  <span className="font-normal mb-1">Log the result</span>
                </span>
              }
              type="text"
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />
            <DateInput
              label={
                <span className="flex flex-col">
                  <span>To be called on</span>
                  <span className="font-normal mb-1">
                    If you have set up a call with the client , place it here
                  </span>
                </span>
              }
            />
            <Select
              label={
                <span className="flex flex-col mt-0.5">
                  <span>To be called on</span>
                  <span className="font-normal mb-2.5 invisible">
                    placeholder
                  </span>
                </span>
              }
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
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
              label="Campaign Type"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              rules={[
                {
                  type: "custom",
                  validator: (v) => v !== "inactive",
                  message: "Inactive not allowed",
                },
              ]}
            />
            <Checkbox label="To be Logged" labelPosition="bottom" />
          </div>
          <div className="grid grid-cols-1 gap-4 items-stretch mt-5">
            <Input
              label="Notes"
              as="textarea"
              rows={5}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
