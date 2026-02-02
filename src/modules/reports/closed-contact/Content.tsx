"use client";

import Table, { TableColumn } from "@/components/table/Table";
import useDummy from "@/helpers/dummy";
import React, { ReactNode } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Header from "@/components/shared/Header";

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
  { key: "lead_type", label: "Lead Type", width: 130 },
  { key: "tobe_called", label: "To Be Called", width: 140 },
  { key: "date_become_hot", label: "Date Become Hot", width: 140 },
  { key: "last_action", label: "Last Action", width: 180 },
];

/* ======================
   Group Options
====================== */
type GroupKey = keyof Lead | null;
const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Company Name", value: "company_name" },
  { label: "Timezone", value: "timezone" },
  { label: "Contact Type", value: "contact_type" },
  { label: "Lead Type", value: "lead_type" },
  { label: "Phone", value: "phone" },
];

/* ======================
   Component
====================== */
export default function Content() {
  const dummy = useDummy();
  const [data, setData] = React.useState<Lead[]>([]);
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);

  const tabs = [
    "SVG Current",
    "SVG Historical",
    "Benton Current",
    "Benton Historical",
    "All Closed Contacts",
  ];
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);

  React.useEffect(() => {
    setData(
      Array.from({ length: 20 }, () => {
        const company_name = dummy.company();
        return {
          lead: dummy.leadID(),
          company_name,
          company_symbol: dummy.symbol(company_name),
          full_name: dummy.name(),
          email: dummy.email(),
          phone: dummy.phone(),
          timezone: dummy.timeZone(),
          contact_type: dummy.contactType(),
          lead_type: dummy.leadType(),
          tobe_called: dummy.tobeCalled(),
          date_become_hot: dummy.randomDate(),
          last_action: dummy.randomDate("hm"),
        };
      }),
    );
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Reports", active: false },
          { label: "Closed Contracts", active: true },
        ]}
        groupBy={groupBy as string | null}
        printAll
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={groupOptions}
      />

      {/* Tabs */}
      <div className="relative mt-8 md:mt-0 px-4">
        <div className="hidden sm:flex gap-4 border-b text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={clsx(
                "px-3 py-2",
                currentTab === tab
                  ? "text-gray-900 font-semibold border-b-2 border-blue-400"
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
      <div className="py-5 px-4 md:px-0">
        <Table
          data={data}
          columns={columns}
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
