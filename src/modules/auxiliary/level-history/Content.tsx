"use client";
import Header from "@/modules/auxiliary/components/Header";
import Table, { TableColumn } from "@/components/table/Table";
import React, { ReactNode } from "react";
import Badge from "@/components/shared/Badge";

export default function Content() {
  const [data, setData] = React.useState<History[]>([]);

  React.useEffect(() => {
    setData(generateHistories());
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Level 2 - History", active: true },
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

interface History {
  id: number;
  lead: ReactNode;
  campaign: ReactNode;
  level_2_agent: ReactNode;
  level_2_result_update: ReactNode;
  update_notes: string;
  callback_date: string;
  created_date: string;
  lead_type_sidago: ReactNode;
  lead_type_benton: ReactNode;
}

const CAMPAIGN = {
  benton: (
    <Badge>
      <span className="bg-blue-200 text-white text-xs px-2 py-0.5 rounded-2xl">
        Benton
      </span>
    </Badge>
  ),
  svg: (
    <Badge>
      <span className="bg-gray-200 text-white text-xs px-2 py-0.5 rounded-2xl">
        Svg
      </span>
    </Badge>
  ),
};

const AGENT = {
  ryan: (
    <Badge>
      <span className="bg-amber-200 text-white text-xs px-2 py-0.5 rounded-2xl">
        RYAN
      </span>
    </Badge>
  ),
  tom: (
    <Badge>
      <span className="bg-blue-300 text-white text-xs px-2 py-0.5 rounded-2xl">
        TOM
      </span>
    </Badge>
  ),
};

const RESULTUPDATE = {
  closed: (
    <Badge>
      <span className="bg-green-400 text-white text-xs px-2 py-0.5 rounded-2xl">
        Contract Closed
      </span>
    </Badge>
  ),
  not_interested: (
    <Badge>
      <span className="bg-violet-400 text-white text-xs px-2 py-0.5 rounded-2xl">
        Not Interested
      </span>
    </Badge>
  ),
  force: (
    <Badge>
      <span className="bg-yellow-300 text-white text-xs px-2 py-0.5 rounded-2xl">
        Force General
      </span>
    </Badge>
  ),
  noanswer: (
    <Badge>
      <span className="bg-red-300 text-white text-xs px-2 py-0.5 rounded-2xl">
        No Answer
      </span>
    </Badge>
  ),
};

const TYPE = {
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
  fix: (
    <Badge>
      <span className="bg-blue-400 text-white text-xs px-2 py-0.5 rounded-2xl">
        TOM
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

const columns: TableColumn<History>[] = [
  { key: "lead", label: "Lead", width: 200 },
  { key: "campaign", label: "Campaign", width: 200 },
  { key: "level_2_agent", label: "Level 2 Agent", width: 200 },
  { key: "level_2_result_update", label: "Level 2 Result Upade", width: 200 },
  { key: "update_notes", label: "Update Notes", width: 200 },
  { key: "callback_date", label: "Callback Date", width: 200 },
  { key: "created_date", label: "Created Date", width: 200 },
  { key: "lead_type_sidago", label: "Lead Type Sidago", width: 200 },
  { key: "lead_type_benton", label: "Lead Type Benton", width: 200 },
];

const generateHistories = (): History[] =>
  Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,

    lead: (
      <div className="rounded bg-gray-100 px-2 py-1 text-sm">
        RFLX-{1000 + index} – Lead {index + 1}
      </div>
    ),

    campaign: pickRandom(CAMPAIGN),
    level_2_agent: pickRandom(AGENT),
    level_2_result_update: pickRandom(RESULTUPDATE),

    update_notes: [
      "Follow-up scheduled",
      "Customer not interested",
      "Call completed",
      "Waiting for response",
      "Contract sent",
    ][Math.floor(Math.random() * 5)],

    callback_date: randomDate(),
    created_date: randomDate(),

    lead_type_sidago: pickRandom(TYPE),
    lead_type_benton: pickRandom(TYPE),
  }));
