/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "./Header";
import SearchArea from "./SearchArea";
import Menu from "./Menu";
import { MenuProps } from "@/types/menu.calllog";
import Badge from "@/components/shared/Badge";
import AddLeadHeader from "@/modules/lead/components/add/Header";
import AddLeadFooter from "@/modules/lead/components/add/Footer";
import dynamic from "next/dynamic";
import DateInput from "@/components/shared/DateInput";
import { useLeadType } from "@/modules/lead/hooks/useLeadType";
import { useContactType } from "@/modules/lead/hooks/useContactType";
import useMenuTree from "@/modules/navigation/hooks/useMenuTree";
import { useAuthStore } from "@/modules/signin/store/auth.store";
import { leadService } from "@/modules/lead/services/lead.service";

const Drawer = dynamic(() => import("@/components/shared/Drawer"), {
  ssr: false,
});
const Input = dynamic(() => import("@/components/shared/Input"), {
  ssr: false,
});
const Select = dynamic(() => import("@/components/shared/Select"), {
  ssr: false,
});

interface Agent {
  id: number;
  username: string;
  [key: string]: any;
}

interface FormValues {
  full_name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  follow_up_date: Date | null;
  assigned_to: string;
  lead_type_id: string;
  contact_type_id: string;
  date_become_hot: Date | null;
  agent_id: number | null;
}

const DEFAULT_FORM: FormValues = {
  full_name: "",
  role: "",
  company: "",
  phone: "",
  email: "",
  follow_up_date: null as Date | null,
  assigned_to: "",
  lead_type_id: "",
  contact_type_id: "",
  date_become_hot: null as Date | null,
  agent_id: null as number | null,
};

