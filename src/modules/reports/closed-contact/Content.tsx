"use client";

import Table, { TableColumn } from "@/components/table/Table";
import useDummy from "@/helpers/dummy";
import Header from "@/modules/auxiliary/components/Header";
import React, { ReactNode } from "react";

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
  tobe_called: ReactNode;
  date_become_hot: string;
  last_action: string;
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
  { key: "timezone", label: "Timezone", width: 100 },
  { key: "contact_type", label: "Contact Type", width: 120 },
  { key: "lead_type", label: "SVG Lead Type", width: 130 },
  { key: "tobe_called", label: "SVG To Be Called", width: 140 },
  { key: "date_become_hot", label: "Date Become Hot", width: 140 },
  { key: "last_action", label: "Last Action", width: 180 },
];

/* ======================
   Component
====================== */
export default function Content() {
  const {
    leadID,
    company,
    symbol,
    name,
    email,
    phone,
    timeZone,
    contactType,
    leadType,
    tobeCalled,
    randomDate,
  } = useDummy();

  const [data, setData] = React.useState<Lead[]>([]);

  /* Generate dummy leads */
  const generateLeads = (count = 20): Lead[] => {
    return Array.from({ length: count }, () => {
      const company_name = company();
      const company_symbol = symbol(company_name);

      return {
        lead: leadID(),
        company_name,
        company_symbol,
        full_name: name(),
        email: email(),
        phone: phone(),
        timezone: timeZone(),
        contact_type: contactType(),
        lead_type: leadType(),
        tobe_called: tobeCalled(),
        date_become_hot: randomDate(),
        last_action: randomDate("hm"),
      };
    });
  };

  React.useEffect(() => {
    setData(generateLeads(20));
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Reports", active: false },
          { label: "Closed Contracts", active: true },
        ]}
      />
      {/* Table/Grid */}
      <div className="py-5">
        <Table
          data={data}
          columns={columns}
          onRowClick={(row) => console.log("Row clicked", row)}
        />
      </div>
    </div>
  );
}
