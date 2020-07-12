import { atom, selector, atomFamily, DefaultValue } from 'recoil';
import { currentExchangeRateState } from './recoil/exchange';

// Constants
const ORIGIN = 0;
const DESTINATION = 1;

// atoms

const amountState = atom<number[]>({
  key: 'amountState',
  default: [0, 0],
});

const currencyState = atom<Currency[]>({
  key: 'currencyState',
  default: ['USD', 'EUR'],
});

// selectors
const currencyStateCreator = (origin: boolean) => {
  const index = origin ? ORIGIN : DESTINATION;
  const key = origin ? 'currencyOriginState' : 'currencyDestinationState';
  return selector<Currency>({
    key,
    get: ({ get }) => get(currencyState)[index],
    set: ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) return set(currencyState, newValue);

      const currency = Array.from(get(currencyState));

      const shouldSwapPockets = currency.includes(newValue);
      if (shouldSwapPockets) {
        set(currencyState, Array.from(get(currencyState)).reverse());
        return set(amountState, Array.from(get(amountState)).reverse());
      }

      currency[index] = newValue;
      set(currencyState, currency);
    },
  });
};

export const currencyOriginState = currencyStateCreator(true);
export const currencyDestinationState = currencyStateCreator(false);

const amountStateCreator = (origin: boolean) => {
  const index = origin ? ORIGIN : DESTINATION;
  const key = origin ? 'amountOriginState' : 'amountDestinationState';
  return selector<number>({
    key,
    get: ({ get }) => get(amountState)[index],
    set: ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) return set(amountState, newValue);

      const exchangeRate = get(currentExchangeRateState);
      const amount = origin
        ? [newValue, newValue * exchangeRate]
        : [newValue / exchangeRate, newValue];

      set(amountState, amount);
    },
  });
};

export const amountOriginState = amountStateCreator(true);
export const amountDestinationState = amountStateCreator(false);
