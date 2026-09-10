import type { CategoryId, Product, Store } from "../types";
import { products } from "./products";

// Dory Grocery is a marketplace: customers shop one store at a time, the
// way GrabMart/foodpanda work in the Philippines, since a single delivery
// run can't realistically combine two separate physical stores.
export const stores: Store[] = [
  {
    id: "puregold-roxas",
    name: "Puregold",
    branch: "Roxas Branch",
    area: "Roxas Isabela",
    logoLabel: "PG",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Puregold_logo.svg",
    color: "bg-orange-500",
    rating: 4.7,
    deliveryEta: "25–40 min",
    distanceKm: 1.8,
    categories: "all",
    tagline: "Full supermarket · Everyday low prices",
  },
  {
    id: "sm-bgc",
    name: "SM Supermarket",
    branch: "BGC Branch",
    area: "Taguig City",
    logoLabel: "SM",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010_SM_logo.svg",
    color: "bg-red-500",
    rating: 4.8,
    deliveryEta: "30–45 min",
    distanceKm: 3.2,
    categories: "all",
    tagline: "Full supermarket · Wide product range",
  },
  {
    id: "robinsons-ortigas",
    name: "Robinsons Supermarket",
    branch: "Galleria Branch",
    area: "Ortigas, Pasig City",
    logoLabel: "RS",
    color: "bg-blue-500",
    rating: 4.6,
    deliveryEta: "35–50 min",
    distanceKm: 4.5,
    categories: [
      "rice-grains",
      "meat",
      "fish-seafood",
      "vegetables",
      "fruits",
      "canned-goods",
      "instant-noodles",
      "cooking-essentials",
      "condiments-sauces",
      "beverages",
      "snacks",
    ],
    tagline: "Full supermarket · No frozen section",
  },
  {
    id: "aling-nena-palengke",
    name: "Aling Nena's Palengke Stall",
    branch: "Poblacion Wet Market",
    area: "Makati City",
    logoLabel: "AN",
    color: "bg-fresh-600",
    rating: 4.9,
    deliveryEta: "15–25 min",
    distanceKm: 0.9,
    categories: ["rice-grains", "meat", "fish-seafood", "vegetables", "fruits"],
    tagline: "Local wet market stall · Fresh picks daily",
  },
];

export function getStore(id: string) {
  return stores.find((s) => s.id === id);
}

export function storeCarriesCategory(store: Store, category: CategoryId) {
  return store.categories === "all" || store.categories.includes(category);
}

// storeId of null means "browsing all stores" — the full, unscoped catalog.
export function getProductsForStore(storeId: string | null): Product[] {
  if (!storeId) return products;
  const store = getStore(storeId);
  if (!store) return [];
  return products.filter((p) => storeCarriesCategory(store, p.category));
}

// Used to silently pick a fulfilling store when someone adds an item while
// browsing unscoped — the first store (in listing order) that carries it.
export function getDefaultStoreForCategory(category: CategoryId): Store {
  return stores.find((s) => storeCarriesCategory(s, category)) ?? stores[0];
}

export function getStoresForCategory(category: CategoryId): Store[] {
  return stores.filter((s) => storeCarriesCategory(s, category));
}
