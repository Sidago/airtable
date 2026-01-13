"use client";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Footer from "./Footer";

export default function Content() {
  // -------------------------
  // FORM STATE
  // -------------------------
  const [form, setForm] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
  });

  // -------------------------
  // UPDATE FIELD HANDLER
  // -------------------------
  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------
  // CLEAR FORM
  // -------------------------
  const clearForm = () => {
    setForm({
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      company: "",
    });
  };

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  const onSubmit = () => {
    console.log("Form Submitted:", form);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* MAIN CONTENT - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Create Additional Contacts</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pb-24">
            <Input
              label={
                <span>
                  Name <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.name}
              onChange={(v) => updateField("name", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Input
              label={
                <span>
                  First Name <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.firstName}
              onChange={(v) => updateField("firstName", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Input
              label={
                <span>
                  Last Name <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.lastName}
              onChange={(v) => updateField("lastName", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Input
              label={
                <span>
                  Email <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.email}
              onChange={(v) => updateField("email", v)}
              iconClassName="text-gray-500"
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Select
              label="Role"
              value={form.role}
              onChange={(v) => updateField("role", v as string)}
              options={[
                { label: "Manager", value: "manager" },
                { label: "Marketer", value: "marketer" },
              ]}
            />

            <Select
              label="Company"
              value={form.company}
              onChange={(v) => updateField("company", v as string)}
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
