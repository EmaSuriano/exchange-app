export const EMPTY_POCKETS = {
  USD: 0,
  EUR: 0,
  GBP: 0,
};

export const INITIALIZE_POCKETS = {
  USD: 100,
  EUR: 50,
  GBP: 0,
};

export const EXCHANGE_RATE_USD = {
  rates: {
    EUR: 0.8761170492,
    USD: 1,
    GBP: 0.7961713685,
  },
  base: 'USD',
  date: '2020-07-16',
};

export const EXCHANGE_RATE_EUR = {
  rates: {
    EUR: 1,
    USD: 1.1414,
    GBP: 0.90875,
  },
  base: 'EUR',
  date: '2020-07-16',
};

export const EXCHANGE_RATE_GBP = {
  rates: {
    EUR: 1.1004126547,
    USD: 1.2560110041,
    GBP: 1,
  },
  base: 'GBP',
  date: '2020-07-16',
};

export const EXCHANGE_MOCKS = {
  GBP: EXCHANGE_RATE_GBP,
  EUR: EXCHANGE_RATE_EUR,
  USD: EXCHANGE_RATE_USD,
};
