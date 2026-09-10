import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../components/Button";
import { OrderReceiptCard } from "../components/OrderReceiptCard";
import type { PlacedOrder } from "../types";

export function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as { order?: PlacedOrder } | null)?.order;

  useEffect(() => {
    if (!order) navigate("/", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <div className="animate-slide-up flex flex-col items-center text-center">
        <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-fresh-100">
          <CheckCircle2 size={44} className="text-fresh-600" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900 md:text-3xl">Order placed!</h1>
        <p className="mt-2 text-sm text-slate-500">
          Thanks for shopping with Dory Grocery. We're getting your order ready.
        </p>
        <p className="mt-4 rounded-full bg-fresh-100 px-4 py-1.5 text-sm font-semibold text-fresh-700">
          Order #{order.orderNumber}
        </p>
      </div>

      <div className="mt-8">
        <OrderReceiptCard order={order} />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button variant="secondary" fullWidth size="lg" onClick={() => navigate("/orders")}>
          View My Orders
        </Button>
        <Button fullWidth size="lg" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
