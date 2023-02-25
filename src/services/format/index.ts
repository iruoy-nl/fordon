
/**
 * Format the provided currency.
 * 
 * @param value The currency.
 */
export function formatCurrency(value: number): string {
  if (value === 0) {
    return '€ -';
  }

  const v = value.toLocaleString(
    'nl-NL',
    {
      minimumFractionDigits: 2
    }
  );

  return `€ ${v}`;
}