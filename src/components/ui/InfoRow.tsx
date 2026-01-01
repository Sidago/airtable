"use client";

import React from "react";
import clsx from "clsx";
import { InfoRowProps } from "@/types/inforow";

export default function InfoRow({
  label,
  value,
  className,
  direction = "row",
  labelClassName,
  valueClassName,
}: InfoRowProps) {
  return (
    <div
      className={clsx(
        "w-full flex gap-2 text-xs",
        direction === "row" ? "items-center justify-between" : "flex-col",
        className
      )}
    >
      {typeof label === "string" ? (
        <span
          className={clsx(
            labelClassName || "text-gray-950 font-semibold whitespace-nowrap"
          )}
        >
          {label}
        </span>
      ) : (
        label
      )}

      <div
        className={clsx(valueClassName || "text-gray-900 font-medium truncate")}
      >
        {value}
      </div>
    </div>
  );
}
