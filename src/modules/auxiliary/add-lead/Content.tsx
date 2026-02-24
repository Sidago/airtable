"use client";
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Footer from "./Footer";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { leadService } from "@/modules/lead/services/lead.service";
import { useCompany } from "@/modules/company/hooks/useCompany";
import { useContactType } from "@/modules/lead/hooks/useContactType";
interface LeadFormValues {
  full_name: string;
  role: string;
  company_id: string;
  phone: string;
  email: string;
  contact_type_id: string;
  others_contacts: string;
}
const DEFAULT_FORM: LeadFormValues = {
  full_name: "",
  role: "",
  company_id: "",
  phone: "",
  email: "",
  contact_type_id: "",
  others_contacts: "",
};
export default function Content() {
  const token = useAuthStore((s) => s.tokens?.access_token);
  const { companies } = useCompany();
  const { options: contactTypeOptions } = useContactType();
  const [form, setForm] = useState<LeadFormValues>(DEFAULT_FORM);
  const [loading, setLoading] = useState<boolean>(false);
  const updateField = <K extends keyof LeadFormValues>(
    name: K,
    value: LeadFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = (): void => {
    setForm(DEFAULT_FORM);
  };
  const onSubmit = async (): Promise<void> => {
    if (!token) return;
    if (
      !form.full_name ||
      !form.company_id ||
      !form.contact_type_id
    ) {
      console.warn("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await leadService.createLead(
        {
          ...form,
          company_id: Number(form.company_id),
          contact_type_id: Number(form.contact_type_id),
        },
        token,
      );
      console.log("Lead created successfully");
      clearForm();
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const companyOptions =
    companies?.map((company) => ({
      label: `${company.name} (${company.symbol ?? "-"})`,
      value: String(company.id),
    })) ?? [];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-5 py-8">
          <p className="text-xl mt-10 mb-10">Add New Lead</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pb-24">
            <Input
              label="Full Name *"
              type="text"
              value={form.full_name}
              onChange={(v: string) => updateField("full_name", v)}
            />
            <Input
              label="Role*"
              type="text"
              value={form.role}
              onChange={(v: string) => updateField("role", v)}
            />
            <Select
              label="Company *"
              value={form.company_id}
              onChange={(v) => updateField("company_id", String(v))}
              options={companyOptions}
            />
            <Input
              label="Phone"
              type="text"
              value={form.phone}
              onChange={(v: string) => updateField("phone", v)}
            />
            <Input
              label="Email"
              type="text"
              value={form.email}
              onChange={(v: string) => updateField("email", v)}
            />
            <Select
              label="Contact Type *"
              value={form.contact_type_id}
              onChange={(v) => updateField("contact_type_id", String(v))}
              options={contactTypeOptions}
            />
            <Input
              label="Other Contacts"
              type="text"
              value={form.others_contacts}
              onChange={(v: string) => updateField("others_contacts", v)}
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
