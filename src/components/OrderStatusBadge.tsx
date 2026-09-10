import type { OrderStatus } from "../types";

const statusStyles: Record<OrderStatus, { label: string; className: string }> = {
  preparing: { label: "Preparing", className: "bg-amber-100 text-amber-700" },
  "out-for-delivery": { label: "Out for Delivery", className: "bg-sky-100 text-sky-700" },
  delivered: { label: "Delivered", className: "bg-fresh-100 text-fresh-700" },
  cancelled: { label: "Cancelled", className: "bg-rose-100 text-rose-600" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = statusStyles[status];
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
