import { Search } from "lucide-react";
import React from "react";

export default function SearchArea() {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex items-center gap-2 bg-white focus-within:bg-gray-100 transition px-4 py-1.5">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search.."
          className="w-full bg-transparent outline-none text-xs"
        />
      </div>
    </div>
  );
}
