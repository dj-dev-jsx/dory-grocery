import { useState } from "react";
import { ImageOff } from "lucide-react";
import { getCategory } from "../data/categories";
import type { Product } from "../types";

const fallbackIconSize = {
  sm: 18,
  md: 28,
  lg: 40,
} as const;

export function ProductImage({
  product,
  size = "md",
  className = "",
}: {
  product: Product;
  size?: keyof typeof fallbackIconSize;
  className?: string;
}) {
  const category = getCategory(product.category);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl ${category?.color ?? "bg-slate-100"} ${className}`}
    >
      {errored ? (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <ImageOff size={fallbackIconSize[size]} />
        </div>
      ) : (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
