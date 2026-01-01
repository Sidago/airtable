import { CirclePlus } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="w-full p-4 border-b border-gray-200 flex justify-between items-center">
      <p className="text-base font-semibold">Lead</p>
      <button className="flex justify-center items-centercursor-pointer">
        <CirclePlus  className="text-gray-400" />
      </button>
    </div>
  );
}
