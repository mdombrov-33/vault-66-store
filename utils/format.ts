//* Helper function to format a number as USD currency.
//* Defaults to $0.00 if amount is null or undefined.
//* Not used in this app because it is thematically not relevant.
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
