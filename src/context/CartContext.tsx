import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine, Product } from "../types";
import { getProduct } from "../data/products";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "dory-grocery-cart";

interface CartContextValue {
  lines: CartLine[];
  items: { product: Product; quantity: number }[];
  itemCount: number;
  subtotal: number;
  getQuantity: (productId: number) => number;
  addItem: (productId: number, quantity?: number) => void;
  addItems: (items: { productId: number; quantity: number }[]) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readInitialCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readInitialCart);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore write failures (e.g. private browsing storage limits)
    }
  }, [lines]);

  const getQuantity = (productId: number) => lines.find((l) => l.productId === productId)?.quantity ?? 0;

  const addItem = (productId: number, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { productId, quantity }];
    });
    const product = getProduct(productId);
    if (product) showToast(`Added ${product.name} to cart`);
  };

  const addItems = (items: { productId: number; quantity: number }[]) => {
    setLines((prev) => {
      const next = [...prev];
      for (const { productId, quantity } of items) {
        const existing = next.find((l) => l.productId === productId);
        if (existing) existing.quantity += quantity;
        else next.push({ productId, quantity });
      }
      return next;
    });
    showToast(items.length === 1 ? "Added 1 item to cart" : `Added ${items.length} items to cart`);
  };

  const setQuantity = (productId: number, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.productId !== productId);
      const existing = prev.find((l) => l.productId === productId);
      if (existing) return prev.map((l) => (l.productId === productId ? { ...l, quantity } : l));
      return [...prev, { productId, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    const product = getProduct(productId);
    setLines((prev) => prev.filter((l) => l.productId !== productId));
    if (product) showToast(`Removed ${product.name} from cart`);
  };

  const clearCart = () => setLines([]);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = getProduct(line.productId);
          return product ? { product, quantity: line.quantity } : null;
        })
        .filter((x): x is { product: Product; quantity: number } => x !== null),
    [lines],
  );

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ lines, items, itemCount, subtotal, getQuantity, addItem, addItems, setQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
