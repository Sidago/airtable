"use client";
import Badge from "@/components/shared/Badge";
import React from "react";

interface ContactTypeProps {
  label: string;
}

const CONTACT_TYPE_COLOR_MAP: Record<string, string> = {
  prospecting: "bg-amber-500",
  validated: "bg-green-500",
};

export default function ContactType({ label }: ContactTypeProps) {
  if (!label) return null;
  const color = CONTACT_TYPE_COLOR_MAP[label.toLowerCase()] || "bg-gray-500";

  return (
    <Badge>
      <span className={`${color} text-white text-xs px-2 py-0.5 rounded-2xl`}>
        {label}
      </span>
    </Badge>
  );
}
