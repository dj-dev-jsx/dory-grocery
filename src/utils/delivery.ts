import { EXPRESS_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from "../data/checkoutOptions";

export function computeDeliveryFee(subtotal: number, slotId: string) {
  if (subtotal === 0) return 0;
  if (subtotal >= FREE_DELIVERY_THRESHOLD && slotId !== "express") return 0;
  return slotId === "express" ? EXPRESS_DELIVERY_FEE : STANDARD_DELIVERY_FEE;
}
