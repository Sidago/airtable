import React from "react";
import Header from "./Header";
import SearchArea from "./SearchArea";
import Menu from "./Menu";
import { MenuProps } from "@/types/menu.calllog";
import Badge from "@/components/shared/Badge";

export default function Sidebar() {
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
      <Header />
      <SearchArea />
      <div className="flex-1 overflow-y-auto">
        {MENUS.map((menu, idx) => (
          <Menu key={idx} {...menu} />
        ))}
      </div>
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
<Badge standalone count="Hot" color="bg-red-500" textColor="text-white" />

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
