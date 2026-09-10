import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { categories } from "../data/categories";
import { getProductsForStore, storeCarriesCategory } from "../data/stores";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/Button";
import { StoreSwitcher } from "../components/StoreSwitcher";
import { useStore } from "../context/StoreContext";
import type { CategoryId } from "../types";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") as CategoryId | null;
  const queryParam = searchParams.get("q") ?? "";
  const [sort, setSort] = useState<SortOption>("popular");
  const { store } = useStore();

  const storeProducts = useMemo(() => getProductsForStore(store?.id ?? null), [store]);
  const storeCategories = useMemo(
    () => (store ? categories.filter((c) => storeCarriesCategory(store, c.id)) : categories),
    [store],
  );

  const setCategory = (category: CategoryId | null) => {
    const next = new URLSearchParams(searchParams);
    if (category) next.set("category", category);
    else next.delete("category");
    setSearchParams(next, { replace: true });
  };

  const runSearch = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = storeProducts;
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (queryParam.trim()) {
      const q = queryParam.trim().toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }

    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
    }
    return sorted;
  }, [storeProducts, activeCategory, queryParam, sort]);

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-6 md:pt-8">
      <p className="mb-3 text-sm text-slate-500">
        {store ? (
          <>
            Shopping at <span className="font-semibold text-slate-700">{store.name}</span>
          </>
        ) : (
          "Browsing all stores"
        )}
      </p>
      <StoreSwitcher className="mb-4" />
      <SearchBar value={queryParam} onChange={runSearch} className="mb-4" />

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        <button
          onClick={() => setCategory(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !activeCategory ? "bg-fresh-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
          }`}
        >
          All
        </button>
        {storeCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === c.id ? "bg-fresh-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            <c.icon size={14} strokeWidth={1.5} fill="currentColor" className="mr-1 inline -mt-0.5" />
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {activeCategoryName ? ` in ${activeCategoryName}` : ""}
          {queryParam ? ` for “${queryParam}”` : ""}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-600 outline-none focus:border-fresh-400 md:text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<SearchX size={28} />}
          title="No products found"
          description={
            queryParam
              ? `We couldn't find anything matching "${queryParam}". Try a different search term.`
              : "Try adjusting your filters or browse a different category."
          }
          action={
            <Button
              variant="outline"
              onClick={() => setSearchParams({}, { replace: true })}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 md:gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
