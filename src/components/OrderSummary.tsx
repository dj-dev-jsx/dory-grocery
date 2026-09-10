import { formatPrice } from "../utils/format";

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  freeDeliveryNote?: string;
}

export function OrderSummary({ subtotal, deliveryFee, freeDeliveryNote }: OrderSummaryProps) {
  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-700">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Delivery fee</span>
          <span className={deliveryFee === 0 ? "font-medium text-fresh-600" : "text-slate-700"}>
            {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
          </span>
        </div>
        {freeDeliveryNote && <p className="text-xs text-fresh-700">{freeDeliveryNote}</p>}
      </div>
      <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
