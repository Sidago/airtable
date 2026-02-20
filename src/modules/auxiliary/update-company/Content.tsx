/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode, useState, useCallback, useMemo } from "react";
import Header from "@/components/shared/Header";
import Table, { TableColumn } from "@/components/table/Table";
import { ChevronDown } from "lucide-react";
import CompanySymbol from "@/components/ui/company-symbol/CompanySymbol";
import Timezone from "@/components/ui/timezone/Timezone";
import { useCompany } from "@/modules/company/hooks/useCompany";
import CompanyDrawer from "./components/CompanyDrawer";

/* ======================
   Types
====================== */

interface CompanyRow {
  id: number;
  company_name: string;
  company_symbol: ReactNode;
  previous_company_symbol: ReactNode;
  previous_company_name: string | null;
  history_log: ReactNode;
  timezone: ReactNode;
}

type GroupKey = keyof CompanyRow | null;

export default function Content() {
  const { companies, selectedCompany, setSelectedCompany, refetch } = useCompany();

  const [drawer, setDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [groupBy, setGroupBy] = useState<GroupKey>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  }, []);

  /* ======================
     Transform Table Data
  ====================== */

  const data: CompanyRow[] = useMemo(() => {
    return companies.map((item, index) => ({
      id: item.id,
      company_name: item.name,
      company_symbol: (
        <CompanySymbol label={item.symbol} index={index + 1} />
      ),
      previous_company_symbol: item.previous_company_symbol ? (
        <CompanySymbol
          label={item.previous_company_symbol}
          index={index + 1}
        />
      ) : (
        "-"
      ),
      previous_company_name: item.previous_company_name ?? "-",
      history_log: item.histories?.length ? (
        <div className="flex flex-col gap-1">
          {item.histories.map((history: string, idx: number) => (
            <span key={`${item.id}-${idx}`} className="text-xs text-gray-600">
              {history}
            </span>
          ))}
        </div>
      ) : (
        "-"
      ),
      timezone: <Timezone label={item.timezone} />,
    }));
  }, [companies]);

  /* ======================
     Group Header
  ====================== */

  const renderGroupHeader = useCallback(
    (group: string, count: number) => (
      <div className="group flex items-center gap-2 px-4 py-2 bg-gray-100 font-semibold cursor-pointer">
        <ChevronDown
          size={16}
          className="transition-transform duration-200 group-data-[open=true]:rotate-180"
        />
        <span>{group}</span>
        <span className="text-xs text-gray-500">({count})</span>
      </div>
    ),
    []
  );

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Update Company", active: true },
        ]}
        groupBy={groupBy as string | null}
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={[
          { label: "Group", value: null },
          { label: "Company Name", value: "company_name" },
        ]}
        printAll
      />

      <div className="py-5 px-4 md:px-0">
        <Table
          data={data}
          columns={columns}
          onRowClick={(row) => {
            setSelectedCompany(row);
            setDrawer(true);
          }}
          groupBy={groupBy ?? undefined}
          collapsibleGroups
          renderGroupHeader={renderGroupHeader}
        />

        <div className="px-5 text-sm">{data.length} companies</div>
      </div>

      <CompanyDrawer
        isOpen={drawer}
        onClose={() => {
          setSelectedCompany(null);
          setDrawer(false);
          refetch();
        }}
        isScrolled={isScrolled}
        onScroll={handleScroll}
        company={selectedCompany}
      />
    </div>
  );
}

/* ======================
   Static Columns
====================== */

const columns: TableColumn<CompanyRow>[] = [
  { key: "company_name", label: "Company Name", width: 180 },
  { key: "company_symbol", label: "Company Symbol", width: 120 },
  { key: "previous_company_symbol", label: "Previous Symbol", width: 160 },
  { key: "previous_company_name", label: "Previous Name", width: 180 },
  { key: "history_log", label: "History", width: 160 },
  { key: "timezone", label: "Timezone", width: 120 },
];