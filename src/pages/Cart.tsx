import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartItemRow } from "../components/CartItemRow";
import { OrderSummary } from "../components/OrderSummary";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/Button";
import { formatPrice } from "../utils/format";
import { computeDeliveryFee } from "../utils/delivery";
import { FREE_DELIVERY_THRESHOLD } from "../data/checkoutOptions";

export function Cart() {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start shopping to fill it up with fresh groceries."
          action={<Button onClick={() => navigate("/products")}>Start Shopping</Button>}
        />
      </div>
    );
  }

  const deliveryFee = computeDeliveryFee(subtotal, "standard");
  const remainingForFree = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-44 pt-6 md:px-6 md:pb-12 md:pt-8">
      <h1 className="mb-5 text-xl font-extrabold text-slate-900 md:text-2xl">Your Cart</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:col-span-2">
          {items.map(({ product, quantity }) => (
            <CartItemRow key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="hidden flex-col gap-4 md:flex">
          {remainingForFree > 0 && (
            <p className="rounded-xl bg-fresh-50 px-3 py-2 text-xs font-medium text-fresh-700">
              Add {formatPrice(remainingForFree)} more for free delivery!
            </p>
          )}
          <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} />
          <Button size="lg" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-100 bg-white/95 p-3 backdrop-blur md:hidden">
        {remainingForFree > 0 && (
          <p className="mb-2 text-center text-xs font-medium text-fresh-700">
            Add {formatPrice(remainingForFree)} more for free delivery!
          </p>
        )}
        <Button fullWidth size="lg" onClick={() => navigate("/checkout")}>
          Checkout · {formatPrice(subtotal + deliveryFee)}
        </Button>
      </div>
    </div>
  );
}
