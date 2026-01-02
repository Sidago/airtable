import Dropdown from "@/components/shared/Dropdown";
import { Funnel } from "lucide-react";
import React from "react";

export default function Heading() {
  return (
    <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center gap-4 px-10">
        <div>
          <Dropdown
            label="NASDAQ : FRPT - Mr. Christopher Kraus"
            buttonClassName="text-gray-950 font-normal!"
            menuClassName="w-80"
            // itemClassName="text-xs! font-normal!"
            search
            items={[
              {
                label: "NASDAQ : NAUT - Melissa Epperly",
                value: "all",
              },
              {
                label: "PDIV - Stephen Lumb",
                value: "record",
              },
            ]}
          />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <Dropdown
              label="All"
              buttonClassName="text-gray-950 font-normal!"
              items={[
                {
                  label: "All",
                  value: "all",
                },
                {
                  label: "Large Companies",
                  value: "large-companies",
                },
                {
                  label: "Exclude Canada",
                  value: "exclude-canada",
                },
              ]}
            />
            <Funnel size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
