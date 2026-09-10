import { Check, LayoutGrid } from "lucide-react";
import { stores } from "../data/stores";
import { useStore } from "../context/StoreContext";
import { StoreLogo } from "./StoreLogo";

interface StoreSwitcherProps {
  className?: string;
}

const tileClass = (selected: boolean) =>
  `relative flex w-32 shrink-0 flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-colors md:w-auto md:p-4 ${
    selected ? "border-fresh-500 bg-fresh-50" : "border-slate-200 bg-white hover:border-slate-300"
  }`;

function SelectedBadge() {
  return (
    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-fresh-600 text-white">
      <Check size={10} />
    </span>
  );
}

export function StoreSwitcher({ className = "" }: StoreSwitcherProps) {
  const { store, selectStore, browseAll } = useStore();

  return (
    <div
      className={`no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:px-0 ${className}`}
    >
      <button type="button" onClick={browseAll} className={tileClass(store === null)}>
        {store === null && <SelectedBadge />}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <LayoutGrid size={22} />
        </span>
        <p className="text-xs font-semibold text-slate-800 md:text-sm">All Stores</p>
      </button>

      {stores.map((s) => {
        const selected = store?.id === s.id;
        return (
          <button key={s.id} type="button" onClick={() => selectStore(s.id)} className={tileClass(selected)}>
            {selected && <SelectedBadge />}
            <StoreLogo store={s} size={48} />
            <p className="line-clamp-2 text-xs font-semibold text-slate-800 md:text-sm">{s.name}</p>
          </button>
        );
      })}
    </div>
  );
}
