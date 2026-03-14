import React from "react";
import { Loader2 } from "lucide-react";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function AdminButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconRight,
  className = '',
  disabled,
  ...props
}: AdminButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all rounded-xl disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
    success: "bg-green-50 text-green-600 hover:bg-green-100 border border-green-100",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
      {!isLoading && iconRight}
    </button>
  );
}
