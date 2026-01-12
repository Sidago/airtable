"use client";

import Table, { TableColumn } from "@/components/table/Table";
import CommonDrawer from "@/helpers/CommonDrawer";
import useDummy from "@/helpers/dummy";
import Header from "@/modules/auxiliary/components/Header";
import React, { ReactNode, useState } from "react";

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

  // Drawer state
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
          { label: "Unassigned Leads 95rm", active: true },
        ]}
      />
      {/* Table/Grid */}
      <div className="py-5">
        <Table
          data={data}
          columns={columns}
          onRowClick={() => setDrawer(true)} // open drawer on row click
        />
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
