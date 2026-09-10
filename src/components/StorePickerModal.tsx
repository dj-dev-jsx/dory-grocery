import { ChevronRight, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { StoreLogo } from "./StoreLogo";

export function StorePickerModal() {
  const { pendingPick, resolvePick, cancelPick } = useStore();

  if (!pendingPick) return null;
  const { product, options } = pendingPick;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4"
      onClick={cancelPick}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+20px)] shadow-xl md:rounded-3xl md:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Choose a store</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {product.name} is carried by {options.length} stores — pick one to fulfill this order.
            </p>
          </div>
          <button
            type="button"
            aria-label="Cancel"
            onClick={cancelPick}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-80 space-y-2 overflow-y-auto">
          {options.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => resolvePick(s.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-fresh-300 hover:bg-fresh-50"
            >
              <StoreLogo store={s} size={40} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {s.branch} · {s.deliveryEta}
                </p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
