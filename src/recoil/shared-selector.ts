import { selector } from 'recoil';
import { amountOriginState, amountDestinationState } from './amount';
import { currencyOriginState, currencyDestinationState } from './currency';
import { pocketOriginState, pocketDestinationState } from './pocket';

export const transactionOriginState = selector<ExchangeTransaction>({
  key: 'transactionOriginState',
  get: ({ get }) => ({
    amount: get(amountOriginState),
    currency: get(currencyOriginState),
  }),
});

export const transactionDestinationState = selector<ExchangeTransaction>({
  key: 'transactionDestinationState',
  get: ({ get }) => ({
    amount: get(amountDestinationState),
    currency: get(currencyDestinationState),
  }),
});

export const calculatePocketOriginState = selector<Pocket>({
  key: 'calculatePocketOriginState',
  get: ({ get }) => ({
    currency: get(currencyOriginState),
    amount: get(pocketOriginState) + get(amountOriginState),
  }),
});

export const calculatePocketDestinationState = selector<Pocket>({
  key: 'calculatePocketDestinationState',
  get: ({ get }) => ({
    currency: get(currencyDestinationState),
    amount: get(pocketDestinationState) + get(amountDestinationState),
  }),
});
