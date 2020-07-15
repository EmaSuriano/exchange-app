import { atomFamily, selector, CallbackInterface } from 'recoil';
import { currencyOriginState, currencyDestinationState } from './currency';
import { ALL_CURRENCIES } from '../utils/constant';

export const pocketState = atomFamily<number, Currency>({
  key: 'pocketState',
  default: 0,
});

// selector
export const pocketListState = selector({
  key: 'pocketListState',
  get: ({ get }) => {
    return Object.entries(ALL_CURRENCIES).map(([curr, name]) => {
      const currency = curr as Currency;
      const amount = get(pocketState(currency));

      return {
        currency,
        name,
        amount,
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

// callbacks
export const swapPocketsCallback = ({
  set,
  snapshot,
}: CallbackInterface) => async () => {
  const currencyDestination = await snapshot.getPromise(
    currencyDestinationState,
  );

  set(currencyOriginState, currencyDestination);
};
