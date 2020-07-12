import {
  atom,
  selector,
  selectorFamily,
  atomFamily,
  DefaultValue,
} from 'recoil';

// Constants
const ORIGIN = 0;
const DESTINATION = 1;

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

// atoms
export const pocketState = atomFamily<number, Currency>({
  key: 'pocketState',
  default: 0,
});

const amountState = atom<number[]>({
  key: 'amountState',
  default: [0, 0],
});

const currencyState = atom<Currency[]>({
  key: 'currencyState',
  default: ['USD', 'EUR'],
});

export const exchangeState = atomFamily<ExchangeRate[], Currency>({
  key: 'exchangeState',
  default: [],
});

// selectors
const currencyStateCreator = (origin: boolean, key: string) => {
  const index = origin ? ORIGIN : DESTINATION;
  return selector<Currency>({
    key,
    get: ({ get }) => get(currencyState)[index],
    set: ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) return set(currencyState, newValue);

      const currency = Array.from(get(currencyState));

      const shouldSwapCurrencies = currency.includes(newValue);
      if (shouldSwapCurrencies) {
        set(currencyState, Array.from(get(currencyState)).reverse());
        return set(amountState, Array.from(get(amountState)).reverse());
      }

      currency[index] = newValue;
      set(currencyState, currency);
    },
  });
};

export const currencyOriginState = currencyStateCreator(
  true,
  'currencyOriginState',
);

export const currencyDestinationState = currencyStateCreator(
  false,
  'currencyDestinationState',
);

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

export const exchangeEnabledState = selector({
  key: 'exchangeEnabledState',
  get: ({ get }) => {
    const amountOrigin = get(amountState)[0];
    const currencyOrigin = get(currencyOriginState);
    const pocketOrigin = get(pocketState(currencyOrigin)) || 0;
    return amountOrigin > 0 && pocketOrigin > amountOrigin;
  },
});

const amountStateCreator = (origin: boolean, key: string) => {
  const index = origin ? ORIGIN : DESTINATION;
  return selector<number>({
    key,
    get: ({ get }) => get(amountState)[index],
    set: ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) return set(amountState, newValue);

      const currencies = Array.from(get(currencyState));
      const currenciesSort = origin ? currencies : currencies.reverse();

      const exchangeRate =
        get(exchangeState(currenciesSort[0])).find(
          ({ currency }) => currency === currenciesSort[1],
        )?.value || 1;
      const amounts = [newValue, newValue * exchangeRate];

      set(amountState, origin ? amounts : amounts.reverse());
    },
  });
};

export const amountOriginState = amountStateCreator(true, 'amountOriginState');

export const amountDestinationState = amountStateCreator(
  false,
  'amountDestinationState',
);
