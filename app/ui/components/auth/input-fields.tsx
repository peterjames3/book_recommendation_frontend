"use client";

import { LucideIcon } from "lucide-react";
import { FieldInputProps } from "formik";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  icon: LucideIcon;
  error?: string;
  placeholder?: string;
  touched?: boolean;
  field: FieldInputProps<string>;
}

export function InputField({
  id,
  label,
  type = "text",
  icon: Icon,
  error,
  touched,
  field,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 mt-5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          id={id}
          placeholder={placeholder}
          type={type}
          className={`peer block w-full rounded-md border py-3 pl-10 outline 
            placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-primary transition-colors
            ${error && touched ? "border-red-500" : "border-cardBg"}`}
        />
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
      </div>
      {error && touched && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
