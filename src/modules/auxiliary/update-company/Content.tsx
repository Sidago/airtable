"use client";
import Header from "@/modules/auxiliary/components/Header";
import Table, { TableColumn } from "@/components/table/Table";
import React, { ReactNode } from "react";
import Badge from "@/components/shared/Badge";

export default function Content() {
  const [data, setData] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    setData(generateLeads(20));
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Update Company", active: true },
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

const pickRandom = <T,>(obj: Record<string, T>): T => {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
};

const randomDate = () => {
  const start = new Date(2024, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start))
    .toISOString()
    .split("T")[0];
};

interface Lead {
  lead: ReactNode;
  company_symbol: ReactNode;
  previous_company_symbol: ReactNode;
  company_name: string;
  previous_company_name: string;
  histroy_log: string | ReactNode;
  timezone:ReactNode;
}

const columns: TableColumn<Lead>[] = [
  { key: "lead", label: "Lead ID", width: 80 },
  { key: "company_symbol", label: "Company Symbol", width: 80 },
  { key: "previous_company_symbol", label: "Previous Company Symbol", width: 80 },
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "previous_company_name", label: "Previous Company Name", width: 180 },
  { key: "histroy_log", label: "History", width: 180 },
  { key: "timezone", label: "Timezone", width: 180 },
];

const COMPANYBADGE = {
  SKVI: (
    <Badge>
      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        SKVI
      </span>
    </Badge>
  ),
  ACME: (
    <Badge>
      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        ACME
      </span>
    </Badge>
  ),
  XYZ: (
    <Badge>
      <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        XYZ
      </span>
    </Badge>
  ),
  LMN: (
    <Badge>
      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        LMN
      </span>
    </Badge>
  ),
  OPQ: (
    <Badge>
      <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        OPQ
      </span>
    </Badge>
  ),
  RST: (
    <Badge>
      <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        RST
      </span>
    </Badge>
  ),
};
const CONTACTBADGE = {
  validated: (
    <Badge>
      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        Validated
      </span>
    </Badge>
  ),
  pending: (
    <Badge>
      <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        Pending
      </span>
    </Badge>
  ),
  rejected: (
    <Badge>
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        Rejected
      </span>
    </Badge>
  ),
};
const TYPES = {
  general: (
    <Badge>
      <span className="bg-amber-300 text-white text-xs px-2 py-0.5 rounded-2xl">
        General
      </span>
    </Badge>
  ),
  hold: (
    <Badge>
      <span className="bg-violet-400 text-white text-xs px-2 py-0.5 rounded-2xl">
        On Hold
      </span>
    </Badge>
  ),
  hot: (
    <Badge>
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        Hot
      </span>
    </Badge>
  ),
};
const TOBECALLBADGE = {
  tom: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        TOM SILVER
      </span>
    </Badge>
  ),
  alice: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        ALICE SMITH
      </span>
    </Badge>
  ),
  bob: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        BOB JOHNSON
      </span>
    </Badge>
  ),
  carol: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        CAROL WHITE
      </span>
    </Badge>
  ),
  david: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        DAVID KING
      </span>
    </Badge>
  ),
  linda: (
    <Badge>
      <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        LINDA PARKER
      </span>
    </Badge>
  ),
};
const TIMEZONEBADGE = {
  "1est": (
    <Badge>
      <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        1 - EST
      </span>
    </Badge>
  ),
  "2est": (
    <Badge>
      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        2 - EST
      </span>
    </Badge>
  ),
  "3est": (
    <Badge>
      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        3 - EST
      </span>
    </Badge>
  ),
  "4est": (
    <Badge>
      <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-2xl">
        4 - EST
      </span>
    </Badge>
  ),
};

const COMPANY_NAMES: Record<string, string> = {
  SKVI: "Skinvisible, Inc.",
  ACME: "Acme Corporation",
  XYZ: "XYZ Holdings",
  LMN: "LMN Global",
  OPQ: "OPQ Ventures",
  RST: "RST Industries",
};

const pickRandomFromArray = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateLeads = (count = 20): Lead[] => {
  return Array.from({ length: count }, (_, i) => {
    const companyKey = pickRandomFromArray(
      Object.keys(COMPANYBADGE) as (keyof typeof COMPANYBADGE)[]
    );
    const firstNames = ["John", "Jane", "Terry", "Michael", "Sarah", "Robert"];
    const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Howlett"];

    const firstName = pickRandomFromArray(firstNames);
    const lastName = pickRandomFromArray(lastNames);
    const fullName = `${firstName} ${lastName}`;

    return {
      id: i + 1,
      lead: <span className="font-medium">RFLX-{1000 + i}</span>,
      company_symbol: COMPANYBADGE[companyKey],
      previous_company_symbol: COMPANYBADGE[companyKey],
      company_name: COMPANY_NAMES[companyKey],
      previous_company_name: COMPANY_NAMES[companyKey],
      histroy_log: "-",
      timezone: pickRandom(TIMEZONEBADGE),
    };
  });
};
