"use client";

import Table, { TableColumn } from "@/components/table/Table";
import useDummy from "@/helpers/dummy";
import Header from "@/modules/auxiliary/components/Header";
import React, { ReactNode } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

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

  // -----------------------------
  // Tabs
  // -----------------------------
  const tabs = [
    "SVG Current",
    "SVG Historical",
    "Benton Current",
    "Benton Historical",
    "All Closed Contacts",
  ];
  const [currentTab, setCurrentTab] = React.useState(tabs[0]); // default to first tab

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

      {/* navigation tab */}
      <div className="relative mt-8 md:mt-0 px-4">
        {/* Large screens: horizontal tabs */}
        <div className="hidden sm:flex gap-4 overflow-x-auto border-b border-gray-100 text-sm scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={clsx(
                "relative shrink-0 px-3 py-2 transition-colors cursor-pointer",
                currentTab === tab
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              {tab}
              {/* Active Tab Bottom Border */}
              {currentTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400"></span>
              )}
            </button>
          ))}
        </div>

        {/* Small screens: dropdown */}
        <div className="sm:hidden w-full">
          <Listbox value={currentTab} onChange={setCurrentTab}>
            <div className="relative">
              <ListboxButton className="relative w-full cursor-pointer bg-white border border-gray-200 rounded px-4 py-2 text-left focus:outline-none ring-0 flex justify-between items-center">
                <span>{currentTab}</span>
                <ChevronDown size={16} />
              </ListboxButton>

              <ListboxOptions className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-auto z-[100]">
                {tabs.map((tab) => (
                  <ListboxOption
                    key={tab}
                    value={tab}
                    className={({ active, selected }) =>
                      clsx(
                        "cursor-pointer px-4 py-2",
                        active && "bg-blue-100",
                        selected && "font-semibold text-blue-600"
                      )
                    }
                  >
                    {tab}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Table/Grid */}
      <div className="py-5 px-4 md:px-0">
        <Table
          data={data}
          columns={columns}
          onRowClick={(row) => console.log("Row clicked", row)}
        />
      </div>
    </div>
  );
}
