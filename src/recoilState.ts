import {
  atom,
  selector,
  atomFamily,
  DefaultValue,
  MutableSnapshot,
  CallbackInterface,
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

const exchangeState = atomFamily<ExchangeRate[], Currency>({
  key: 'exchangeState',
  default: [],
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
    const pocketOrigin = get(pocketOriginState) || 0;

    return amountOrigin > 0 && pocketOrigin > amountOrigin;
  },
});

export const exchangeRateState = selector({
  key: 'exchangeRateState',
  get: ({ get }) => {
    const currencyOrigin = get(currencyOriginState);
    const currencyDestination = get(currencyDestinationState);

    const exchangeRate =
      get(exchangeState(currencyOrigin)).find(
        ({ currency }) => currency === currencyDestination,
      )?.value || 1;

    return exchangeRate;
  },
});

const amountStateCreator = (origin: boolean) => {
  const index = origin ? ORIGIN : DESTINATION;
  const key = origin ? 'amountOriginState' : 'amountDestinationState';
  return selector<number>({
    key,
    get: ({ get }) => get(amountState)[index],
    set: ({ set, get }, newValue) => {
      if (newValue instanceof DefaultValue) return set(amountState, newValue);

      const exchangeRate = get(exchangeRateState);
      const amount = origin
        ? [newValue, newValue * exchangeRate]
        : [newValue / exchangeRate, newValue];

      set(amountState, amount);
    },
  });
};

export const amountOriginState = amountStateCreator(true);
export const amountDestinationState = amountStateCreator(false);

const pocketStateCreator = (origin: boolean) => {
  const recoilValue = origin ? currencyOriginState : currencyDestinationState;
  const key = origin ? 'pocketOriginState' : 'pocketDestinationState';
  return selector<number>({
    key,
    get: ({ get }) => get(pocketState(get(recoilValue))),
    set: ({ set, get }, newValue) =>
      set(pocketState(get(recoilValue)), newValue),
  });
};

export const pocketOriginState = pocketStateCreator(true);
export const pocketDestinationState = pocketStateCreator(false);

// initializers
export const setFakeData = ({ set }: MutableSnapshot) => {
  set(pocketState('EUR'), 100);
  set(pocketState('USD'), 50);
  set(pocketState('GBP'), 0);
};

// callbacks
export const exchangeAmountCallback = ({
  set,
  snapshot,
}: CallbackInterface) => async () => {
  const pocketOrigin = await snapshot.getPromise(pocketOriginState);
  const pocketDestination = await snapshot.getPromise(pocketDestinationState);

  const amountOrigin = await snapshot.getPromise(amountOriginState);
  const amountDestination = await snapshot.getPromise(amountDestinationState);

  set(pocketOriginState, pocketOrigin - amountOrigin);
  set(pocketDestinationState, pocketDestination + amountDestination);

  set(amountOriginState, 0);
  set(amountDestinationState, 0);
};

export const swapPocketsCallback = ({
  set,
  snapshot,
}: CallbackInterface) => async () => {
  const currencies = await snapshot.getPromise(currencyState);
  const amounts = await snapshot.getPromise(amountState);

  set(currencyState, Array.from(currencies).reverse());
  set(amountState, Array.from(amounts).reverse());
};
