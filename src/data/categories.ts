import { Apple, Candy, ChefHat, CupSoda, Droplet, FishSymbol, Ham, Package, Snowflake, Soup, Carrot, Wheat } from "lucide-react";
import type { Category } from "../types";

// Category labels are centralized here (rather than hardcoded in components)
// so this list can support translated labels later without touching the UI.
export const categories: Category[] = [
  { id: "rice-grains", name: "Rice & Grains", icon: Wheat, color: "bg-amber-100" },
  { id: "meat", name: "Meat", icon: Ham, color: "bg-rose-100" },
  { id: "fish-seafood", name: "Fish & Seafood", icon: FishSymbol, color: "bg-sky-100" },
  { id: "vegetables", name: "Vegetables", icon: Carrot, color: "bg-fresh-100" },
  { id: "fruits", name: "Fruits", icon: Apple, color: "bg-orange-100" },
  { id: "canned-goods", name: "Canned Goods", icon: Package, color: "bg-red-100" },
  { id: "instant-noodles", name: "Instant & Noodles", icon: Soup, color: "bg-yellow-100" },
  { id: "cooking-essentials", name: "Cooking Essentials", icon: ChefHat, color: "bg-stone-100" },
  { id: "condiments-sauces", name: "Condiments & Sauces", icon: Droplet, color: "bg-lime-100" },
  { id: "beverages", name: "Beverages", icon: CupSoda, color: "bg-cyan-100" },
  { id: "snacks", name: "Snacks", icon: Candy, color: "bg-purple-100" },
  { id: "frozen-goods", name: "Frozen Goods", icon: Snowflake, color: "bg-brand-100" },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}
