"use client";
import Header from "@/components/shared/Header";
import Table, { TableColumn } from "@/components/table/Table";
import React, { ReactNode } from "react";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import { ChevronDown, CircleCheck } from "lucide-react";

export default function Content() {
  const [data, setData] = React.useState<Lead[]>([]);
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);
  React.useEffect(() => {
    setData(generateLeads(20));
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Dead/Missing Emails", active: true },
        ]}
        groupBy={groupBy as string | null}
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={groupOptions}
      />
      {/* Table/Grid */}
      <div className="py-5 px-4 md:px-0">
        <Table
          data={data}
          columns={columns}
          onRowClick={(row) => console.log("Row clicked", row)}
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
  email: ReactNode;
  additional_contact_emails?: string | ReactNode;
  svg_lead_type: ReactNode;
  benton_lead_type: ReactNode;
  rm_lead_type: ReactNode;
  fix_lead: ReactNode;
  dead_email: ReactNode;
}

/* ======================
   Group Options
====================== */
type GroupKey = keyof Lead | null;
const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Lead Id", value: "lead" },
  { label: "Email", value: "email" },
];

const columns: TableColumn<Lead>[] = [
  { key: "lead", label: "Lead ID", width: 80 },
  { key: "email", label: "Email", width: 220 },
  {
    key: "additional_contact_emails",
    label: "Additional Contact Email",
    width: 220,
  },
  { key: "svg_lead_type", label: "SVG Lead Type", width: 130 },
  { key: "benton_lead_type", label: "Benton Lead Type", width: 150 },
  { key: "rm_lead_type", label: "95rm Lead Type", width: 150 },
  { key: "fix_lead", label: "Fxied Lead", width: 150 },
  { key: "dead_email", label: "Missing/Dead Email", width: 150 },
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
      Object.keys(COMPANYBADGE) as (keyof typeof COMPANYBADGE)[],
    );
    const firstNames = ["John", "Jane", "Terry", "Michael", "Sarah", "Robert"];
    const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Howlett"];

    const firstName = pickRandomFromArray(firstNames);
    const lastName = pickRandomFromArray(lastNames);
    const fullName = `${firstName} ${lastName}`;

    return {
      id: i + 1,
      lead: <span className="font-medium">RFLX-{1000 + i}</span>,
      email: (
        <Link
          className="text-blue-500 underline"
          href={`mailto:${fullName
            .toLowerCase()
            .replace(" ", ".")}@example.com`}
        >
          {fullName.toLowerCase().replace(" ", ".")}@example.com
        </Link>
      ),
      svg_lead_type: pickRandom(TYPES),
      benton_lead_type: pickRandom(TYPES),
      rm_lead_type: pickRandom(TYPES),
      fix_lead: (
        <Badge>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Fix Lead
          </span>
        </Badge>
      ),
      dead_email: <CircleCheck size={20} className="text-green-500" />,
    };
  });
};
