export const OMAN_VAT_RATE = 0.05; // 5%

export interface OrderCalculation {
  subtotal: number;
  tax: number;
  total: number;
  totalQuantity: number;
  itemCount: number;
}

export function calculateOrderTotals(
  items: Array<{ unitPrice: number; quantity: number }>
): OrderCalculation {
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * (item.quantity || 0)), 0);
  const tax = Math.round(subtotal * OMAN_VAT_RATE);
  const total = subtotal + tax;
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const itemCount = items.filter(item => item.quantity > 0).length;

  return {
    subtotal,
    tax,
    total,
    totalQuantity,
    itemCount
  };
}
