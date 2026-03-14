import React from "react";

interface FormInputProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  error,
  required = false,
  icon,
}: FormInputProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2.5 rounded-xl border transition-all outline-none text-sm text-gray-900
            ${icon ? "pl-10" : "pl-3"}
            ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}
            ${error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
          `}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}
