import type { DeliverySlot, PaymentMethod } from "../types";

export const deliverySlots: DeliverySlot[] = [
  { id: "express", label: "Express Delivery", sublabel: "Today, within 60 minutes" },
  { id: "today-afternoon", label: "Today, 2:00 PM – 5:00 PM", sublabel: "Standard delivery" },
  { id: "today-evening", label: "Today, 6:00 PM – 9:00 PM", sublabel: "Standard delivery" },
  { id: "tomorrow-morning", label: "Tomorrow, 9:00 AM – 12:00 PM", sublabel: "Standard delivery" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "card", label: "Credit / Debit Card", sublabel: "Visa •••• 4242" },
  { id: "gcash", label: "GCash", sublabel: "Linked account" },
  { id: "cod", label: "Cash on Delivery", sublabel: "Pay when your order arrives" },
];

export const FREE_DELIVERY_THRESHOLD = 1500;
export const STANDARD_DELIVERY_FEE = 49;
export const EXPRESS_DELIVERY_FEE = 99;

export const mockAddresses = [
  {
    id: "home",
    label: "Home",
    detail: "123 Mabini Street, Brgy. San Isidro, Makati City, 1200",
  },
  {
    id: "work",
    label: "Work",
    detail: "8th Floor, Ayala Tower One, Ayala Ave, Makati City, 1226",
  },
];
