import { atom, selector, DefaultValue, CallbackInterface } from 'recoil';
import { ORIGIN_INDEX, DESTINATION_INDEX } from '../utils/constant';
import { currentExchangeRateState } from './exchange';
import { pocketOriginState, pocketDestinationState } from './pocket';
import { storePocketAmount } from '../utils/local-storage';
import {
  calculatePocketOriginState,
  calculatePocketDestinationState,
} from './shared-selector';

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

// callbacks
export const exchangeAmountCallback = ({
  set,
  snapshot,
  reset,
}: CallbackInterface) => async () => {
  const pocketAmountOrigin = await snapshot.getPromise(
    calculatePocketOriginState,
  );
  const pocketAmountDestination = await snapshot.getPromise(
    calculatePocketDestinationState,
  );

  set(pocketOriginState, pocketAmountOrigin.amount);
  set(pocketDestinationState, pocketAmountDestination.amount);

  reset(amountOriginState);
  reset(amountDestinationState);

  storePocketAmount(pocketAmountOrigin.currency, pocketAmountOrigin.amount);
  storePocketAmount(
    pocketAmountDestination.currency,
    pocketAmountDestination.amount,
  );
};
