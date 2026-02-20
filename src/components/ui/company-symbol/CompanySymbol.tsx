"use client";
import Badge from "@/components/shared/Badge";
import React from "react";

interface CompanySymbolProps {
  label: string;
  index: number;
}

// 20 Tailwind background colors
const COLOR_LIST: string[] = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-lime-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-slate-500",
  "bg-zinc-500",
  "bg-gray-600",
];

export default function CompanySymbol({
  label,
  index,
}: CompanySymbolProps) {
  // Ensure index starts from 1 correctly
  const colorIndex = (index - 1) % COLOR_LIST.length;
  const bgColor = COLOR_LIST[colorIndex];

  return (
    <Badge>
      <span
        className={`${bgColor} text-white text-xs font-semibold px-2.5 py-0.5 rounded-2xl`}
      >
        {label}
      </span>
    </Badge>
  );
}
