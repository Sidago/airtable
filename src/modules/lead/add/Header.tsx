import { X } from "lucide-react";
import React from "react";

export default function Header({onClose}:{onClose:()=>void}) {
  return (
    <div className="sticky top-0 z-30 p-4 bg-white border-b border-gray-200 flex justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <p className="text-xl">Add a Lead</p>
        <button onClick={onClose} className="w-6 h-6 rounded flex justify-center items-center cursor-pointer hover:bg-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
