/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { CompanyRow, useCompany } from "@/modules/company/hooks/useCompany";
import Header from "./Header";
import Divider from "@/components/shared/Divider";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import { useTimezone } from "@/modules/company/hooks/useTimezone";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { CompanyService } from "@/modules/company/services/company.service";
import Footer from "./Footer";

const Drawer = dynamic(() => import("@/components/shared/Drawer"), {
  ssr: false,
});

interface CompanyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  company: CompanyRow | null;
}

interface CompanyFormValues {
  symbol: string;
  name: string;
  timezone_id: string;
  country: string;
  state: string;
  city: string;
}

export default function CompanyDrawer({
  isOpen,
  onClose,
  isScrolled,
  onScroll,
  company,
}: CompanyDrawerProps) {
  const { companies, refetch } = useCompany();
  const token = useAuthStore((s) => s.tokens?.access_token);
  const { options } = useTimezone();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CompanyFormValues>({
    symbol: "",
    name: "",
    timezone_id: "",
    country: "",
    state: "",
    city: "",
  });

  /* =========================
     Get Latest Company From Store
  ========================== */
  const selectedCompany = useMemo(() => {
    if (!company) return null;
    return companies.find((c) => c.id === company.id) || null;
  }, [company, companies]);

  /* =========================
     Populate Form
  ========================== */
  useEffect(() => {
    if (!selectedCompany) return;

    setForm({
      symbol: selectedCompany.symbol || "",
      name: selectedCompany.name || "",
      timezone_id: String(selectedCompany.timezone_id) || "",
      country: selectedCompany.country || "",
      state: selectedCompany.state || "",
      city: selectedCompany.city || "",
    });
  }, [selectedCompany]);

  /* =========================
     Reset When Drawer Closes
  ========================== */
  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
      setForm({
        symbol: "",
        name: "",
        timezone_id: "",
        country: "",
        state: "",
        city: "",
      });
    }
  }, [isOpen]);

  const updateField = <K extends keyof CompanyFormValues>(
    name: K,
    value: CompanyFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    if (!token || !selectedCompany) return;

    try {
      setLoading(true);
      await CompanyService.updateCompany(form, String(selectedCompany.id), token);
      await refetch();
      setEditMode(false);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer width="w-2xl" height="h-full" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full">
        <Header
          scrolled={isScrolled}
          label={selectedCompany?.name || "Company Details"}
          onClose={onClose}
        />

        <div
          className="flex-1 overflow-y-auto scrollbar-custom"
          onScroll={onScroll}
        >
          <section className="p-10 space-y-6">
            {selectedCompany && (
              <div className="flex justify-between items-center">
                <p className="font-semibold">{selectedCompany.name}</p>
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
              <ViewMode company={company} />
            ) : (
              <EditMode
                form={form}
                loading={loading}
                options={options}
                updateField={updateField}
                onUpdate={onUpdate}
              />
            )}
          </section>
        </div>
        {!editMode && <Footer companyId={company?.id || null} />}
      </div>
    </Drawer>
  );
}

/* ============================================================
   VIEW MODE COMPONENT
============================================================ */

interface ViewModeProps {
  company: any;
}

const ViewMode = ({ company }: ViewModeProps) => {
  if (!company) return null;

  return (
    <div className="grid grid-cols-[200px_1fr] gap-y-6 gap-x-10 text-sm">
      <Label label="Company Name" /> <Value value={company?.company_name} />
      <Label label="Company Symbol" />
      <div className="text-gray-900">{company?.company_symbol}</div>
      <Label label="Previous Company Name" />
      <Value value={company?.previous_company_name} />
      <Label label="Previous Company Symbol" />
      <div className="text-gray-900"> {company?.previous_company_symbol} </div>
      <Label label="Timezone" />
      <div className="text-gray-900">{company?.timezone}</div>
      <Label label="History Log" />
      <div className="text-gray-900 space-y-1"> {company?.history_log} </div>
    </div>
  );
};

/* ============================================================
   EDIT MODE COMPONENT
============================================================ */

interface EditModeProps {
  form: CompanyFormValues;
  loading: boolean;
  options: any[];
  updateField: <K extends keyof CompanyFormValues>(
    name: K,
    value: CompanyFormValues[K],
  ) => void;
  onUpdate: () => void;
}

const EditMode = ({
  form,
  loading,
  options,
  updateField,
  onUpdate,
}: EditModeProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
        />

        <Input
          label="Company Symbol"
          value={form.symbol}
          onChange={(v) => updateField("symbol", v)}
        />

        <Input
          label="Country"
          value={form.country}
          onChange={(v) => updateField("country", v)}
        />

        <Input
          label="State"
          value={form.state}
          onChange={(v) => updateField("state", v)}
        />

        <Input
          label="City"
          value={form.city}
          onChange={(v) => updateField("city", v)}
        />

        <Select
          label="Timezone"
          value={form.timezone_id}
          onChange={(v) => updateField("timezone_id", String(v))}
          options={options}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onUpdate}
          disabled={loading}
          className="px-6 py-1 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   SMALL REUSABLE COMPONENTS
============================================================ */

const Label = ({ label }: { label: string }) => (
  <div className="text-gray-500 font-medium">{label}</div>
);

const Value = ({ value }: { value?: React.ReactNode }) => (
  <div className="text-gray-900">{value ?? "-"}</div>
);
