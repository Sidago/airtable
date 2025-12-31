"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React from "react";
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
}: DropdownProps) {
  const selectedItem = items?.find((i) => i.value === value);

  const shouldRenderDivider = (index: number, length: number) => {
    if (!items) return false;
    if (index === length - 1) return false;
    switch (divider) {
      case "all":
        return true;
      case "even":
        return index % 2 === 0;
      case "odd":
        return index % 2 !== 0;
      case "none":
      default:
        return false;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <MenuButton
        className={clsx(
          "w-full inline-flex justify-between items-center gap-2 rounded-md py-1.5 text-sm font-semibold outline-none cursor-pointer",
          buttonClassName
        )}
      >
        {selectedItem?.label || label}
        {icon || <ChevronDown className="w-4 h-4" />}
      </MenuButton>

      {items.length > 0 && (
        <MenuItems
          className={clsx(
            "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg p-1 text-sm",
            menuClassName
          )}
        >
          {items &&
            items.map((item, idx) => (
              <React.Fragment key={item.value}>
                <MenuItem disabled={item.disabled}>
                  {({ disabled }) => (
                    <button
                      type="button"
                      onClick={() => onChange && onChange(item.value)}
                      className={clsx(
                        "group flex w-full items-center justify-start gap-2 rounded px-3 py-1.5 text-left cursor-pointer outline-0",
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
                {shouldRenderDivider(idx, items.length) && (
                  <div className="my-1 h-px bg-gray-200/50" />
                )}
              </React.Fragment>
            ))}
        </MenuItems>
      )}
    </Menu>
  );
}
