import { Search } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface SearchAreaProps {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number; // optional debounce time in ms
}

export default function SearchArea({
  value,
  onChange,
  debounceTime = 300,
}: SearchAreaProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceTime);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex items-center gap-2 bg-white focus-within:bg-gray-100 transition px-4 py-1.5 rounded-md">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          className="w-full bg-transparent outline-none text-xs"
        />
      </div>
    </div>
  );
}
