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
  campaign: ReactNode;
  company_name: string;
  contact_person: string;
  email: ReactNode;
  phone: string;
  lead_type: ReactNode;
  assigned_to: string;
  call_result: ReactNode;
  note: string | ReactNode;
}

/* ======================
   Columns
====================== */
const columns: TableColumn<Lead>[] = [
  { key: "lead", label: "Lead ID", width: 80 },
  { key: "campaign", label: "Campaign Type", width: 80 },
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "contact_person", label: "Contact Person", width: 150 },
  { key: "email", label: "Email", width: 220 },
  { key: "phone", label: "Phone", width: 140 },
  { key: "lead_type", label: "Lead Type", width: 130 },
  { key: "call_result", label: "Call Result", width: 130 },
  { key: "assigned_to", label: "Assigned To", width: 130 },
  { key: "note", label: "Notes", width: 130 },
];

/* ======================
   Component
====================== */
export default function Content() {
  const {
    leadID,
    company,
    name,
    email,
    phone,
    campaign,
    leadType,
    resultUpdate,
  } = useDummy();

  const [data, setData] = React.useState<Lead[]>([]);

  /* Generate dummy leads */
  const generateLeads = (count = 20): Lead[] => {
    return Array.from({ length: count }, () => {
      const company_name = company();

      return {
        lead: leadID(),
        campaign: campaign(),
        company_name,
        contact_person: name(),
        email: email(),
        phone: phone(),
        lead_type: leadType(),
        assigned_to: name(),
        call_result: resultUpdate(),
        note: `${name()} ${name()}`,
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
          { label: "Recent Interest - 95RM", active: true },
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
