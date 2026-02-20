"use client";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Footer from "./Footer";
import { useTimezone } from "@/modules/company/hooks/useTimezone";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { CompanyService } from "@/modules/company/services/company.service";

interface CompanyFormValues {
  symbol: string;
  name: string;
  timezone_id: string; // keep as string for select, convert on submit
  country: string;
  state:string;
  city: string;
}

const DEFAULT_FORM: CompanyFormValues = {
  symbol: "",
  name: "",
  timezone_id: "",
  country: "",
  state:"",
  city: "",
};

export default function Content() {
  const token = useAuthStore((s) => s.tokens?.access_token);
  const { options } = useTimezone();

  const [form, setForm] = useState<CompanyFormValues>(DEFAULT_FORM);
  const [loading, setLoading] = useState<boolean>(false);

  const updateField = <K extends keyof CompanyFormValues>(
    name: K,
    value: CompanyFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = (): void => {
    setForm(DEFAULT_FORM);
  };

  const onSubmit = async (): Promise<void> => {
    if (!token) {
      console.warn("No authentication token found");
      return;
    }
    if (!form.name || !form.country || !form.state || !form.city || !form.timezone_id) {
      console.warn("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await CompanyService.createCompany(form, token);
      console.log("Company created successfully");
      clearForm();
    } catch (error) {
      console.error("Error creating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Add a New Company</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pb-24">
            <Input
              label={
                <span>
                  Company Name <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.name}
              onChange={(v: string) => updateField("name", v)}
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Input
              label="Company Symbol (Optional)"
              type="text"
              value={form.symbol}
              onChange={(v: string) => updateField("symbol", v)}
            />

            <Input
              label={
                <span>
                  Country <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.country}
              onChange={(v: string) => updateField("country", v)}
              rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
            />

            <Input
              label={
                <span>
                  State <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.state}
              onChange={(v: string) => updateField("state", v)}
              rules={[{ type: "required" }, { type: "minLength", value: 2 }]}
            />

            <Input
              label={
                <span>
                  City <span className="text-red-400">*</span>
                </span>
              }
              type="text"
              value={form.city}
              onChange={(v: string) => updateField("city", v)}
              rules={[{ type: "required" }, { type: "minLength", value: 2 }]}
            />

            <Select
              label={
                <span>
                  Timezone <span className="text-red-400">*</span>
                </span>
              }
              value={form.timezone_id}
              onChange={(v) => updateField("timezone_id", String(v))}
              options={options}
            />
          </div>
        </div>
      </div>

      <Footer
        btnLabel="Create"
        loading={loading}
        clearForm={clearForm}
        onClick={onSubmit}
      />
    </div>
  );
}
