import type { Store } from "../types";

interface StoreLogoProps {
  store: Store;
  size?: number;
  className?: string;
}

export function StoreLogo({ store, size = 40, className = "" }: StoreLogoProps) {
  if (store.logoUrl) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-slate-100 ${className}`}
        style={{ width: size, height: size }}
      >
        <img src={store.logoUrl} alt={store.name} className="h-full w-full object-contain" />
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl font-bold text-white ${store.color} ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32) }}
    >
      {store.logoLabel}
    </span>
  );
}
