import React, { useState, ReactNode } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label?: string | ReactNode;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  datePickerClassName?: string;
}

export default function DateInput({
  label,
  labelClassName = "text-xs font-semibold mt-1 mb-1",
  required = false,
  containerClassName = "flex flex-col",
  datePickerClassName = "w-full border border-gray-200 rounded outline-0 px-2 py-0.5",
}: DateInputProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className={containerClassName}>
      {label && (
        <label className={labelClassName}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        className={datePickerClassName}
      />
    </div>
  );
}
