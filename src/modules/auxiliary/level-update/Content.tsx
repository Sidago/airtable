/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Table, { TableColumn } from "@/components/table/Table";
import React, { ReactNode, useState } from "react";
import Badge from "@/components/shared/Badge";
import { ChevronDown, CircleCheck, Plus } from "lucide-react";
import Header from "@/components/shared/Header";

import AddLeadHeader from "@/modules/lead/components/add/Header";
import AddLeadFooter from "@/modules/lead/components/add/Footer";
import dynamic from "next/dynamic";
import DateInput from "@/components/shared/DateInput";

const Drawer = dynamic(() => import("@/components/shared/Drawer"), {
  ssr: false,
});
const Input = dynamic(() => import("@/components/shared/Input"), {
  ssr: false,
});
const Select = dynamic(() => import("@/components/shared/Select"), {
  ssr: false,
});

const DEFAULT_FORM = {
  name: "",
  role: "",
  company: "",
  phone: "",
  email: "",
  followUpDate: null as Date | null,
  assignedTo: "",
  leadType: "",
  contactType: "",
  dateBecameHot: null as Date | null,
};

export default function Content() {
  const [data, setData] = React.useState<History[]>([]);
  const [groupBy, setGroupBy] = React.useState<GroupKey>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(DEFAULT_FORM);

  const handleDrawerClose = () => {
    setDrawer(false);
    setFormValues(DEFAULT_FORM); // reset form
  };

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    setData(generateHistories());
  }, []);

  return (
    <div>
      <Header
        breadcrumbs={[
          { label: "Auxiliary Staff", active: false },
          { label: "Level 2 Update", active: true },
        ]}
        csvExport={true}
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
        <div className="px-5 text-sm">
          <button onClick={() => setDrawer(true)} className="cursor-pointer">
            <Plus size={14} className="inline mr-2" />
            Add Lead
          </button>
        </div>
      </div>
      <Drawer
        width="w-2xl"
        height="h-full"
        isOpen={drawer}
        onClose={handleDrawerClose}
      >
        <div className="flex flex-col h-full">
          <AddLeadHeader onClose={handleDrawerClose} />
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <Input
                label="Name"
                type="text"
                iconClassName="text-gray-500"
                value={formValues.name}
                onChange={(v: string) => handleInputChange("name", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
                required
              />
              <Select
                label="Role"
                required
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                value={formValues.role}
                onChange={(v: string | string[]) =>
                  handleInputChange("role", Array.isArray(v) ? v[0] : v)
                }
                rules={[
                  {
                    type: "custom",
                    validator: (v) => v !== "inactive",
                    message: "Inactive not allowed",
                  },
                ]}
              />
              <Select
                label="Company"
                required
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                value={formValues.company}
                onChange={(v: string | string[]) =>
                  handleInputChange("company", Array.isArray(v) ? v[0] : v)
                }
                rules={[
                  {
                    type: "custom",
                    validator: (v) => v !== "inactive",
                    message: "Inactive not allowed",
                  },
                ]}
              />
              <Input
                label="Phone"
                required
                type="text"
                iconClassName="text-gray-500"
                value={formValues.phone}
                onChange={(v: string) => handleInputChange("phone", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 8 }]}
              />
              <Input
                label="Email"
                type="text"
                iconClassName="text-gray-500"
                value={formValues.email}
                onChange={(v: string) => handleInputChange("email", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 8 }]}
              />
              <DateInput
                label="Follow Up Date"
                value={formValues.followUpDate}
                onChange={(date) => handleInputChange("followUpDate", date)}
              />
            </div>

            <div>
              <p className="text-sm font-semibold mt-5 mb-5">
                Default Option - cannot be changed
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <Select
                  label="Assigned To"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  value={formValues.assignedTo}
                  onChange={(v) => handleInputChange("assignedTo", v)}
                  rules={[
                    {
                      type: "custom",
                      validator: (v) => v !== "inactive",
                      message: "Inactive not allowed",
                    },
                  ]}
                />
                <Select
                  label="Lead Type"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  value={formValues.leadType}
                  onChange={(v) => handleInputChange("leadType", v)}
                  rules={[
                    {
                      type: "custom",
                      validator: (v) => v !== "inactive",
                      message: "Inactive not allowed",
                    },
                  ]}
                />
                <Select
                  label="Contact Type"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  value={formValues.contactType}
                  onChange={(v) => handleInputChange("contactType", v)}
                  rules={[
                    {
                      type: "custom",
                      validator: (v) => v !== "inactive",
                      message: "Inactive not allowed",
                    },
                  ]}
                />
                <DateInput
                  label="Date Became Hot"
                  value={formValues.dateBecameHot}
                  onChange={(date) => handleInputChange("dateBecameHot", date)}
                />
              </div>
            </div>
          </div>
          <AddLeadFooter clearForm={() => setFormValues(DEFAULT_FORM)} />
        </div>
      </Drawer>
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
  lead_type_rm: ReactNode;
  log_result: ReactNode;
  delete: ReactNode;
}

/* ======================
   Group Options
====================== */
type GroupKey = keyof History | null;
const groupOptions: { label: string; value: GroupKey }[] = [
  { label: "Group", value: null },
  { label: "Company Name", value: "update_notes" },
  { label: "Timezone", value: "callback_date" },
];

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
  { key: "lead_type_rm", label: "Lead Type 95RM", width: 200 },
  { key: "log_result", label: "Log Result", width: 200 },
  { key: "delete", label: "Delete", width: 200 },
];

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
    lead_type_rm: pickRandom(TYPE),
    log_result: <CircleCheck size={20} className="text-green-500" />,
    delete: <CircleCheck size={20} className="text-green-500" />,
  }));
