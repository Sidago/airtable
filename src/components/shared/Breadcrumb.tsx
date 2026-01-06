"use client";

import { BreadcrumbProps } from "@/types/breadcrumb";
import { ChevronRight } from "lucide-react";
import React from "react";


export default function Breadcrumb({ items=[] }: BreadcrumbProps) {
  return (
      <div className="flex items-center">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;

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
  );
}
