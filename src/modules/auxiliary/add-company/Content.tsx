"use client";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Footer from "./Footer";

export default function Content() {
  const [form, setForm] = useState({
    symbol: "",
    company: "",
    timezone: "",
    country: "",
  });

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm({
      symbol: "",
      company: "",
      timezone: "",
      country: "",
    });
  };

  const onSubmit = () => {
    console.log("Form Submitted:", form);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* MAIN CONTENT - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Add a New Company</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pb-24">
            <Input
              label={
                <span>
                  Company Symbol <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.symbol}
              onChange={(v) => updateField("symbol", v)}
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
              value={form.company}
              onChange={(v) => updateField("company", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Select
              label="Timezone"
              value={form.timezone}
              onChange={(v) => updateField("timezone", v as string)}
              options={[
                { label: "1-EST", value: "1est" },
                { label: "2-EST", value: "2est" },
              ]}
            />

            <Select
              label="Country"
              value={form.country}
              onChange={(v) => updateField("country", v as string)}
              options={[
                { label: "USA", value: "usa" },
                { label: "Canada", value: "canada" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* FIXED FOOTER */}
      <Footer btnLabel="Create" clearForm={clearForm} onClick={onSubmit} />
    </div>
  );
}
