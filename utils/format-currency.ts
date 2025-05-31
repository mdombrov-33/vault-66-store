//* Helper function to format a number as USD currency.
//* Defaults to $0.00 if amount is null or undefined.
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
