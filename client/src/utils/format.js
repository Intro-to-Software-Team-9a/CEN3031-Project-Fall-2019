export function formatCurrency(amountInCents) {
  return `$${(amountInCents / 100).toFixed(2)}`;
}

export default formatCurrency;
