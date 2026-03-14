import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: string;
}

export function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, color = 'indigo' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={clsx("p-3 rounded-full", `bg-${color}-50 text-${color}-600`)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <div className={clsx(
            "flex items-center text-sm font-medium",
            changeType === 'positive' ? "text-green-600" : changeType === 'negative' ? "text-red-600" : "text-gray-600"
          )}>
            <span>{change}</span>
            <span className="ml-2 text-gray-400">vs last month</span>
          </div>
        </div>
      )}
    </div>
  );
}
