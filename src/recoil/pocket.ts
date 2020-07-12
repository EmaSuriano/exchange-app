import { atomFamily, selector } from 'recoil';
import { currencyOriginState, currencyDestinationState } from '../recoilState';

const ALL_CURRENCIES: CurrencyDetails[] = [
  {
    currency: 'USD',
    name: 'US-Dollar',
  },
  {
    currency: 'EUR',
    name: 'Euro',
  },
  {
    currency: 'GBP',
    name: 'Pound',
  },
];

export const pocketState = atomFamily<number, Currency>({
  key: 'pocketState',
  default: 0,
});

export const pocketListState = selector({
  key: 'pocketListState',
  get: ({ get }) => {
    return ALL_CURRENCIES.map((curr) => {
      const amount = get(pocketState(curr.currency));

      return {
        ...curr,
        amount: amount || 0,
      };
    });
  },
});

export const pocketOriginState = selector<number>({
  key: 'pocketOriginState',
  get: ({ get }) => get(pocketState(get(currencyOriginState))),
  set: ({ set, get }, newValue) =>
    set(pocketState(get(currencyOriginState)), newValue),
});

export const pocketDestinationState = selector<number>({
  key: 'pocketDestinationState',
  get: ({ get }) => get(pocketState(get(currencyDestinationState))),
  set: ({ set, get }, newValue) =>
    set(pocketState(get(currencyDestinationState)), newValue),
});
