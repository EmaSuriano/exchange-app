import { atom, selector, DefaultValue, CallbackInterface } from 'recoil';
import { ORIGIN_INDEX, DESTINATION_INDEX } from '../utils/constant';
import { currentExchangeRateState } from './exchange';
import { pocketOriginState, pocketDestinationState } from './pocket';
import { storePocketAmount } from '../utils/local-storage';
import { currencyOriginState, currencyDestinationState } from './currency';

export const amountState = atom<number[]>({
  key: 'amountState',
  default: [0, 0],
});

const amountStateCreator = (origin: boolean) => {
  const index = origin ? ORIGIN_INDEX : DESTINATION_INDEX;
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

export const calculatePocketAmountOriginState = selector({
  key: 'calculatePocketAmountOriginState',
  get: ({ get }) => {
    const pocketOrigin = get(pocketOriginState);
    const amountOrigin = get(amountOriginState);

    return pocketOrigin - amountOrigin;
  },
});

export const calculatePocketAmountDestinationState = selector({
  key: 'calculatePocketAmountDestinationState',
  get: ({ get }) => {
    const pocketDestination = get(pocketDestinationState);
    const amountDestination = get(amountDestinationState);

    return pocketDestination + amountDestination;
  },
});

// callbacks
export const exchangeAmountCallback = ({
  set,
  snapshot,
  reset,
}: CallbackInterface) => async () => {
  const currencyOrigin = await snapshot.getPromise(currencyOriginState);
  const currencyDestination = await snapshot.getPromise(
    currencyDestinationState,
  );

  const pocketAmountOrigin = await snapshot.getPromise(
    calculatePocketAmountOriginState,
  );
  const pocketAmountDestination = await snapshot.getPromise(
    calculatePocketAmountDestinationState,
  );

  set(pocketOriginState, pocketAmountOrigin);
  set(pocketDestinationState, pocketAmountDestination);

  reset(amountOriginState);
  reset(amountDestinationState);

  storePocketAmount(currencyOrigin, pocketAmountOrigin);
  storePocketAmount(currencyDestination, pocketAmountDestination);
};
