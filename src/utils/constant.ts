export const POLLING_TIME = 10000;

export const ORIGIN_INDEX = 0;
export const DESTINATION_INDEX = 1;

export const ALL_CURRENCIES: Record<Currency, string> = {
  USD: 'US-Dollar',
  EUR: 'Euro',
  GBP: 'Pound',
};

export const DECIMAL_SEPARATOR = '.';

export const THOUSAND_SEPARATOR = ',';

export const CURRENCY_TO_TEXT: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '₤',
};

export const EXCHANGE_INFORMATION = {
  POSSIBLE: 'Transaction possible!',
  AMOUNT_NOT_SPECIFY: 'Specify amount to exchange ...',
  INSUFFICIENT_AMOUNT: 'Not enough amount in your current Pocket ...',
  EXCHANGE_RATE_NOT_FOUND: 'Exchange Rates not loaded yet ...',
};

export const MAX_AMOUNT_EXCHANGE = 9999999999;

export const DECIMAL_AMOUNT_SUMMARY = 2;
export const DECIMAL_AMOUNT_EXCHANGE = 4;

export const ANIMATION_DURATION = 500;
