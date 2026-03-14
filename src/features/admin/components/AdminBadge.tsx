import React from "react";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'orange';
  icon?: React.ReactNode;
}

export default function AdminBadge({
  children,
  variant = 'gray',
  icon
}: AdminBadgeProps) {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-green-50 text-green-700 border-green-100",
    red: "bg-red-50 text-red-700 border-red-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${variants[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
