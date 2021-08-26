export const currencyFormatter = (amount, decimals = 2) => {
  if (amount && !isNaN(amount)) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    amount = formatter.format(amount);
  }
  return amount;
};
