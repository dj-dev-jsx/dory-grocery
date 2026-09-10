import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/Button";
import { OrderSummary } from "../components/OrderSummary";
import { deliverySlots, mockAddresses, paymentMethods } from "../data/checkoutOptions";
import { saveOrder } from "../data/orders";
import { computeDeliveryFee } from "../utils/delivery";
import { formatPrice } from "../utils/format";
import type { PlacedOrder } from "../types";

function generateOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DG-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${random}`;
}

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}

function SelectableCard({ selected, onClick, title, subtitle }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors ${
        selected ? "border-fresh-500 bg-fresh-50" : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-fresh-600 bg-fresh-600 text-white" : "border-slate-300"
        }`}
      >
        {selected && <Check size={12} />}
      </span>
    </button>
  );
}

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { store } = useStore();
  const navigate = useNavigate();

  const [addressId, setAddressId] = useState(mockAddresses[0].id);
  const [slotId, setSlotId] = useState(deliverySlots[1].id);
  const [paymentId, setPaymentId] = useState(paymentMethods[0].id);
  const [placing, setPlacing] = useState(false);

  const address = mockAddresses.find((a) => a.id === addressId)!;
  const slot = deliverySlots.find((s) => s.id === slotId)!;
  const payment = paymentMethods.find((p) => p.id === paymentId)!;

  const deliveryFee = useMemo(() => computeDeliveryFee(subtotal, slotId), [subtotal, slotId]);

  if (items.length === 0 || !store) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">Your cart is empty</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setPlacing(true);
    const order: PlacedOrder = {
      orderNumber: generateOrderNumber(),
      items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      address: `${address.label} — ${address.detail}`,
      slotLabel: slot.label,
      paymentLabel: payment.label,
      placedAt: new Date().toISOString(),
      status: "preparing",
      storeId: store.id,
      storeName: store.name,
    };

    setTimeout(() => {
      saveOrder(order);
      clearCart();
      navigate("/confirmation", { state: { order } });
    }, 600);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-44 pt-6 md:px-6 md:pb-12 md:pt-8">
      <h1 className="text-xl font-extrabold text-slate-900 md:text-2xl">Checkout</h1>
      <p className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
        Ordering from <span className={`h-2 w-2 rounded-full ${store.color}`} />
        <span className="font-semibold text-slate-700">{store.name}</span>
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <section>
            <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
              <MapPin size={16} className="text-fresh-600" /> Delivery Address
            </h2>
            <div className="space-y-2">
              {mockAddresses.map((a) => (
                <SelectableCard
                  key={a.id}
                  selected={addressId === a.id}
                  onClick={() => setAddressId(a.id)}
                  title={a.label}
                  subtitle={a.detail}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Delivery Time</h2>
            <div className="space-y-2">
              {deliverySlots.map((s) => (
                <SelectableCard
                  key={s.id}
                  selected={slotId === s.id}
                  onClick={() => setSlotId(s.id)}
                  title={s.label}
                  subtitle={s.sublabel}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map((p) => (
                <SelectableCard
                  key={p.id}
                  selected={paymentId === p.id}
                  onClick={() => setPaymentId(p.id)}
                  title={p.label}
                  subtitle={p.sublabel}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="hidden flex-col gap-4 md:flex">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              {items.length} {items.length === 1 ? "item" : "items"}
            </h3>
            <ul className="space-y-1 text-sm text-slate-500">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between">
                  <span className="line-clamp-1 pr-2">
                    {quantity} × {product.name}
                  </span>
                  <span className="shrink-0 text-slate-700">{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
          <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} />
          <Button size="lg" onClick={handlePlaceOrder} disabled={placing}>
            {placing ? "Placing order..." : `Place Order · ${formatPrice(subtotal + deliveryFee)}`}
          </Button>
        </div>
      </div>

      {/* Mobile sticky place order bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-100 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">Total</span>
          <span className="font-bold text-slate-900">{formatPrice(subtotal + deliveryFee)}</span>
        </div>
        <Button fullWidth size="lg" onClick={handlePlaceOrder} disabled={placing}>
          {placing ? "Placing order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
