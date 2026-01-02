"use client";

import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: string; // Tailwind width/height e.g. "h-px", "w-px"
  color?: string; // Tailwind color e.g. "bg-gray-200"
  margin?: string; // Tailwind margin e.g. "my-4", "mx-2"
  className?: string;
}

export default function Divider({
  orientation = "horizontal",
  thickness,
  color = "bg-gray-200",
  margin,
  className = "",
}: DividerProps) {
  const style =
    orientation === "horizontal"
      ? `${thickness || "h-px"} w-full`
      : `${thickness || "w-px"} h-full`;

  return <div className={`${style} ${color} ${margin} ${className}`} />;
}
