"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDown, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import clsx from "clsx";

export interface DropdownItem {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface DropdownProps {
  label?: React.ReactNode;
  value?: string | number;
  onChange?: (value: string | number) => void;

  items?: DropdownItem[];
  divider?: "all" | "even" | "odd" | "none";

  buttonClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  icon?: React.ReactNode;

  /** NEW */
  search?: boolean;
}

export default function Dropdown({
  label = "Select",
  items = [],
  value,
  onChange,
  divider = "none",
  buttonClassName,
  menuClassName,
  itemClassName,
  icon,
  search = false,
}: DropdownProps) {
  const [query, setQuery] = useState("");

  const selectedItem = items.find((i) => i.value === value);

  const filteredItems = useMemo(() => {
    if (!search || !query) return items;

    return items.filter((item) =>
      typeof item.label === "string"
        ? item.label.toLowerCase().includes(query.toLowerCase())
        : true
    );
  }, [items, query, search]);

  const shouldRenderDivider = (index: number, length: number) => {
    if (index === length - 1) return false;
    switch (divider) {
      case "all":
        return true;
      case "even":
        return index % 2 === 0;
      case "odd":
        return index % 2 !== 0;
      default:
        return false;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full outline-0">
      <MenuButton
        className={clsx(
          "w-full inline-flex justify-between items-center gap-2 rounded-md py-1.5 text-sm font-semibold cursor-pointer outline-0",
          buttonClassName
        )}
      >
        {selectedItem?.label || label}
        {icon || <ChevronDown className="w-4 h-4" />}
      </MenuButton>

      <MenuItems
        className={clsx(
          "absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg p-1 text-sm outline-0",
          menuClassName
        )}
      >
        {search && (
          <div className="px-2 py-1">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-md border border-gray-100 px-8 py-1.5 text-sm font-normal outline-none"
              />
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="px-3 py-2 text-sm text-gray-400">
            No results found
          </div>
        )}

        {filteredItems.map((item, idx) => (
          <React.Fragment key={item.value}>
            <MenuItem disabled={item.disabled}>
              {({ disabled }) => (
                <button
                  type="button"
                  onClick={() => onChange?.(item.value)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded px-3 py-1.5 text-left cursor-pointer",
                    "data-[headlessui-state=active]:bg-gray-100",
                    itemClassName,
                    item.className,
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {item.label}
                </button>
              )}
            </MenuItem>

            {shouldRenderDivider(idx, filteredItems.length) && (
              <div className="my-1 h-px bg-gray-200/50" />
            )}
          </React.Fragment>
        ))}
      </MenuItems>
    </Menu>
  );
}
