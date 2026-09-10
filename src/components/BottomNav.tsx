import { NavLink } from "react-router-dom";
import { Home, Receipt, ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

const linkBase =
  "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors";

export function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-100 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] md:hidden">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `${linkBase} ${isActive ? "text-fresh-700" : "text-slate-400"}`}
      >
        <Home size={22} />
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => `${linkBase} ${isActive ? "text-fresh-700" : "text-slate-400"}`}
      >
        <Store size={22} />
        Shop
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) => `${linkBase} ${isActive ? "text-fresh-700" : "text-slate-400"}`}
      >
        <Receipt size={22} />
        Orders
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => `${linkBase} relative ${isActive ? "text-fresh-700" : "text-slate-400"}`}
      >
        <span className="relative">
          <ShoppingCart size={22} />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-fresh-600 px-1 text-[9px] font-bold text-white ring-2 ring-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </span>
        Cart
      </NavLink>
    </nav>
  );
}
