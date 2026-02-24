"use client";

import Table, { TableColumn } from "@/components/table/Table";
import React, { useState } from "react";
import CommonDrawer from "@/helpers/CommonDrawer";
import Header from "@/components/shared/Header";
import { ChevronDown } from "lucide-react";
import { useLeads } from "./hooks/useLeads";
import ContactType from "@/components/ui/contact-type/ContactType";
import CompanySymbol from "@/components/ui/company-symbol/CompanySymbol";
import Timezone from "@/components/ui/timezone/Timezone";

export default function Content() {
  const { leads = [] } = useLeads();

  const [drawer, setDrawer] = useState(false);
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "All Leads", active: true },
        ]}
        groupBy={groupBy as string | null}
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={groupOptions}
      />

      <div className="py-5 px-4 md:px-0">
        <Table
          data={leads}
          columns={columns}
          // onRowClick={() => setDrawer(true)}
          groupBy={
            groupBy === "company"
              ? (row) => row.company?.name ?? "Unknown"
              : (groupBy ?? undefined)
          }
          collapsibleGroups
          renderGroupHeader={(group, count) => (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 font-semibold cursor-pointer select-none">
              <ChevronDown size={16} className="text-gray-600" />
              <span>{group}</span>
              <span className="text-xs text-gray-500">({count})</span>
            </div>
          )}
        />

        <div className="px-5 text-sm mt-2 text-gray-500">
          {leads.length} leads
        </div>
      </div>

      <CommonDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        isScrolled={isScrolled}
        onScroll={handleScroll}
      />
    </div>
  );
}

/* ======================
   TYPES (UPDATED)
====================== */

interface Lead {
  id: number;
  lead_id: string;
  full_name: string;
  role: string;
  phone: string;
  email: string;
  assigned_to: string;
  agent: string;
  follow_up_date: string | null;
  lead_type: string;
  contact_type: string;
  date_become_hot: string | null;
  others_contacts: string | null;
  company: {
    id: number;
    name: string;
    symbol: string;
    timezone: string;
  };
  svg_lead_type: string;
  svg_tobe_called: string;
  benton_lead_type: string;
  benton_tobe_called: string;
  rm_lead_type: string;
  rm_tobe_called: string;
  last_called_date_sidago: string;
  last_called_date_benton: string;
  last_called_date_rm: string;
  last_action: string;
}

/* ======================
   GROUP OPTIONS (UPDATED)
====================== */

type GroupKey = "full_name" | "contact_type" | "company" | null;

const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Full Name", value: "full_name" },
  { label: "Contact Type", value: "contact_type" },
  { label: "Company", value: "company" },
];

/* ======================
   COLUMNS (UPDATED)
====================== */

const columns: TableColumn<Lead>[] = [
  {
    key: "lead_id",
    label: "Lead ID",
    width: 120,
  },
  {
    key: "company",
    label: "Company Name",
    width: 250,
    render: (row) => <span>{row.company?.name}</span>,
  },
  {
    key: "company",
    label: "Company Symbol",
    width: 250,
    render: (row) => (
      <CompanySymbol label={row.company?.symbol} index={row.company?.id} />
    ),
  },
  {
    key: "full_name",
    label: "Full Name",
    width: 180,
  },

  {
    key: "contact_type",
    label: "Contact Type",
    width: 150,
    render: (row) => <ContactType label={row.contact_type} />,
  },
  { key: "svg_lead_type", label: "SVG Lead Type", width: 130 },
  { key: "svg_tobe_called", label: "SVG To Be Called", width: 140 },
  { key: "benton_lead_type", label: "Benton Lead Type", width: 150 },
  { key: "benton_tobe_called", label: "Benton To Be Called", width: 160 },
  { key: "rm_lead_type", label: "95RM Lead Type", width: 130 },
  { key: "rm_tobe_called", label: "95RM To Be Called", width: 140 },
  { key: "email", label: "Email", width: 220 },
  { key: "phone", label: "Phone", width: 140 },
  { 
    key: "company", label: "Timezone", width: 100, 
    render:(row)=> <Timezone label={row.company?.timezone} />
  },
  { key: "last_called_date_sidago", label: "Last Called (Sidago)", width: 160 },
  { key: "last_called_date_benton", label: "Last Called (Benton)", width: 160 },
  { key: "last_called_date_rm", label: "Last Called (95RM)", width: 160 },
  { key: "last_action", label: "Last Action", width: 180 },
];
