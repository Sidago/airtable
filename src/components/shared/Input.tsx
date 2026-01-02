"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { ChangeEvent, FocusEvent, ReactNode, useState } from "react";

type ValidationRule =
  | { type: "required"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "pattern"; value: RegExp; message?: string }
  | {
      type: "custom";
      validator: (value: string) => boolean | Promise<boolean>;
      message: string;
    };

interface InputProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /* Label */
  label?: string | ReactNode;
  labelClassName?: string;
  labelWrapperClassName?: string;

  /* Field */
  as?: "input" | "textarea";
  type?: "text" | "password";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  /* Icons */
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;

  /* Password */
  enablePasswordToggle?: boolean;

  /* Validation */
  rules?: ValidationRule[];
  validateOn?: "change" | "blur";
  showError?: boolean;

  /* Styling */
  wrapperClassName?: string;
  fieldWrapperClassName?: string;
  inputClassName?: string;
  textareaClassName?: string;
  iconClassName?: string;
  errorClassName?: string;

  rows?: number;
}

export default function Input({
  name,
  value,
  defaultValue,
  onChange,
  onBlur,

  label,
  labelClassName = "text-xs font-semibold",
  labelWrapperClassName,

  as = "input",
  type = "text",
  placeholder,
  disabled,
  readOnly,
  required=false,

  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,

  enablePasswordToggle = false,

  rules = [],
  validateOn = "blur",
  showError = true,

  wrapperClassName = "",
  fieldWrapperClassName = "",
  inputClassName = "w-full border border-gray-200 rounded px-2 py-0.5 outline-0 focus:border-blue-400",
  textareaClassName = "",
  iconClassName = "",
  errorClassName = "text-xs font-normal text-red-400 py-2",

  rows = 4,
}: InputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const actualType = type === "password" && showPassword ? "text" : type;

  const validate = async (val: string) => {
    for (const rule of rules) {
      if (rule.type === "required" && !val) {
        setError(rule.message || "This field is required");
        return false;
      }
      if (rule.type === "minLength" && val.length < rule.value) {
        setError(rule.message || `Minimum ${rule.value} characters`);
        return false;
      }
      if (rule.type === "maxLength" && val.length > rule.value) {
        setError(rule.message || `Maximum ${rule.value} characters`);
        return false;
      }
      if (rule.type === "pattern" && !rule.value.test(val)) {
        setError(rule.message || "Invalid format");
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;

    if (value === undefined) setInternalValue(val);

    onChange?.(val);

    if (validateOn === "change") {
      validate(val);
    }
  };

  const handleBlur = async (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (validateOn === "blur") {
      await validate(currentValue);
    }
    onBlur?.(e);
  };

  return (
    <div className={wrapperClassName}>
      {label && (
        <div className={labelWrapperClassName}>
          <label className={labelClassName}>{label} {required && <span className="text-red-400">*</span>}</label>
        </div>
      )}

      <div className={`relative flex items-center ${fieldWrapperClassName}`}>
        {leftIcon && (
          <span
            onClick={onLeftIconClick}
            className={`absolute left-3 cursor-pointer ${iconClassName}`}
          >
            {leftIcon}
          </span>
        )}

        {as === "textarea" ? (
          <textarea
            name={name}
            rows={rows}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            onBlur={handleBlur}
            className={textareaClassName}
          />
        ) : (
          <input
            name={name}
            type={actualType}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName}
          />
        )}

        {(rightIcon || (type === "password" && enablePasswordToggle)) && (
          <span
            onClick={
              type === "password" && enablePasswordToggle
                ? () => setShowPassword((s) => !s)
                : onRightIconClick
            }
            className={`absolute right-3 cursor-pointer ${iconClassName}`}
          >
            {type === "password" && enablePasswordToggle ? (
              showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )
            ) : (
              rightIcon
            )}
          </span>
        )}
      </div>

      {showError && error && <p className={errorClassName}>{error}</p>}
    </div>
  );
}
