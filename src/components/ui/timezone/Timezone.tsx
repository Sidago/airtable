"use client";
import Badge from "@/components/shared/Badge";
import React from "react";

interface TimezoneProps {
  label: string;
}

const TIMEZONE_COLOR_MAP: Record<string, string> = {
  "1 - EST": "bg-amber-500",
  "2 - CST": "bg-green-500",
  "3 - MST": "bg-blue-500",
  "4 - PST": "bg-purple-500",
};

export default function Timezone({ label }: TimezoneProps) {
  const color = TIMEZONE_COLOR_MAP[label] || "bg-gray-500";

  return (
    <Badge>
      <span className={`${color} text-white text-xs px-2 py-0.5 rounded-2xl`}>
        {label}
      </span>
    </Badge>
  );
}
