"use client";

import React, { ReactNode, useState } from "react";
import Header from "@/modules/auxiliary/components/Header";
import Table, { TableColumn } from "@/components/table/Table";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

interface Email {
  id: number;
  lead: ReactNode;
  full_name: string;
  email: ReactNode;
  priority: ReactNode;
  history: ReactNode;
  check_log: ReactNode;
  dead_email: ReactNode;
}

/* Priority Badges */
const PRIORITIES = [
  <Badge key="1">
    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-2xl">
      1st
    </span>
  </Badge>,
  <Badge key="2">
    <span className="bg-red-300 text-red-900 text-xs px-2 py-0.5 rounded-2xl">
      2nd
    </span>
  </Badge>,
];

/* Mock generators */
const FIRST_NAMES = ["John", "Emma", "Michael", "Sophia", "David", "Olivia"];
const LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor"];
const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const generateHistories = (): Email[] =>
  Array.from({ length: 20 }, (_, index) => {
    const name = `${rand(FIRST_NAMES)} ${rand(LAST_NAMES)}`;
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@${rand(DOMAINS)}`;

    return {
      id: index + 1,
      lead: <span className="font-medium">RFLX-{1000 + index}</span>,
      full_name: name,
      email: <Link className="text-blue-500 underline" href={`mailto:${email}`}>{email}</Link>,
      priority: rand(PRIORITIES),
      history: <span className="text-sm text-gray-600">Sent on 2024-12-16</span>,
      check_log: <CircleCheck size={20} className="text-gray-500" />,
      dead_email: <CircleCheck size={20} className="text-gray-500" />,
    };
  });

const columns: TableColumn<Email>[] = [
  { label: "Lead", key: "lead" },
  { label: "Full Name", key: "full_name" },
  { label: "Email", key: "email" },
  { label: "Priority", key: "priority" },
  { label: "History", key: "history" },
  { label: "Check Log", key: "check_log" },
  { label: "Dead Email", key: "dead_email" },
];

export default function Content() {
  const [data, setData] = useState<Email[] | null>(null);

  // Generate random data only on client
  React.useEffect(() => {
    setData(generateHistories());
  }, []);

  if (!data) return null; // or a loading spinner

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Email", active: true },
        ]}
      />

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