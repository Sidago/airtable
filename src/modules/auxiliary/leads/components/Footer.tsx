"use client";
import { RotateCcw, UserLock } from "lucide-react";
import React from "react";

interface FooterProps {
  btnLabel?: string;
  clearForm: () => void;
  onClick: () => void;
  loading?: boolean;
}

export default function Footer({
  btnLabel = "Save",
  clearForm,
  onClick,
  loading = false,
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sticky bottom-0 md:static">
      <div className="w-full max-w-7xl mx-auto px-5 py-4 md:px-20 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        
        <div className="flex items-center gap-2">
          <UserLock size={16} className="text-red-400 shrink-0" />
          <span className="text-[11px] md:text-xs font-normal text-gray-600">
            You don’t have permission to add new records.
          </span>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6">
          
          <button
            onClick={clearForm}
            disabled={loading}
            className={`flex items-center gap-1.5 text-blue-500 transition-colors group
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600 cursor-pointer"}
            `}
          >
            <RotateCcw
              size={16}
              className="group-active:-rotate-45 transition-transform"
            />
            <span className="text-xs font-medium">Clear form</span>
          </button>

          <button
            onClick={onClick}
            disabled={loading}
            className={`px-6 py-2 rounded text-xs text-white font-semibold shadow-sm transition-colors active:scale-95
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
              }
            `}
          >
            {loading ? "Processing..." : btnLabel}
          </button>

        </div>
      </div>
    </footer>
  );
}
