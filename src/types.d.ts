type Currency = 'USD' | 'GBP' | 'EUR';

type Pocket = {
  currency: Currency;
  amount: number;
};

type ExchangeRate = {
  exchange: Record<Currency, number>;
  lastUpdate: Date | null;
};

type ExchangeResponse = {
  rates: Record<Currency, number>;
  base: Currency;
  date: Date;
};
