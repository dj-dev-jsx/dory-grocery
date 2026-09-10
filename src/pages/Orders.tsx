import { useNavigate } from "react-router-dom";
import { PackageSearch, RotateCcw } from "lucide-react";
import { getAllOrders } from "../data/orders";
import { useCart } from "../context/CartContext";
import { ProductImage } from "../components/ProductImage";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { Button } from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { formatDate, formatPrice } from "../utils/format";
import type { PlacedOrder } from "../types";

function OrderCard({ order }: { order: PlacedOrder }) {
  const navigate = useNavigate();
  const { addItems } = useCart();
  const visibleItems = order.items.slice(0, 4);
  const extraCount = order.items.length - visibleItems.length;

  const reorder = () => {
    addItems(order.items.map(({ product, quantity }) => ({ productId: product.id, quantity })));
    navigate("/cart");
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-800">{order.orderNumber}</p>
          <p className="text-xs text-slate-400">{formatDate(order.placedAt)}</p>
        </div>
        <OrderStatusBadge status={order.status ?? "delivered"} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        {visibleItems.map(({ product }) => (
          <ProductImage key={product.id} product={product} size="sm" className="h-12 w-12 shrink-0" />
        ))}
        {extraCount > 0 && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xs font-semibold text-slate-500">
            +{extraCount}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div>
          <p className="text-xs text-slate-400">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </p>
          <p className="text-sm font-bold text-slate-900">{formatPrice(order.total)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<RotateCcw size={14} />} onClick={reorder}>
            Reorder
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/orders/${order.orderNumber}`)}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Orders() {
  const navigate = useNavigate();
  const orders = getAllOrders();

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <EmptyState
          icon={<PackageSearch size={28} />}
          title="No orders yet"
          description="Your past orders will show up here once you place one."
          action={<Button onClick={() => navigate("/products")}>Start Shopping</Button>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-12 pt-6 md:px-6 md:pt-8">
      <h1 className="mb-1 text-xl font-extrabold text-slate-900 md:text-2xl">My Orders</h1>
      <p className="mb-5 text-sm text-slate-500">Track recent deliveries and quickly reorder your favorites.</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.orderNumber} order={order} />
        ))}
      </div>
    </div>
  );
}
