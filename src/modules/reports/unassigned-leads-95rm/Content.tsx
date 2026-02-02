"use client";

import Table, { TableColumn } from "@/components/table/Table";
import CommonDrawer from "@/helpers/CommonDrawer";
import useDummy from "@/helpers/dummy";
import Header from "@/components/shared/Header";
import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ======================
   Types
====================== */
interface Lead {
  lead: ReactNode;
  company_symbol: ReactNode;
  company_name: string;
  full_name: string;
  email: ReactNode;
  phone: string;
  timezone: ReactNode;
  contact_type: ReactNode;
  lead_type: ReactNode;
  rm_tobe_called: ReactNode;
  rm_last_call: ReactNode;
  date_become_hot: ReactNode;
  last_action: ReactNode;
}

/* ======================
   Group Options
====================== */
type GroupKey = keyof Lead | null;

const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Lead ID", value: "lead" },
  { label: "Company Name", value: "company_name" },
  { label: "Lead Type", value: "lead_type" },
  { label: "To be Called(95RM)", value: "rm_tobe_called" },
];

/* ======================
   Columns
====================== */
const columns: TableColumn<Lead>[] = [
  { key: "lead", label: "Lead ID", width: 80 },
  { key: "company_symbol", label: "Company Symbol", width: 80 },
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "full_name", label: "Full Name", width: 150 },
  { key: "email", label: "Email", width: 220 },
  { key: "phone", label: "Phone", width: 140 },
  { key: "timezone", label: "Timezone", width: 140 },
  { key: "contact_type", label: "Contact Type", width: 140 },
  { key: "lead_type", label: "Lead Type", width: 130 },
  { key: "rm_tobe_called", label: "To be Called(95RM)", width: 130 },
  { key: "rm_last_call", label: "95RM - Last Called Date", width: 130 },
  { key: "date_become_hot", label: "Date Become Hot", width: 130 },
  { key: "last_action", label: "Last Action Date", width: 130 },
];

/* ======================
   Component
====================== */
export default function Content() {
  const {
    leadID,
    symbol,
    company,
    name,
    email,
    phone,
    timeZone,
    contactType,
    leadType,
    randomDate,
  } = useDummy();

  const [data, setData] = React.useState<Lead[]>([]);
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);

  /* Generate dummy leads */
  const generateLeads = (count = 20): Lead[] => {
    return Array.from({ length: count }, () => {
      const company_name = company();

      return {
        lead: leadID(),
        company_symbol: symbol(company_name),
        company_name,
        full_name: name(),
        email: email(),
        phone: phone(),
        timezone: timeZone(),
        contact_type: contactType(),
        lead_type: leadType(),
        rm_tobe_called: name(),
        rm_last_call: randomDate(),
        date_become_hot: randomDate(),
        last_action: randomDate("hm"),
      };
    });
  };

  React.useEffect(() => {
    setData(generateLeads(20));
  }, []);

  const [drawer, setDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setIsScrolled(scrollTop > 10);
  };

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Reports", active: false },
          { label: "Unassigned Leads 95RM", active: true },
        ]}
        groupBy={groupBy as string | null}
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={groupOptions}
        printAll
        csvExport
      />

      {/* Table/Grid */}
      <div className="py-5 px-4 md:px-0">
        <Table
          data={data}
          columns={columns}
          onRowClick={() => setDrawer(true)}
          groupBy={groupBy ?? undefined}
          collapsibleGroups
          renderGroupHeader={(group, count) => (
            <div className="group flex items-center gap-2 px-4 py-2 bg-gray-100 font-semibold cursor-pointer select-none">
              <ChevronDown
                size={16}
                className="text-gray-600 transition-transform duration-200 group-data-[open=true]:rotate-180"
              />
              <span>{group}</span>
              <span className="text-xs text-gray-500">({count})</span>
            </div>
          )}
        />
        <div className="px-5 text-sm">{data.length} leads</div>
      </div>

      {/* Drawer */}
      <CommonDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        isScrolled={isScrolled}
        onScroll={handleScroll}
      />
    </div>
  );
}
