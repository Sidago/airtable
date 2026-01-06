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
  lead_type: ReactNode;
  contact_type: ReactNode;
  email: ReactNode;
  blocked_email: ReactNode;
}

/* Mock generators */
const FIRST_NAMES = ["John", "Emma", "Michael", "Sophia", "David", "Olivia"];
const LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor"];
const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const generateHistories = (): Email[] =>
  Array.from({ length: 20 }, (_, index) => {
    const firstName = rand(FIRST_NAMES);
    const lastName = rand(LAST_NAMES);
    const domain = rand(DOMAINS);
    const emailAddress = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;

    return {
      id: index + 1,
      lead: <span className="font-medium">RFLX-{1000 + index}</span>,
      lead_type: (
        <Badge>
          <span className="bg-red-900 text-white text-xs px-2 py-0.5 rounded-2xl">
            Void
          </span>
        </Badge>
      ),
      contact_type: (
        <Badge>
          <span className="bg-amber-400 text-white text-xs px-2 py-0.5 rounded-2xl">
            Prospecting
          </span>
        </Badge>
      ),
      email: (
        <Link
          className="text-blue-500 underline"
          href={`mailto:${emailAddress}`}
        >
          {emailAddress}
        </Link>
      ),
      blocked_email: <CircleCheck size={20} className="text-green-500" />,
    };
  });

const columns: TableColumn<Email>[] = [
  { label: "Lead", key: "lead" },
  { label: "Lead Type", key: "lead_type" },
  { label: "Contact Type", key: "contact_type" },
  { label: "Email", key: "email" },
  { label: "Blocked Email", key: "blocked_email" },
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
          { label: "Blocked Email", active: true },
        ]}
      />

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
