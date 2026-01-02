"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

const BREADCRUMBS = [
  { label: "Tom Silver", active: false },
  { label: "Dashboard", active: true },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {BREADCRUMBS.map((crumb, index) => {
          const isLast = index === BREADCRUMBS.length - 1;

          return (
            <React.Fragment key={index}>
              <p
                className={`text-sm ${
                  crumb.active ? "font-semibold text-gray-900" : "text-gray-500"
                }`}
              >
                {crumb.label}
              </p>

              {/* Only show icon if it's not the last breadcrumb */}
              {!isLast && (
                <ChevronRight size={16} className="text-gray-400 mx-2" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