export default function Sidebar() {
  const params = useParams();
  const agentUsername = params?.agent as string;
  // ✅ Get token from global store
  const token = useAuthStore((s) => s.tokens?.access_token);

  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [menus, setMenus] = useState<MenuProps[]>(MENUS);
  const [formValues, setFormValues] = useState(DEFAULT_FORM);

  const searchMenusByKeyword = (keyword: string) => {
    setSearchKey(keyword);
    if (!keyword) {
      setMenus(MENUS); // reset if empty
      return;
    }

    const lowerKeyword = keyword.toLowerCase();

    const filtered = MENUS.map((menu) => {
      if (!menu.children) return null;

      const filteredChildren = menu.children
        .map((child) => {
          if (!child.children) return null;

          const filteredGrandchildren = child.children.filter((grandchild) =>
            grandchild.label.toLowerCase().includes(lowerKeyword),
          );

          return filteredGrandchildren.length
            ? { ...child, children: filteredGrandchildren }
            : null;
        })
        .filter(Boolean) as typeof menu.children;

      return filteredChildren.length
        ? { ...menu, children: filteredChildren }
        : null;
    }).filter(Boolean) as typeof MENUS;

    setMenus(filtered);
  };

  const handleDrawerClose = () => {
    setDrawer(false);
    setFormValues(DEFAULT_FORM); // reset form
  };

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const { options: leadTypeOptions } = useLeadType();
  const { options: contactTypeOptions } = useContactType();
  const { rawAgentList } = useMenuTree() as { rawAgentList: Agent[] };

  useEffect(() => {
    if (!agentUsername || !rawAgentList?.length) return;

    const matchedAgent = rawAgentList.find(
      (agent: any) => agent.username === agentUsername,
    );

    if (matchedAgent) {
      // Schedule state update on next tick
      queueMicrotask(() => {
        setFormValues((prev) => ({
          ...prev,
          agent_id: matchedAgent.id as number,
        }));
      });
    }
  }, [agentUsername, rawAgentList]);

  const submitForm = async () => {
    if (!token) {
      console.warn("Cannot submit lead: no authentication token found");
      return;
    }
    console.log("Submitting form with values:", formValues);
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
      <Header onClick={() => setDrawer(true)} />
      <SearchArea value={searchKey} onChange={searchMenusByKeyword} />
      <div className="flex-1 overflow-y-auto">
        {menus.map((menu, idx) => (
          <Menu key={idx} {...menu} />
        ))}
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
                value={formValues.full_name}
                onChange={(v: string) => handleInputChange("full_name", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
                required
              />
              <Input
                label="Role"
                type="text"
                iconClassName="text-gray-500"
                value={formValues.role}
                onChange={(v: string) => handleInputChange("role", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
                required
              />
              <Input
                label="Company"
                type="text"
                iconClassName="text-gray-500"
                value={formValues.company}
                onChange={(v: string) => handleInputChange("company", v)}
                rules={[{ type: "required" }, { type: "minLength", value: 3 }]}
                required
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
              />
              <DateInput
                label="Follow Up Date"
                value={formValues.follow_up_date}
                onChange={(date) => handleInputChange("follow_up_date", date)}
              />
            </div>

            <div>
              <p className="text-sm font-semibold mt-5 mb-5">
                Default Option - cannot be changed
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <Input
                  label="Assigned To"
                  type="text"
                  iconClassName="text-gray-500"
                  value={formValues.assigned_to}
                  onChange={(v: string) => handleInputChange("assigned_to", v)}
                />
                <Select
                  label="Lead Type"
                  options={leadTypeOptions}
                  value={formValues.lead_type_id}
                  onChange={(v) => handleInputChange("lead_type_id", v)}
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
                  options={contactTypeOptions}
                  value={formValues.contact_type_id}
                  onChange={(v) => handleInputChange("contact_type_id", v)}
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
                  value={formValues.date_become_hot}
                  onChange={(date) =>
                    handleInputChange("date_become_hot", date)
                  }
                />
              </div>
            </div>
          </div>
          <AddLeadFooter
            submitForm={submitForm}
            clearForm={() => setFormValues(DEFAULT_FORM)}
            loading={loading}
          />
        </div>
      </Drawer>
    </div>
  );
}

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

const MENUS: MenuProps[] = [
  // 1st Menu
  {
    label: "Lead Type",
    badge: (
      <Badge standalone count="Hot" color="bg-red-500" textColor="text-white" />
    ),
    children: [
      {
        label: "Time Zone:",
        badge: TIMEZONEBADGE["1est"],
        children: [
          {
            label: "NASDAQ : FRPT - Mr. Christopher Kraus",
            badge: TIMEZONEBADGE["1est"],
          },
          { label: "NYSE : APPL - Mr. John Doe", badge: TIMEZONEBADGE["1est"] },
          {
            label: "DOW : MSFT - Ms. Jane Smith",
            badge: TIMEZONEBADGE["1est"],
          },
        ],
      },
      {
        label: "Time Zone:",
        badge: TIMEZONEBADGE["2est"],
        children: [
          {
            label: "NASDAQ : TSLA - Mr. Elon Musk",
            badge: TIMEZONEBADGE["2est"],
          },
          {
            label: "NYSE : IBM - Mr. Alan Turing",
            badge: TIMEZONEBADGE["2est"],
          },
          {
            label: "DOW : GOOG - Ms. Ada Lovelace",
            badge: TIMEZONEBADGE["2est"],
          },
        ],
      },
      {
        label: "Time Zone:",
        badge: TIMEZONEBADGE["3est"],
        children: [
          {
            label: "NASDAQ : AMZN - Mr. Jeff Bezos",
            badge: TIMEZONEBADGE["3est"],
          },
          {
            label: "NYSE : ORCL - Ms. Grace Hopper",
            badge: TIMEZONEBADGE["3est"],
          },
          {
            label: "DOW : FB - Mr. Mark Zuckerberg",
            badge: TIMEZONEBADGE["3est"],
          },
        ],
      },
      {
        label: "Time Zone:",
        badge: TIMEZONEBADGE["4est"],
        children: [
          {
            label: "NASDAQ : NFLX - Ms. Reed Hastings",
            badge: TIMEZONEBADGE["4est"],
          },
          {
            label: "NYSE : SAP - Mr. Bill McDermott",
            badge: TIMEZONEBADGE["4est"],
          },
          {
            label: "DOW : INTC - Ms. Pat Gelsinger",
            badge: TIMEZONEBADGE["4est"],
          },
        ],
      },
    ],
  },

  // 2nd Menu
  {
    label: "Customer Info",
    badge: (
      <Badge
        standalone
        count="New"
        color="bg-blue-500"
        textColor="text-white"
      />
    ),
    children: [
      {
        label: "Region:",
        badge: TIMEZONEBADGE["1est"],
        children: [
          { label: "USA : John Doe", badge: TIMEZONEBADGE["1est"] },
          { label: "Canada : Jane Smith", badge: TIMEZONEBADGE["1est"] },
          { label: "Mexico : Carlos M.", badge: TIMEZONEBADGE["1est"] },
        ],
      },
      {
        label: "Region:",
        badge: TIMEZONEBADGE["2est"],
        children: [
          { label: "UK : Alice Brown", badge: TIMEZONEBADGE["2est"] },
          { label: "Germany : Hans Müller", badge: TIMEZONEBADGE["2est"] },
          { label: "France : Pierre Dupont", badge: TIMEZONEBADGE["2est"] },
        ],
      },
      {
        label: "Region:",
        badge: TIMEZONEBADGE["3est"],
        children: [
          { label: "Japan : Yuki Tanaka", badge: TIMEZONEBADGE["3est"] },
          { label: "China : Li Wei", badge: TIMEZONEBADGE["3est"] },
          { label: "India : Raj Singh", badge: TIMEZONEBADGE["3est"] },
        ],
      },
    ],
  },

  // 3rd Menu
  {
    label: "Projects",
    badge: (
      <Badge
        standalone
        count="Active"
        color="bg-green-500"
        textColor="text-white"
      />
    ),
    children: [
      {
        label: "Project Type:",
        badge: TIMEZONEBADGE["1est"],
        children: [
          { label: "Website Redesign", badge: TIMEZONEBADGE["1est"] },
          { label: "Mobile App", badge: TIMEZONEBADGE["1est"] },
          { label: "CRM Integration", badge: TIMEZONEBADGE["1est"] },
        ],
      },
      {
        label: "Project Type:",
        badge: TIMEZONEBADGE["2est"],
        children: [
          { label: "ERP Implementation", badge: TIMEZONEBADGE["2est"] },
          { label: "Marketing Campaign", badge: TIMEZONEBADGE["2est"] },
          { label: "Data Migration", badge: TIMEZONEBADGE["2est"] },
        ],
      },
      {
        label: "Project Type:",
        badge: TIMEZONEBADGE["3est"],
        children: [
          { label: "Cloud Setup", badge: TIMEZONEBADGE["3est"] },
          { label: "Security Audit", badge: TIMEZONEBADGE["3est"] },
          { label: "Performance Optimization", badge: TIMEZONEBADGE["3est"] },
        ],
      },
    ],
  },

  // 4th Menu
  {
    label: "Reports",
    badge: (
      <Badge
        standalone
        count="Pending"
        color="bg-yellow-500"
        textColor="text-white"
      />
    ),
    children: [
      {
        label: "Report Type:",
        badge: TIMEZONEBADGE["1est"],
        children: [
          { label: "Sales Q1", badge: TIMEZONEBADGE["1est"] },
          { label: "Sales Q2", badge: TIMEZONEBADGE["1est"] },
          { label: "Sales Q3", badge: TIMEZONEBADGE["1est"] },
        ],
      },
      {
        label: "Report Type:",
        badge: TIMEZONEBADGE["2est"],
        children: [
          { label: "Marketing Q1", badge: TIMEZONEBADGE["2est"] },
          { label: "Marketing Q2", badge: TIMEZONEBADGE["2est"] },
          { label: "Marketing Q3", badge: TIMEZONEBADGE["2est"] },
        ],
      },
      {
        label: "Report Type:",
        badge: TIMEZONEBADGE["3est"],
        children: [
          { label: "Finance Q1", badge: TIMEZONEBADGE["3est"] },
          { label: "Finance Q2", badge: TIMEZONEBADGE["3est"] },
          { label: "Finance Q3", badge: TIMEZONEBADGE["3est"] },
        ],
      },
    ],
  },
];
