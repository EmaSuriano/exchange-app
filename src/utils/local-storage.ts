const DEFAULT_AMOUNTS = {
  USD: 100,
  EUR: 50,
  GBP: 0,
};

export const restorePocketAmount = (curr: Currency) => {
  const storedValue = localStorage.getItem(curr);
  if (!storedValue) return DEFAULT_AMOUNTS[curr];

  return parseFloat(storedValue);
};

export const storePocketAmount = (curr: Currency, amount: number) =>
  localStorage.setItem(curr, amount.toString());
