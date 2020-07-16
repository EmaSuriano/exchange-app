import { atom, selector, DefaultValue } from 'recoil';
import { ORIGIN_INDEX, DESTINATION_INDEX } from '../utils/constant';
import { amountState } from './amount';

const currencyState = atom<Currency[]>({
  key: 'currencyState',
  default: ['USD', 'EUR'],
});

const currencyStateCreator = (origin: boolean) => {
  const index = origin ? ORIGIN_INDEX : DESTINATION_INDEX;
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
