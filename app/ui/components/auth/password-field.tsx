"use client";

import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldInputProps } from "formik";

interface PasswordFieldProps {
  id: string;
  label: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
   field: FieldInputProps<string>;
  disabled?: boolean;
}

export function PasswordField({
  id,
  label,
  error,
  touched,
  field,
  disabled,
  placeholder,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          className={`peer block w-full rounded-md border py-3 pl-10 outline 
            placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-primary transition-colors
            ${error && touched ? "border-red-500" : "border-cardBg"}`}
        />
        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
        >
          {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
      {error && touched && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
