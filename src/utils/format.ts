import {
  CURRENCY_TO_TEXT,
  DECIMAL_AMOUNT_SUMMARY,
  DECIMAL_AMOUNT_EXCHANGE,
} from './constant';

export const formatPocket = ({ currency, amount }: ExchangeTransaction) =>
  `${CURRENCY_TO_TEXT[currency]}${amount.toFixed(DECIMAL_AMOUNT_SUMMARY)}`;

export const formatExchange = ({ currency, amount }: ExchangeTransaction) =>
  `${CURRENCY_TO_TEXT[currency]}${amount.toFixed(DECIMAL_AMOUNT_EXCHANGE)}`;

export const formatAmount = (amount: number) => {
  if (Math.floor(amount) === amount) return amount;

  const decimals = amount.toString().split('.')[1].length;
  const fixedDecimals =
    decimals < DECIMAL_AMOUNT_SUMMARY ? decimals : DECIMAL_AMOUNT_SUMMARY;

  return amount.toFixed(fixedDecimals);
};
