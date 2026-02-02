/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import DateInput from "@/components/shared/DateInput";
import Checkbox from "@/components/shared/Checkbox";
import Footer from "./Footer";

interface FormValues {
  lead: string;
  resultUpdate: string;
  toBeCalledOnDate: Date | null;
  toBeCalledOnSelect: string;
  campaignType: string;
  toBeLogged: boolean;
  notes: string;
  agent: string[];
}

const DEFAULT_FORM: FormValues = {
  lead: "",
  resultUpdate: "",
  toBeCalledOnDate: null,
  toBeCalledOnSelect: "",
  campaignType: "",
  toBeLogged: false,
  notes: "",
  agent: [],
};

export default function Content() {
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM);

  const handleInputChange = (name: keyof FormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormValues(DEFAULT_FORM);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* --- SCROLLABLE MAIN CONTENT --- */}
      <main
        className="flex-1 min-h-0 overflow-y-auto px-5 py-8 pb-36 md:pb-10"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-full max-w-4xl mx-auto">
          <p className="text-xl mt-10 mb-10 font-semibold text-gray-800">
            Leads Manual Update
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Select
              label={
                <span className="flex flex-col text-sm font-semibold">
                  <span>
                    Lead <span className="text-red-400">*</span>
                  </span>
                  <span className="font-normal text-gray-500 mb-1">
                    Choose the lead to update
                  </span>
                </span>
              }
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={formValues.lead}
              onChange={(v: string | string[]) =>
                handleInputChange("lead", Array.isArray(v) ? v[0] : v)
              }
              rules={[
                {
                  type: "custom",
                  validator: (v) =>
                    (Array.isArray(v) ? v[0] : v) !== "inactive",
                  message: "Inactive not allowed",
                },
              ]}
            />

            <Input
              label={
                <span className="flex flex-col text-sm font-semibold">
                  <span>
                    Result Update <span className="text-red-400">*</span>
                  </span>
                  <span className="font-normal text-gray-500 mb-1">
                    Log the result
                  </span>
                </span>
              }
              type="text"
              value={formValues.resultUpdate}
              onChange={(v: string) => handleInputChange("resultUpdate", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <DateInput
              label={
                <span className="flex flex-col text-sm font-semibold">
                  <span>To be called on</span>
                  <span className="font-normal text-gray-500 mb-1">
                    If you have set up a call with the client
                  </span>
                </span>
              }
              value={formValues.toBeCalledOnDate}
              onChange={(date) => handleInputChange("toBeCalledOnDate", date)}
            />

            <Select
              label={
                <span className="flex flex-col mt-0.5 text-sm font-semibold">
                  <span>To be called on</span>
                  <span className="font-normal mb-2.5 invisible">
                    placeholder
                  </span>
                </span>
              }
              options={[
                { label: "Morning", value: "morning" },
                { label: "Afternoon", value: "afternoon" },
              ]}
              value={formValues.toBeCalledOnSelect}
              onChange={(v: string | string[]) =>
                handleInputChange(
                  "toBeCalledOnSelect",
                  Array.isArray(v) ? v[0] : v,
                )
              }
            />

            <Select
              label={
                <span className="text-sm font-semibold">Campaign Type</span>
              }
              options={[
                { label: "Email", value: "email" },
                { label: "Call", value: "call" },
              ]}
              value={formValues.campaignType}
              onChange={(v: string | string[]) =>
                handleInputChange("campaignType", Array.isArray(v) ? v[0] : v)
              }
            />

            <Select
              label={<span className="text-sm font-semibold">Agent</span>}
              multiple={true} // <-- enable multiple selection
              options={[
                { label: "Tom Silver", value: "Tom Silver" },
                { label: "Jane Doe", value: "Jane Doe" },
                { label: "John Smith", value: "John Smith" },
                { label: "Alice Johnson", value: "Alice Johnson" },
                { label: "Bob Williams", value: "Bob Williams" },
              ]}
              value={
                formValues.agent
                  ? Array.isArray(formValues.agent)
                    ? formValues.agent
                    : [formValues.agent]
                  : []
              }
              onChange={(v: string | string[]) =>
                handleInputChange("agent", Array.isArray(v) ? v : [v])
              }
            />

            <div className="flex items-end pb-2">
              <Checkbox
                label="To be Logged"
                labelPosition="bottom"
                value={formValues.toBeLogged}
                onChange={(checked) => handleInputChange("toBeLogged", checked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 items-stretch mt-8">
            <Input
              label={<span className="text-sm font-semibold">Notes</span>}
              as="textarea"
              rows={5}
              value={formValues.notes}
              onChange={(v: string) => handleInputChange("notes", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />
          </div>
        </div>
      </main>
      <Footer
        btnLabel="Update"
        clearForm={handleClearForm}
        onClick={() => console.log("clicked")}
      />
    </div>
  );
}
