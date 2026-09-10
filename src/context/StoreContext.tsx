import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product, Store } from "../types";
import { getStore, getStoresForCategory, stores } from "../data/stores";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "dory-grocery-store";
const ALL_STORES_VALUE = "all";

interface PendingPick {
  product: Product;
  quantity: number;
  options: Store[];
}

interface StoreContextValue {
  store: Store | null;
  selectStore: (storeId: string) => void;
  browseAll: () => void;
  requestAddToCart: (product: Product, quantity?: number) => void;
  pendingPick: PendingPick | null;
  resolvePick: (storeId: string) => void;
  cancelPick: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function readInitialStoreId(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === ALL_STORES_VALUE) return null;
    if (raw && getStore(raw)) return raw;
  } catch {
    // ignore read failures (e.g. private browsing)
  }
  return stores[0].id;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [storeId, setStoreId] = useState<string | null>(readInitialStoreId);
  const [pendingPick, setPendingPick] = useState<PendingPick | null>(null);
  const { lines, clearCart, addItem } = useCart();
  const { showToast } = useToast();
  const store = storeId ? (getStore(storeId) ?? null) : null;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, storeId ?? ALL_STORES_VALUE);
    } catch {
      // ignore write failures (e.g. private browsing storage limits)
    }
  }, [storeId]);

  const selectStore = (nextId: string) => {
    const next = getStore(nextId);
    if (nextId === storeId || !next) return;
    if (lines.length > 0) {
      clearCart();
      showToast(`Now shopping at ${next.name} — your cart was cleared`);
    } else {
      showToast(`Now shopping at ${next.name}`);
    }
    setStoreId(nextId);
  };

  const browseAll = () => {
    if (storeId === null) return;
    if (lines.length > 0) {
      clearCart();
      showToast("Browsing all stores — your cart was cleared");
    } else {
      showToast("Browsing all stores");
    }
    setStoreId(null);
  };

  // Called from anywhere a shopper adds an item. If a store is already active,
  // this is a normal add. If they're browsing unscoped, an item carried by
  // exactly one store is resolved silently; one carried by several asks which
  // store should fulfill it, since the cart can only ever belong to one.
  const requestAddToCart = (product: Product, quantity = 1) => {
    if (store) {
      addItem(product.id, quantity);
      return;
    }
    const options = getStoresForCategory(product.category);
    if (options.length <= 1) {
      const chosen = options[0] ?? stores[0];
      setStoreId(chosen.id);
      addItem(product.id, quantity);
      showToast(`Added ${product.name} to cart · now shopping at ${chosen.name}`);
      return;
    }
    setPendingPick({ product, quantity, options });
  };

  const resolvePick = (pickedStoreId: string) => {
    if (!pendingPick) return;
    const chosen = getStore(pickedStoreId);
    if (!chosen) return;
    setStoreId(chosen.id);
    addItem(pendingPick.product.id, pendingPick.quantity);
    showToast(`Added ${pendingPick.product.name} to cart · now shopping at ${chosen.name}`);
    setPendingPick(null);
  };

  const cancelPick = () => setPendingPick(null);

  return (
    <StoreContext.Provider
      value={{ store, selectStore, browseAll, requestAddToCart, pendingPick, resolvePick, cancelPick }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
