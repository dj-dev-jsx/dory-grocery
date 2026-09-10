import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ProductImage } from "./ProductImage";
import { StarRating } from "./StarRating";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "../utils/format";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { getQuantity, addItem, setQuantity } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
    >
      <div className="relative">
        <ProductImage product={product} size="md" className="aspect-square w-full" />
        {product.isDeal && (
          <span className="absolute left-2 top-2 rounded-full bg-fresh-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
            Deal
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">{product.name}</h3>
        <p className="text-xs text-slate-400">{product.unit}</p>
        <StarRating rating={product.rating} size={13} />
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-base font-bold text-slate-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {quantity > 0 ? (
          <QuantitySelector size="sm" quantity={quantity} onChange={(q) => setQuantity(product.id, q)} removeAtMin />
        ) : (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              addItem(product.id);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fresh-600 text-white shadow-sm transition-colors hover:bg-fresh-700 active:bg-fresh-800"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
