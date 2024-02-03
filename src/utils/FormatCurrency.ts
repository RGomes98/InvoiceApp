export const formatCurrency = (number?: number) => {
  if (!number) return;
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(number);
};
