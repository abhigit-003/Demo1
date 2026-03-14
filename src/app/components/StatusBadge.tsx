import { clsx } from 'clsx';

export function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    hidden: 'bg-gray-100 text-gray-800',
    out_of_stock: 'bg-red-100 text-red-800',
    pending_review: 'bg-yellow-100 text-yellow-800',
    open: 'bg-green-100 text-green-800',
    restricted: 'bg-orange-100 text-orange-800',
    closed: 'bg-red-100 text-red-800',
  };

  const label = status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
    )}>
      {label}
    </span>
  );
}
