import { useNavigate } from "react-router-dom";
import type { Category } from "../types";

export function CategoryCard({ category }: { category: Category }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(`/products?category=${category.id}`)}
      className="flex shrink-0 flex-col items-center gap-2 rounded-2xl p-1 text-center transition-transform active:scale-95"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/5 md:h-20 md:w-20 ${category.color}`}
      >
        <category.icon size={28} strokeWidth={1.5} fill="currentColor" className="text-slate-900 md:h-8 md:w-8" />
      </div>
      <span className="w-20 text-xs font-medium text-slate-700 md:text-sm">{category.name}</span>
    </button>
  );
}
