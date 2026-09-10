import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ShoppingCart, Store, Waves } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const { itemCount } = useCart();
  const { store } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const navLinkClass = (path: string) => {
    const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
    return `text-sm font-medium transition-colors ${
      isActive ? "text-fresh-700" : "text-slate-500 hover:text-fresh-600"
    }`;
  };

  const submitSearch = () => {
    navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fresh-600 text-white shadow-sm">
            <Waves size={20} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Dory<span className="text-fresh-600"> Grocery</span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-5 md:flex">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/products" className={navLinkClass("/products")}>
            Shop
          </Link>
          <Link to="/orders" className={navLinkClass("/orders")}>
            Orders
          </Link>
        </nav>

        <div className="hidden flex-1 md:block">
          <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} className="max-w-md" />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/cart"
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-fresh-50 hover:text-fresh-700"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-fresh-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-1.5 md:px-6">
        <Link
          to="/stores"
          className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-fresh-600"
        >
          <Store size={12} className="shrink-0" />
          <span className="truncate">
            {store ? (
              <>
                Shopping at <span className="font-semibold text-slate-700">{store.name}</span>
                <span className="hidden sm:inline"> · {store.branch}</span>
              </>
            ) : (
              "Browsing all stores"
            )}
          </span>
          <ChevronDown size={12} className="shrink-0" />
        </Link>
      </div>
    </header>
  );
}
