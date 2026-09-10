import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { categories } from "../data/categories";
import { getProductsForStore, storeCarriesCategory } from "../data/stores";
import { SearchBar } from "../components/SearchBar";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { StoreSwitcher } from "../components/StoreSwitcher";
import { useStore } from "../context/StoreContext";

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { store } = useStore();

  const storeProducts = getProductsForStore(store?.id ?? null);
  const storeCategories = store ? categories.filter((c) => storeCarriesCategory(store, c.id)) : categories;

  const popular = storeProducts.filter((p) => p.isPopular).slice(0, 8);
  const deals = storeProducts.filter((p) => p.isDeal).slice(0, 6);
  const budgetPicks = storeProducts.filter((p) => p.price <= 100).slice(0, 8);

  const submitSearch = () => {
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-6 md:pt-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-fresh-600 px-6 py-10 text-white shadow-lg shadow-fresh-600/20 md:px-12 md:py-14">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Fruit_stand_in_Noveleta%2CCavite.jpg/1280px-Fruit_stand_in_Noveleta%2CCavite.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 62%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fresh-800/85 via-fresh-700/45 to-fresh-600/20" />
        <div className="pointer-events-none absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-white/15 md:h-44 md:w-44" />

        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Sparkles size={14} /> Delivers Fast
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight [text-shadow:0_2px_8px_rgb(0_0_0_/_0.35)] md:text-5xl">
            Fresh groceries, <br /> delivered to your door.
          </h1>
          <p className="mt-3 text-sm text-fresh-50 [text-shadow:0_1px_4px_rgb(0_0_0_/_0.3)] md:text-base">
            Farm-fresh produce, pantry staples, and everyday essentials — hand-picked and ready to shop.
          </p>

          <div className="mt-6 max-w-md">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={submitSearch}
              placeholder="Try “rice”, “eggs”, “sardines”..."
              className="shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="mt-6">
        <p className="mb-3 text-sm text-slate-500">
          {store ? (
            <>
              Shopping at <span className="font-semibold text-slate-800">{store.name}</span> · {store.branch}.{" "}
            </>
          ) : (
            <>Browsing all stores. </>
          )}
          Tap a store to shop from just that one, or browse everything.
        </p>
        <StoreSwitcher />
      </section>

      {/* Trust strip */}
      <section className="mt-6 grid grid-cols-3 gap-2 md:gap-4">
        {[
          { icon: Truck, label: "Free delivery over ₱1,500", color: "text-fresh-600" },
          { icon: Clock, label: "Express 60-min slots", color: "text-fresh-600" },
          { icon: ShieldCheck, label: "Freshness guaranteed", color: "text-fresh-600" },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-100 md:flex-row md:justify-center md:gap-2 md:p-4"
          >
            <Icon size={18} className={`shrink-0 ${color}`} />
            <span className="text-[11px] font-medium text-slate-600 md:text-sm">{label}</span>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">Shop by Category</h2>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-1 text-sm font-medium text-fresh-600 hover:text-fresh-700"
          >
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:px-0">
          {storeCategories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Deals */}
      {deals.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">Fresh Deals</h2>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-1 text-sm font-medium text-fresh-600 hover:text-fresh-700"
            >
              See all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Budget picks */}
      {budgetPicks.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">Under ₱100</h2>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-1 text-sm font-medium text-fresh-600 hover:text-fresh-700"
            >
              See all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
            {budgetPicks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Popular */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">Family Favorites</h2>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-1 text-sm font-medium text-fresh-600 hover:text-fresh-700"
          >
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
