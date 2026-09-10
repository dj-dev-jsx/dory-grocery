import type { PlacedOrder } from "../types";
import { getProduct } from "./products";

function line(productId: number, quantity: number) {
  const product = getProduct(productId);
  if (!product) throw new Error(`Unknown mock order product id: ${productId}`);
  return { product, quantity };
}

// Pre-populated order history so the "Recent Orders" experience has something
// real to show without needing a backend. Totals are computed from the same
// product prices used elsewhere, so reordering always matches current prices.
export const mockOrders: PlacedOrder[] = [
  {
    orderNumber: "DG-202609-7734",
    items: [line(43, 2), line(45, 3), line(40, 2), line(42, 1)],
    subtotal: 340,
    deliveryFee: 99,
    total: 439,
    address: "Home — 123 Mabini Street, Brgy. San Isidro, Makati City, 1200",
    slotLabel: "Express Delivery",
    paymentLabel: "GCash",
    placedAt: "2026-09-10T02:30:00.000Z",
    status: "out-for-delivery",
    storeId: "sm-bgc",
    storeName: "SM Supermarket",
  },
  {
    orderNumber: "DG-202609-4821",
    items: [line(1, 2), line(33, 1), line(29, 1), line(21, 3), line(25, 4)],
    subtotal: 454,
    deliveryFee: 49,
    total: 503,
    address: "Home — 123 Mabini Street, Brgy. San Isidro, Makati City, 1200",
    slotLabel: "Today, 2:00 PM – 5:00 PM",
    paymentLabel: "Credit / Debit Card",
    placedAt: "2026-09-05T06:05:00.000Z",
    status: "delivered",
    storeId: "puregold-makati",
    storeName: "Puregold Price Club",
  },
  {
    orderNumber: "DG-202608-3390",
    items: [line(6, 1), line(5, 1), line(8, 1), line(1, 2), line(33, 2), line(29, 1), line(38, 10), line(39, 1)],
    subtotal: 1515,
    deliveryFee: 0,
    total: 1515,
    address: "Work — 8th Floor, Ayala Tower One, Ayala Ave, Makati City, 1226",
    slotLabel: "Tomorrow, 9:00 AM – 12:00 PM",
    paymentLabel: "Cash on Delivery",
    placedAt: "2026-08-27T09:45:00.000Z",
    status: "delivered",
    storeId: "robinsons-ortigas",
    storeName: "Robinsons Supermarket",
  },
  {
    orderNumber: "DG-202608-1027",
    items: [line(48, 1), line(49, 2)],
    subtotal: 590,
    deliveryFee: 49,
    total: 639,
    address: "Home — 123 Mabini Street, Brgy. San Isidro, Makati City, 1200",
    slotLabel: "Today, 6:00 PM – 9:00 PM",
    paymentLabel: "Credit / Debit Card",
    placedAt: "2026-08-11T11:15:00.000Z",
    status: "cancelled",
    storeId: "puregold-makati",
    storeName: "Puregold Price Club",
  },
];

const STORAGE_KEY = "dory-grocery-orders";

function readStoredOrders(): PlacedOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Save a freshly placed order so it shows up in "My Orders" right away. */
export function saveOrder(order: PlacedOrder) {
  try {
    const stored = readStoredOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...stored]));
  } catch {
    // ignore write failures (e.g. private browsing storage limits)
  }
}

/** Orders placed this session, newest first, followed by the seeded order history. */
export function getAllOrders(): PlacedOrder[] {
  return [...readStoredOrders(), ...mockOrders];
}

export function getOrder(orderNumber: string) {
  return getAllOrders().find((o) => o.orderNumber === orderNumber);
}
