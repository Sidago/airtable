"use client";
import React, { ReactNode, useState } from "react";
import StatCard from "@/components/shared/StatCard";
import Divider from "@/components/shared/Divider";
import Select from "@/components/shared/Select";
import Table, { TableColumn } from "@/components/table/Table";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import CommonDrawer from "@/helpers/CommonDrawer";

export default function Content() {
  const [drawer, setDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setIsScrolled(scrollTop > 10);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200 flex items-center">
        <Breadcrumb
          items={[
            { label: "Tom Silver", active: false },
            { label: "Dashboard", active: true },
          ]}
        />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-10" onScroll={handleScroll}>
        <div className="w-full space-y-5 mb-10">
          <div className="text-xl font-medium">
            <p>{`Today's`} call report</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <StatCard label="Number of Calls" count={10} />
            <StatCard label="No Answer" count={10} />
            <StatCard label="Left Message" count={10} />
            <StatCard label="Interested" count={10} />
            <StatCard label="Call Lead Back" count={10} />
            <StatCard label="Bad Number" count={10} />
            <StatCard label="Not Interested" count={10} />
            <StatCard label="DNC" count={10} />
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Call Details</p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Select
                wrapperClassName="w-40"
                placeholder="Lead Type"
                options={[
                  { label: "Hot", value: "hot" },
                  { label: "General", value: "general" },
                ]}
                searchable
                multiple
              />
              <Select
                wrapperClassName="w-40"
                placeholder="Call Result"
                options={[
                  { label: "Interested", value: "hot" },
                  { label: "No answer", value: "general" },
                ]}
                searchable
                multiple
              />
            </div>

            <div className="py-5 px-4 md:px-0">
              <Table
                data={users}
                columns={columns}
                onRowClick={() => setDrawer(true)}
              />
            </div>
          </div>
        </div>

        <Divider />

        <div className="w-full space-y-5 mt-10 mb-10">
          <div className="text-xl font-medium">
            <p>Currently Assigned Leads</p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Select
                wrapperClassName="w-40"
                placeholder="Lead Type"
                options={[
                  { label: "Hot", value: "hot" },
                  { label: "General", value: "general" },
                ]}
                searchable
                multiple
              />
              <Select
                wrapperClassName="w-40"
                placeholder="Call Result"
                options={[
                  { label: "Interested", value: "hot" },
                  { label: "No answer", value: "general" },
                ]}
                searchable
                multiple
              />
            </div>

            <div className="py-5 px-4 md:px-0">
              <Table
                data={users}
                columns={columns}
                onRowClick={() => setDrawer(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer stays outside */}
      <CommonDrawer
        isOpen={drawer}
        onClose={() => setDrawer(false)}
        isScrolled={isScrolled}
        onScroll={handleScroll}
      />
    </div>
  );
}

interface AssignedLead {
  lead_id: string;
  timezone: ReactNode;
  company_symbol: ReactNode;
  company_name: string;
  full_name: string;
  email: ReactNode;
  phone: string;
  contact_type: ReactNode;
  svg_lead_type: ReactNode;
  svg_tobe_call: ReactNode;
  last_action: string;
}

const columns: TableColumn<AssignedLead>[] = [
  { key: "lead_id", label: "Lead ID", width: 80 },
  { key: "timezone", label: "Timezone", width: 100 },
  { key: "company_symbol", label: "Company Symbol", width: 80 },
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "full_name", label: "Full Name", width: 150 },
  { key: "email", label: "Email", width: 150 },
  { key: "phone", label: "Phone", width: 140 },
  { key: "contact_type", label: "Contact Type", width: 120 },
  { key: "svg_lead_type", label: "SVG - Lead Type", width: 80 },
  { key: "svg_tobe_call", label: "SVG - To Be Call By", width: 80 },
  { key: "last_action", label: "Last Action Date", width: 150 },
];

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

const users: AssignedLead[] = [
  {
    lead_id: "SKVI - Terry Howlett",
    timezone: TIMEZONEBADGE["1est"],
    company_symbol: COMPANYBADGE.SKVI,
    company_name: "Skinvisible, Inc.",
    full_name: "Terry Howlett",
    email: (
      <Link
        className="text-blue-500 underline"
        href="mailto:terry@skinvisible.com"
      >
        terry@skinvisible.com
      </Link>
    ),
    phone: "+1 (702) 433-7154",
    contact_type: CONTACTBADGE.validated,
    svg_lead_type: (
      <Badge>
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Hot
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.tom,
    last_action: "22/12/2025 2:28pm",
  },
  {
    lead_id: "ACME - John Doe",
    timezone: TIMEZONEBADGE["2est"],
    company_symbol: COMPANYBADGE.ACME,
    company_name: "Acme Corporation",
    full_name: "John Doe",
    email: (
      <Link className="text-blue-500 underline" href="mailto:johndoe@acme.com">
        johndoe@acme.com
      </Link>
    ),
    phone: "+1 (212) 555-1234",
    contact_type: CONTACTBADGE.pending,
    svg_lead_type: (
      <Badge>
        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Warm
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.alice,
    last_action: "01/01/2026 10:15am",
  },
  {
    lead_id: "XYZ - Jane Smith",
    timezone: TIMEZONEBADGE["3est"],
    company_symbol: COMPANYBADGE.XYZ,
    company_name: "XYZ Solutions",
    full_name: "Jane Smith",
    email: (
      <Link className="text-blue-500 underline" href="mailto:jane@xyz.com">
        jane@xyz.com
      </Link>
    ),
    phone: "+1 (415) 555-9876",
    contact_type: CONTACTBADGE.validated,
    svg_lead_type: (
      <Badge>
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Hot
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.bob,
    last_action: "05/01/2026 4:45pm",
  },
  {
    lead_id: "LMN - Michael Brown",
    timezone: TIMEZONEBADGE["4est"],
    company_symbol: COMPANYBADGE.LMN,
    company_name: "LMN Enterprises",
    full_name: "Michael Brown",
    email: (
      <Link className="text-blue-500 underline" href="mailto:michael@lmn.com">
        michael@lmn.com
      </Link>
    ),
    phone: "+1 (305) 555-6789",
    contact_type: CONTACTBADGE.rejected,
    svg_lead_type: (
      <Badge>
        <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Warm
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.carol,
    last_action: "12/12/2025 1:00pm",
  },
  {
    lead_id: "OPQ - Sarah Lee",
    timezone: TIMEZONEBADGE["1est"],
    company_symbol: COMPANYBADGE.OPQ,
    company_name: "OPQ Tech",
    full_name: "Sarah Lee",
    email: (
      <Link className="text-blue-500 underline" href="mailto:sarah@opq.com">
        sarah@opq.com
      </Link>
    ),
    phone: "+1 (646) 555-3344",
    contact_type: CONTACTBADGE.validated,
    svg_lead_type: (
      <Badge>
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Hot
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.david,
    last_action: "03/01/2026 11:30am",
  },
  {
    lead_id: "RST - William Johnson",
    timezone: TIMEZONEBADGE["2est"],
    company_symbol: COMPANYBADGE.RST,
    company_name: "RST Industries",
    full_name: "William Johnson",
    email: (
      <Link className="text-blue-500 underline" href="mailto:william@rst.com">
        william@rst.com
      </Link>
    ),
    phone: "+1 (718) 555-7788",
    contact_type: CONTACTBADGE.pending,
    svg_lead_type: (
      <Badge>
        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
          Warm
        </span>
      </Badge>
    ),
    svg_tobe_call: TOBECALLBADGE.linda,
    last_action: "04/01/2026 2:15pm",
  },
];
