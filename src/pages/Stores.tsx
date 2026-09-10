import { useNavigate } from "react-router-dom";
import { Check, Clock, LayoutGrid, Star } from "lucide-react";
import { stores } from "../data/stores";
import { useStore } from "../context/StoreContext";
import { StoreLogo } from "../components/StoreLogo";

export function Stores() {
  const navigate = useNavigate();
  const { store: currentStore, selectStore, browseAll } = useStore();

  const choose = (id: string) => {
    selectStore(id);
    navigate("/products");
  };

  const chooseAll = () => {
    browseAll();
    navigate("/products");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-6 md:px-6 md:pt-8">
      <h1 className="mb-1 text-xl font-extrabold text-slate-900 md:text-2xl">Choose a Store</h1>
      <p className="mb-5 text-sm text-slate-500">
        Dory Grocery is a marketplace — pick the store you want to shop from, or browse everything and decide later.
        Your cart is scoped to one store at a time, since it's fulfilled by that store's delivery.
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        <button
          type="button"
          onClick={chooseAll}
          className={`relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-colors md:p-5 ${
            currentStore === null ? "border-fresh-500 bg-fresh-50" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          {currentStore === null && (
            <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-fresh-600 text-white">
              <Check size={12} />
            </span>
          )}
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <LayoutGrid size={24} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">All Stores</p>
            <p className="mt-0.5 text-xs text-slate-500">Browse everything, decide later</p>
          </div>
        </button>

        {stores.map((s) => {
          const selected = s.id === currentStore?.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => choose(s.id)}
              className={`relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-colors md:p-5 ${
                selected ? "border-fresh-500 bg-fresh-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {selected && (
                <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-fresh-600 text-white">
                  <Check size={12} />
                </span>
              )}

              <StoreLogo store={s} size={56} />

              <div>
                <p className="text-sm font-bold text-slate-900">{s.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.tagline}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> {s.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {s.deliveryEta}
                </span>
              </div>

              {s.categories !== "all" && (
                <p className="text-[11px] text-slate-400">Carries {s.categories.length} of 12 categories</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
