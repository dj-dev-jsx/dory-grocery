import type { LucideIcon } from "lucide-react";

export type CategoryId =
  | "rice-grains"
  | "meat"
  | "fish-seafood"
  | "vegetables"
  | "fruits"
  | "canned-goods"
  | "instant-noodles"
  | "cooking-essentials"
  | "condiments-sauces"
  | "beverages"
  | "snacks"
  | "frozen-goods";

export interface Category {
  id: CategoryId;
  name: string;
  icon: LucideIcon;
  color: string; // tailwind bg class for the tinted tile
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: CategoryId;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  isDeal?: boolean;
  isPopular?: boolean;
}

export interface CartLine {
  productId: number;
  quantity: number;
}

export interface DeliverySlot {
  id: string;
  label: string;
  sublabel: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  sublabel: string;
}

export type OrderStatus = "preparing" | "out-for-delivery" | "delivered" | "cancelled";

export interface PlacedOrder {
  orderNumber: string;
  items: { product: Product; quantity: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: string;
  slotLabel: string;
  paymentLabel: string;
  placedAt: string;
  status?: OrderStatus;
}
