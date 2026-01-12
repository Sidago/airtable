"use client";
import { RotateCcw, UserLock } from "lucide-react";
import React from "react";

interface FooterProps{
  clearForm: ()=>void
}

export default function Footer({clearForm}:FooterProps) {
  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200 p-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-1">
          <UserLock size={16} className="text-red-400" />
          <span className="text-xs font-normal">
            You don’t have permission to add new records.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-blue-400 cursor-pointer" onClick={clearForm}>
            <RotateCcw size={16} />
            <span className="text-xs font-normal">Clear form</span>
          </button>
          <button className="bg-gray-400 px-2 py-1 rounded text-xs text-white font-semibold cursor-pointer">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
