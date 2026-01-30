import Badge from "@/components/shared/Badge";
import React from "react";

export default function Heading() {
  return (
    <div className="sticky top-3 z-30 p-4 bg-white border-b border-gray-200">
      <div className="text-base font-semibold flex items-center gap-4">
        NASDAQ : FRPT - Mr. Christopher Kraus
        <Badge>
          <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
            Prospecting
          </span>
        </Badge>
      </div>
    </div>
  );
}
