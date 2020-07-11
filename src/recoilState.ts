import {
  atom,
  selector,
  selectorFamily,
  atomFamily,
  useRecoilState,
} from 'recoil';

// Default values
const DEFAULT_POCKETS: Pocket[] = [
  {
    currency: 'USD',
    amount: 100,
  },
  {
    currency: 'EUR',
    amount: 50,
  },
  {
    currency: 'GBP',
    amount: 0,
  },
];

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
export const pocketListState = atom({
  key: 'pocketListState',
  default: DEFAULT_POCKETS,
});

export const amountState = atom({
  key: 'amountState',
  default: 0,
});

export const currencyOriginState = atom<Currency>({
  key: 'currencyOriginState',
  default: 'USD',
});

export const currencyDestinationState = atom<Currency>({
  key: 'currencyDestinationState',
  default: 'EUR',
});

// selectors
export const currencyAmountState = selectorFamily({
  key: 'currencyAmountState',
  get: (currency: Currency) => ({ get }) => {
    const pocketList = get(pocketListState);

    return pocketList.find((pocket) => pocket.currency === currency)?.amount;
  },
});

export const currencyListWithAmountState = selector({
  key: 'currencyListState',
  get: ({ get }) => {
    const pocketList = get(pocketListState);

    return ALL_CURRENCIES.map((curr) => {
      const pocket = pocketList.find(
        ({ currency }) => currency === curr.currency,
      );

      return {
        ...curr,
        amount: pocket?.amount || 0,
      };
    });
  },
});
