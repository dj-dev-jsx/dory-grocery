import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Store } from "../types";
import { getStore, stores } from "../data/stores";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "dory-grocery-store";
const ALL_STORES_VALUE = "all";

interface StoreContextValue {
  store: Store | null;
  selectStore: (storeId: string) => void;
  browseAll: () => void;
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
  const { lines, clearCart } = useCart();
  const { showToast } = useToast();

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

  const store = storeId ? (getStore(storeId) ?? null) : null;

  return <StoreContext.Provider value={{ store, selectStore, browseAll }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
