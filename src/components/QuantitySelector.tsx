import { Minus, Plus, Trash2 } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
  min?: number;
  /** show a trash icon instead of "-" when quantity would drop to 0 */
  removeAtMin?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  size = "md",
  min = 0,
  removeAtMin = false,
}: QuantitySelectorProps) {
  const isSmall = size === "sm";
  const showTrash = removeAtMin && quantity <= min + 1;

  return (
    <div
      className={`inline-flex items-center rounded-full border border-fresh-200 bg-white ${
        isSmall ? "h-8" : "h-11"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label={showTrash ? "Remove item" : "Decrease quantity"}
        onClick={() => onChange(quantity - 1)}
        className={`flex items-center justify-center rounded-full text-fresh-700 transition-colors hover:bg-fresh-50 active:bg-fresh-100 ${
          isSmall ? "h-8 w-8" : "h-11 w-11"
        }`}
      >
        {showTrash ? <Trash2 size={isSmall ? 14 : 16} /> : <Minus size={isSmall ? 14 : 16} />}
      </button>
      <span className={`min-w-[1.5rem] text-center font-semibold text-slate-800 ${isSmall ? "text-sm" : "text-base"}`}>
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className={`flex items-center justify-center rounded-full text-fresh-700 transition-colors hover:bg-fresh-50 active:bg-fresh-100 ${
          isSmall ? "h-8 w-8" : "h-11 w-11"
        }`}
      >
        <Plus size={isSmall ? 14 : 16} />
      </button>
    </div>
  );
}
