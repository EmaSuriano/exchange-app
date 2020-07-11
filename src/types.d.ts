type Currency = 'USD' | 'GBP' | 'EUR';

type CurrencyDetails = {
  currency: Currency;
  name: string;
};

type Pocket = {
  currency: Currency;
  amount: number;
};
