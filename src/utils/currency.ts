/**
 * Formats a numeric value into OMR currency string.
 * Example: 425 -> "OMR 425" or "OMR 32,150"
 */
export function formatOMR(amount: number, includeDecimals = false): string {
  if (isNaN(amount)) return 'OMR 0';
  
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: includeDecimals ? 3 : 0,
    maximumFractionDigits: includeDecimals ? 3 : 0,
  }).format(amount);

  return `OMR ${formatted}`;
}

/**
 * Returns clean currency without symbol
 */
export function formatNumber(value: number): string {
  if (isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US').format(value);
}
