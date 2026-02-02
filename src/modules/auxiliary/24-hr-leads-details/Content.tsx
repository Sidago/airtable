"use client";
import React, { ReactNode } from "react";
import StatCard from "@/components/shared/StatCard";
import Divider from "@/components/shared/Divider";
import Select from "@/components/shared/Select";
import Table, { TableColumn } from "@/components/table/Table";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItems as HeadlessMenuItems,
  MenuItem as HeadlessMenuItem,
  Portal,
} from "@headlessui/react";
import { ChevronDown, ChevronRight, Ellipsis, Funnel, Printer } from "lucide-react";
import clsx from "clsx";

export default function Content() {
  const tabs = [
    "24hr Sent to Fix",
    "24hr Fix",
    "24hr New",
    "24hr Can't Locate",
  ];
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-4 md:top-0 z-30 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <Breadcrumb
          items={[
            { label: "Auxiliary Staff", active: false },
            { label: "Fix Leads (V4)", active: true },
          ]}
        />
        <div>
          {/* More menu */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenuButton className="outline-0 ring-0 cursor-pointer">
              <Ellipsis size={16} />
            </HeadlessMenuButton>

            <Portal>
              <HeadlessMenuItems className="outline-0 ring-0 absolute z-50 w-65 rounded-md bg-white shadow-lg right-0 top-10">
                <div className="p-4 flex flex-col gap-1">
                  <HeadlessMenuItem
                    as="button"
                    className="flex items-center gap-2 px-3 py-2 outline-0 ring-0 hover:bg-gray-100"
                  >
                    <Printer size={14} /> Print this page
                  </HeadlessMenuItem>
                </div>
              </HeadlessMenuItems>
            </Portal>
          </HeadlessMenu>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div
        className="flex-1 overflow-y-auto overscroll-y-contain"
        style={{
          WebkitOverflowScrolling: "touch", // smooth iOS scrolling
        }}
      >
        <div className="w-full p-4">
          <div className="w-full space-y-5 mt-4 mb-10">
            <div className="text-xl font-medium">
              <p>Summary</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
              <StatCard label="Fix Queue" count={10} />
              <StatCard label="24hr Sent to Fix" count={39} />
              <StatCard label="24hr Fixed" count={25} />
              <StatCard label="24hr New" count={14} />
              <StatCard label="24hr Can't Locate" count={20} />
            </div>
          </div>

          <Divider />

          <div className="w-full space-y-5 mt-10 mb-10">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">
                <p>Fix Queue</p>
              </div>
              <Link
                href="/crm/sidago-crm/fix-lead"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white text-sm font-medium px-3 py-2 rounded-md"
              >
                Fix Queue
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Filter Row */}
            <div>
              {/* Filter Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Filters */}
                <div className="flex flex-wrap gap-4">
                  <Select
                    wrapperClassName="w-40"
                    placeholder="Contact Filter"
                    searchable
                    multiple
                    options={[
                      { label: "Hot", value: "hot" },
                      { label: "General", value: "general" },
                    ]}
                  />

                  <Select
                    wrapperClassName="w-40"
                    placeholder="Has Other Contact"
                    searchable
                    multiple
                    options={[
                      { label: "Interested", value: "hot" },
                      { label: "No answer", value: "general" },
                    ]}
                  />

                  <Select
                    wrapperClassName="w-40"
                    placeholder="Timezone"
                    searchable
                    multiple
                    options={[
                      { label: "EST", value: "est" },
                      { label: "PST", value: "pst" },
                    ]}
                  />
                </div>

                {/* Right Filter */}
                <div className="flex items-center gap-2">
                  <div className="w-40">
                    <Select
                      wrapperClassName="w-full"
                      placeholder="Filter"
                      options={[
                        { label: "All", value: "all" },
                        { label: "Timezone", value: "exclude-canada" },
                      ]}
                    />
                  </div>
                  <Funnel size={16} />
                </div>
              </div>
              {/* Tabs */}
              <div className="relative mt-8 md:mt-0 px-4">
                <div className="hidden sm:flex gap-4 text-sm">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setCurrentTab(tab)}
                      className={clsx(
                        "px-3 py-2 cursor-pointer",
                        currentTab === tab
                          ? "text-gray-900 font-semibold border-b-2 border-gray-800"
                          : "text-gray-500",
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Mobile dropdown */}
                <div className="sm:hidden mt-2">
                  <Listbox value={currentTab} onChange={setCurrentTab}>
                    <div className="relative">
                      <ListboxButton className="w-full border border-gray-200 rounded px-4 py-2 flex justify-between items-center">
                        <span>{currentTab}</span>
                        <ChevronDown size={16} />
                      </ListboxButton>
                      <ListboxOptions className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-auto z-50">
                        {tabs.map((tab) => (
                          <ListboxOption
                            key={tab}
                            value={tab}
                            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                          >
                            {tab}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>
              </div>

              {/* Table */}
              <div className="py-5">
                <Table
                  data={users}
                  columns={columns}
                  onRowClick={(row) => console.log("Row clicked", row)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  fix_lead: ReactNode;
  other_contact: string | ReactNode;
  fix_entry_date: string;
}

const columns: TableColumn<AssignedLead>[] = [
  { key: "lead_id", label: "Lead", width: 80 },
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "company_symbol", label: "Company Symbol", width: 80 },
  { key: "timezone", label: "Timezone", width: 100 },
  { key: "full_name", label: "Full Name", width: 150 },
  { key: "email", label: "Email", width: 150 },
  { key: "phone", label: "Phone", width: 140 },
  { key: "fix_lead", label: "Fixed Lead", width: 80 },
  { key: "other_contact", label: "Other Contacts", width: 80 },
  // { key: "fix_entry_date", label: "Fix Entry Date", width: 150 },
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "22/12/2025 2:28pm",
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "01/01/2026 10:15am",
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "05/01/2026 4:45pm",
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "12/12/2025 1:00pm",
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "03/01/2026 11:30am",
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
    fix_lead: (
      <Badge>
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
          Fix Lead
        </span>
      </Badge>
    ),
    other_contact: "-",
    fix_entry_date: "04/01/2026 2:15pm",
  },
];
