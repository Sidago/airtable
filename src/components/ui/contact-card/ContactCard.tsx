import React from "react";
import InfoRow from "../InfoRow";
import { ContactCardProps } from "@/types/contact.card";

export default function ContactCard({
  label,
  rows = [],
  onClick,
}: ContactCardProps) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-100 shadow rounded-md p-5 space-y-5 cursor-pointer hover:shadow-lg"
    >
      {typeof label === "string" ? (
        <div className="text-base font-semibold">
          NASDAQ : SMSI - William Smith
        </div>
      ) : (
        label
      )}
      {rows.map((row, idx) => {
        if (typeof row === "object") {
          return (
            <InfoRow
              key={idx}
              direction="column"
              label={row.label}
              value={row.value}
            />
          );
        }
        return row;
      })}
    </div>
  );
}
