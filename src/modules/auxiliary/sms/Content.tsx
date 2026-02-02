"use client";
import Image from "next/image";
import EmptyIlustration from "../../../../public/empty_illustration.svg";
import React, { ReactNode } from "react";
import Header from "@/components/shared/Header";

export default function Content() {
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);
  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "SMS", active: true },
        ]}
        groupBy={groupBy as string | null}
        onGroupByChange={(value) => setGroupBy(value as GroupKey)}
        options={groupOptions}
      />

      {/* Empty state */}
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="relative w-64 h-64">
          <Image
            src={EmptyIlustration}
            fill
            alt="Empty illustration"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

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
/* ======================
   Group Options
====================== */
type GroupKey = keyof Email | null;
const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Company Name", value: "full_name" },
  { label: "Timezone", value: "dead_email" },
];