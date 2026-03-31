import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Lead } from "../hooks/useLeads";
import Timezone from "@/components/ui/timezone/Timezone";
import CompanySymbol from "@/components/ui/company-symbol/CompanySymbol";
import ContactType from "@/components/ui/contact-type/ContactType";
import Divider from "@/components/shared/Divider";
import Footer from "./Footer";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { useCompany } from "@/modules/company/hooks/useCompany";
import { useContactType } from "@/modules/lead/hooks/useContactType";
import { leadService } from "@/modules/lead/services/lead.service";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";

const Drawer = dynamic(() => import("@/components/shared/Drawer"), {
  ssr: false,
});

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  lead: Lead | null;
}

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

export default function LeadDrawer({
  isOpen,
  onClose,
  isScrolled,
  onScroll,
  lead,
}: LeadDrawerProps) {
  const token = useAuthStore((s) => s.tokens?.access_token);
  const { companies } = useCompany();
  const { options: contactTypeOptions } = useContactType();
  const [form, setForm] = useState<LeadFormValues>(DEFAULT_FORM);
  const updateField = <K extends keyof LeadFormValues>(
    name: K,
    value: LeadFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const clearForm = (): void => {
    setForm(DEFAULT_FORM);
  };
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (): Promise<void> => {
    if (!token || !lead) return;
    if (!form.full_name || !form.company_id || !form.contact_type_id) {
      console.warn("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await leadService.updateLead(
        lead?.id,
        {
          ...form,
          company_id: Number(form.company_id),
          contact_type_id: Number(form.contact_type_id),
        },
        token,
      );
      console.log("Lead updated successfully");
      clearForm();
    } catch (error) {
      console.error("Error updating lead:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const companyOptions =
    companies?.map((company) => ({
      label: `${company.name} (${company.symbol ?? "-"})`,
      value: String(company.id),
    })) ?? [];

  useEffect(() => {
    if (lead && editMode) {
      // find matching contact type option
      const matchedContactType = contactTypeOptions.find(
        (opt) =>
          opt.label?.toLowerCase().trim() ===
          (lead.contact_type || "").toLowerCase().trim(),
      );

      setForm({
        full_name: lead.full_name || "",
        role: lead.role || "",
        company_id: String(lead.company?.id || ""),
        phone: lead.phone || "",
        email: lead.email || "",
        contact_type_id: matchedContactType?.value || "", // ✅ FIX HERE
        others_contacts: lead.others_contacts || "",
      });
    }
  }, [lead, editMode, contactTypeOptions]);

  return (
    <Drawer width="w-2xl" height="h-full" isOpen={isOpen} onClose={onClose}>
      <Header
        scrolled={isScrolled}
        label={lead?.lead_id || "Lead Details"}
        onClose={onClose}
      />
      <div
        className="flex-1 overflow-y-auto scrollbar-custom"
        onScroll={onScroll}
      >
        <section className="p-10 space-y-6">
          {lead && (
            <div className="flex justify-between items-center">
              <p className="font-semibold">{lead?.lead_id}</p>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>
          )}

          <Divider thickness="h-px" />

          {!editMode ? (
            <ViewMode lead={lead} />
          ) : (
            <EditMode
              form={form}
              updateField={updateField}
              companyOptions={companyOptions}
              contactTypeOptions={contactTypeOptions}
            />
          )}
        </section>
      </div>
      {editMode && (
        <Footer
          btnLabel="Update"
          loading={loading}
          clearForm={clearForm}
          onClick={onSubmit}
        />
      )}
    </Drawer>
  );
}

const ViewMode = ({ lead }: { lead: Lead | null }) => {
  if (!lead) return null;

  return (
    <div className="grid grid-cols-[200px_1fr] gap-y-6 gap-x-10 text-sm">
      <Label label="Company" />

      <Value
        value={
          <div className="p-4 border border-gray-100 rounded grid grid-cols-2 gap-6">
            <Field label="Name" value={lead?.company?.name} />

            <Field
              label="Company Symbol"
              value={
                <CompanySymbol
                  label={lead?.company?.symbol}
                  index={lead?.company?.id}
                />
              }
            />

            <Field
              label="Timezone"
              value={<Timezone label={lead?.company?.timezone} />}
            />
          </div>
        }
      />

      <Label label="Full Name" />
      <Value value={lead.full_name} />

      <Label label="Role" />
      <Value value={lead.role} />

      <Label label="Phone" />
      <Value value={lead.phone} />

      <Label label="Email" />
      <Value value={lead.email} />

      <Label label="Contact Type" />
      <Value value={<ContactType label={lead.contact_type} />} />

      <Label label="Other Contacts" />
      <Value value={lead.others_contacts} />
    </div>
  );
};

interface EditModeProps {
  form: LeadFormValues;
  updateField: <K extends keyof LeadFormValues>(
    name: K,
    value: LeadFormValues[K],
  ) => void;
  companyOptions: { label: string; value: string }[];
  contactTypeOptions: { label: string; value: string }[];
}

const EditMode = ({
  form,
  updateField,
  companyOptions,
  contactTypeOptions,
}: EditModeProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-xl mt-6 mb-6 font-semibold">Edit Lead</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          type="text"
          value={form.full_name}
          onChange={(v: string) => updateField("full_name", v)}
        />

        <Input
          label="Role"
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
  );
};
const Label = ({ label }: { label: string }) => (
  <div className="text-gray-500 font-medium">{label}</div>
);

const Value = ({ value }: { value?: React.ReactNode }) => (
  <div className="text-gray-900">{value ?? "-"}</div>
);

const Field = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <div className="text-gray-500 text-xs font-medium">{label}</div>
    <div className="text-gray-900">{value ?? "-"}</div>
  </div>
);
