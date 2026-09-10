import { Star } from "lucide-react";

export function StarRating({ rating, reviews, size = 14 }: { rating: number; reviews?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={size} className="fill-amber-400 text-amber-500" />
      <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-sm text-slate-400">({reviews})</span>}
    </div>
  );
}
