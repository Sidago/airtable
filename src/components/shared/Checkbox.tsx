"use client";

import React, { ChangeEvent, ReactNode, useState } from "react";

type ValidationRule =
  | { type: "required"; message?: string }
  | {
      type: "custom";
      validator: (value: boolean) => boolean | Promise<boolean>;
      message: string;
    };

export interface CheckboxProps {
  /* Value */
  name?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;

  /* Label */
  label?: string | ReactNode;
  labelPosition?: "top" | "right" | "bottom" | "left";
  labelClassName?: string;
  labelWrapperClassName?: string;

  /* Field */
  disabled?: boolean;
  required?: boolean;

  /* Validation */
  rules?: ValidationRule[];
  validateOn?: "change";
  showError?: boolean;

  /* Styling */
  wrapperClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
}

export default function Checkbox({
  name,
  value,
  defaultValue = false,
  onChange,

  label,
  labelPosition = "right",
  labelClassName = "text-xs font-semibold",
  labelWrapperClassName = "",

  disabled,
  required = false,

  rules = [],
  validateOn = "change",
  showError = true,

  wrapperClassName = "",
  checkboxClassName =
    "h-4 w-4 rounded border border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer",
  errorClassName = "text-xs font-normal text-red-400 mt-1",
}: CheckboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const currentValue = value !== undefined ? value : internalValue;

  /* ---------- Validation ---------- */
  const validate = async (val: boolean) => {
    for (const rule of rules) {
      if (rule.type === "required" && !val) {
        setError(rule.message || "This field is required");
        return false;
      }
      if (rule.type === "custom") {
        const ok = await rule.validator(val);
        if (!ok) {
          setError(rule.message);
          return false;
        }
      }
    }
    setError(null);
    return true;
  };

  /* ---------- Events ---------- */
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (value === undefined) {
      setInternalValue(checked);
    }

    onChange?.(checked);

    if (validateOn === "change") {
      await validate(checked);
    }
  };

  /* ---------- Layout ---------- */
  const layoutClass: Record<
    NonNullable<CheckboxProps["labelPosition"]>,
    string
  > = {
    top: "flex-col",
    bottom: "flex-col-reverse",
    left: "flex-row-reverse",
    right: "flex-row",
  };

  /* ---------- Render ---------- */
  return (
    <div className={wrapperClassName}>
      <label
        className={`inline-flex items-start gap-2 ${layoutClass[labelPosition]} ${labelWrapperClassName}`}
      >
        <input
          type="checkbox"
          name={name}
          checked={currentValue}
          disabled={disabled}
          onChange={handleChange}
          className={checkboxClassName}
        />

        {label && (
          <span className={labelClassName}>
            {label}
            {required && <span className="ml-1 text-red-400">*</span>}
          </span>
        )}
      </label>

      {showError && error && (
        <p className={errorClassName}>{error}</p>
      )}
    </div>
  );
}
