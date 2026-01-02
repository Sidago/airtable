import Badge from "@/components/shared/Badge";
import { SubmenuItemProps } from "@/types/menu.calllog";
import React from "react";

export default function SubmenuItem({ label, badge }: SubmenuItemProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-200 last:border-0 last:mb-2 cursor-pointer">
      <p className="text-sm font-normal">{label}</p>
      <div className="pt-2">
        {badge &&
        typeof badge === "object" &&
        "label" in badge &&
        "bg" in badge &&
        "color" in badge ? (
          <Badge
            standalone
            count={badge.label}
            color={badge.bg}
            textColor={badge.color}
          />
        ) : (
          badge
        )}
      </div>
    </div>
  );
}
