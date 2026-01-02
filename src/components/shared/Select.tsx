"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

type ValidationRule =
  | { type: "required"; message?: string }
  | {
      type: "custom";
      validator: (value: string | string[]) => boolean;
      message: string;
    };

interface OptionItem {
  label: string | ReactNode;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string | ReactNode;
  required?: boolean;

  options: OptionItem[];

  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;

  rules?: ValidationRule[];

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  wrapperClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  errorClassName?: string;
}

export default function Select({
  label,
  options,
  required = false,

  value,
  defaultValue,
  onChange,

  multiple = false,
  searchable = false,
  placeholder = "Select option",

  rules = [],

  leftIcon,
  rightIcon,

  wrapperClassName = "",
  labelClassName = "text-xs font-semibold",
  triggerClassName = "w-full text-sm font-normal border border-gray-200 rounded px-3 py-1 flex items-center justify-between cursor-pointer focus:border-blue-400",
  dropdownClassName = "absolute z-50 mt-1 bg-white border-0 rounded shadow",
  optionClassName = "px-2 py-1 text-sm font-normal cursor-pointer hover:bg-gray-100",
  errorClassName = "text-xs text-red-400 py-2",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(
    undefined
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? (multiple ? [] : "")
  );

  const currentValue = isControlled ? value! : internalValue;

  const filteredOptions = options.filter((opt) =>
    opt.label?.toString().toLowerCase().includes(search.toLowerCase())
  );

  const validate = (val: string | string[]) => {
    for (const rule of rules) {
      if (
        rule.type === "required" &&
        (!val || (Array.isArray(val) && val.length === 0))
      ) {
        setError(rule.message || "This field is required");
        return false;
      }
      if (rule.type === "custom" && !rule.validator(val)) {
        setError(rule.message);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const toggleValue = (val: string) => {
    let next;

    if (multiple) {
      next = Array.isArray(currentValue)
        ? currentValue.includes(val)
          ? currentValue.filter((v) => v !== val)
          : [...currentValue, val]
        : [val];
    } else {
      next = val;
      setOpen(false);
    }

    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    validate(next);
  };

  const displayValue = () => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.length ? currentValue.join(", ") : placeholder;
    }
    return options.find((o) => o.value === currentValue)?.label ?? placeholder;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Set dropdown width dynamically to match trigger width
  useEffect(() => {
    if (open && triggerRef.current) {
      setDropdownWidth(triggerRef.current.getBoundingClientRect().width);
    }
  }, [open]);

  return (
    <div className={wrapperClassName} ref={containerRef}>
      {label && <label className={labelClassName}>{label}{required && <span className="text-red-400">*</span>}</label>}

      {/* Trigger */}
      <div
        className={triggerClassName}
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2 truncate">
          {leftIcon}
          <span className="truncate">{displayValue()}</span>
        </div>
        {rightIcon}
      </div>

      {/* Dropdown */}
      {open && (
        <div className={dropdownClassName} style={{ width: dropdownWidth }}>
          {searchable && (
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border-b border-gray-200 outline-none"
            />
          )}

          <ul className="max-h-60 overflow-auto">
            {filteredOptions.map((opt) => {
              const selected = multiple
                ? Array.isArray(currentValue) &&
                  currentValue.includes(opt.value)
                : currentValue === opt.value;

              return (
                <li
                  key={opt.value}
                  onClick={() => !opt.disabled && toggleValue(opt.value)}
                  className={`${optionClassName} ${
                    selected ? "bg-blue-50 font-medium" : ""
                  } ${opt.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
}
