import { Clock, MapPin, Wallet } from "lucide-react";
import type { PlacedOrder } from "../types";
import { formatPrice } from "../utils/format";

export function OrderReceiptCard({ order }: { order: PlacedOrder }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:p-6">
      {order.storeName && (
        <p className="mb-4 text-xs text-slate-400">
          Fulfilled by <span className="font-semibold text-slate-600">{order.storeName}</span>
        </p>
      )}
      <div className="grid gap-4 border-b border-slate-100 pb-4 md:grid-cols-3">
        <div className="flex items-start gap-2">
          <Clock size={16} className="mt-0.5 shrink-0 text-fresh-600" />
          <div>
            <p className="text-xs text-slate-400">Estimated delivery</p>
            <p className="text-sm font-medium text-slate-700">{order.slotLabel}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0 text-fresh-600" />
          <div>
            <p className="text-xs text-slate-400">Delivering to</p>
            <p className="text-sm font-medium text-slate-700">{order.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Wallet size={16} className="mt-0.5 shrink-0 text-fresh-600" />
          <div>
            <p className="text-xs text-slate-400">Payment</p>
            <p className="text-sm font-medium text-slate-700">{order.paymentLabel}</p>
          </div>
        </div>
      </div>

      <div className="py-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          {order.items.length} {order.items.length === 1 ? "item" : "items"}
        </h2>
        <ul className="space-y-2">
          {order.items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                {quantity} × {product.name}
              </span>
              <span className="font-medium text-slate-800">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-700">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Delivery fee</span>
          <span className="text-slate-700">{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-bold text-slate-900">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
