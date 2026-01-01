"use client";
import { ChevronDown, ChevronUp, Link, Printer, X } from "lucide-react";

export default function Header({ scrolled, label }: { scrolled: boolean, label:string }) {
  return (
    <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <ChevronUp size="14" />
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <ChevronDown size="14" />
          </button>
        </div>
        {scrolled && <div className="text-base font-semibold">{label}</div>}
      </div>
      <div className="flex items-center gap-1">
        <button className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Printer size={14} />
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Link size={14} />
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
