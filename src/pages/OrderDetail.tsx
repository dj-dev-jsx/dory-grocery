import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { getOrder } from "../data/orders";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { OrderReceiptCard } from "../components/OrderReceiptCard";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { Button } from "../components/Button";
import { formatDate } from "../utils/format";

export function OrderDetail() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { addItems } = useCart();
  const { selectStore } = useStore();
  const order = getOrder(orderNumber ?? "");

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">Order not found</p>
        <Button className="mt-4" onClick={() => navigate("/orders")}>
          Back to My Orders
        </Button>
      </div>
    );
  }

  const reorder = () => {
    if (order.storeId) selectStore(order.storeId);
    addItems(order.items.map(({ product, quantity }) => ({ productId: product.id, quantity })));
    navigate("/cart");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-12 pt-6 md:px-6 md:pt-8">
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} /> Back to My Orders
      </button>

      <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 md:text-2xl">{order.orderNumber}</h1>
          <p className="text-sm text-slate-500">Placed on {formatDate(order.placedAt)}</p>
        </div>
        <OrderStatusBadge status={order.status ?? "delivered"} />
      </div>

      <OrderReceiptCard order={order} />

      <Button fullWidth size="lg" className="mt-6" icon={<RotateCcw size={16} />} onClick={reorder}>
        Reorder These Items
      </Button>
    </div>
  );
}
