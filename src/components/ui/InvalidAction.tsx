import { TriangleAlert } from "lucide-react";
import React from "react";

export default function InvalidAction({ label }: { label: string }) {
  return (
    <div className="w-full flex items-center justify-center gap-2 border border-slate-300 rounded-md py-2 px-4 text-xs text-gray-400 font-medium hover:bg-slate-50 transition-colors shadow-sm cursor-not-allowed">
      <TriangleAlert size={16} className="text-slate-400" />
      {label}
    </div>
  );
}
