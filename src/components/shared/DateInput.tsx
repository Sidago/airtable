import React, { ReactNode } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label?: string | ReactNode;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  datePickerClassName?: string;

  // Controlled props
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function DateInput({
  label,
  labelClassName = "text-xs font-semibold mt-1 mb-1",
  required = false,
  containerClassName = "flex flex-col",
  datePickerClassName = "w-full border border-gray-200 rounded outline-0 px-2 py-0.5",
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className={labelClassName}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <DatePicker
        selected={value ?? null} // use controlled value
        onChange={onChange} // call parent handler
        className={datePickerClassName}
      />
    </div>
  );
}
