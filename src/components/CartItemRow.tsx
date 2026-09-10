import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { ProductImage } from "./ProductImage";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";

export function CartItemRow({ product, quantity }: { product: Product; quantity: number }) {
  const { setQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0">
      <button onClick={() => navigate(`/products/${product.id}`)} className="shrink-0">
        <ProductImage product={product} size="sm" className="h-16 w-16" />
      </button>

      <div className="min-w-0 flex-1">
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="line-clamp-1 text-left text-sm font-semibold text-slate-800"
        >
          {product.name}
        </button>
        <p className="text-xs text-slate-400">{product.unit}</p>
        <p className="mt-1 text-sm font-bold text-slate-900">{formatPrice(product.price)}</p>
      </div>

      <QuantitySelector size="sm" quantity={quantity} onChange={(q) => setQuantity(product.id, q)} removeAtMin />
    </div>
  );
}
