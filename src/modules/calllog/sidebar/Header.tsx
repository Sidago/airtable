"use client";
import { CirclePlus } from "lucide-react";
import React from "react";

interface HeaderProps {
  onClick: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  return (
    <div className="w-full p-4 border-b border-gray-200 flex justify-between items-center">
      <p className="text-base font-semibold">Lead</p>
      <button
        onClick={onClick}
        className="flex justify-center items-center cursor-pointer"
      >
        <CirclePlus className="text-gray-400" />
      </button>
    </div>
  );
}
