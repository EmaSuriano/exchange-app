import { atomFamily, selector, CallbackInterface } from 'recoil';
import { currencyOriginState, currencyDestinationState } from './currency';
import { EXCHANGE_INFORMATION } from '../utils/constant';
import { pocketOriginState } from './pocket';
import { amountOriginState } from './amount';

const DEFAULT_EXCHANGE_RATE = {
  exchange: {
    USD: 0,
    EUR: 0,
    GBP: 0,
  },
  lastUpdate: null,
};

export const exchangeRateState = atomFamily<ExchangeRate, Currency>({
  key: 'exchangeRateState',
  default: DEFAULT_EXCHANGE_RATE,
});

// selector
export const exchangeEnabledState = selector({
  key: 'exchangeEnabledState',
  get: ({ get }) =>
    get(exchangeInformationState) === EXCHANGE_INFORMATION.POSSIBLE,
});

export const exchangeInformationState = selector({
  key: 'exchangeInformationState',
  get: ({ get }) => {
    const amountOrigin = get(amountOriginState);
    const pocketOrigin = get(pocketOriginState);
    const lastUpdate = get(lastUpdateCurrentExchangeRateState);

    if (amountOrigin === 0) return EXCHANGE_INFORMATION.AMOUNT_NOT_SPECIFY;

    if (pocketOrigin < amountOrigin)
      return EXCHANGE_INFORMATION.INSUFFICIENT_AMOUNT;

    if (!lastUpdate) return EXCHANGE_INFORMATION.EXCHANGE_RATE_NOT_FOUND;

    return EXCHANGE_INFORMATION.POSSIBLE;
  },
});

export const currentExchangeRateState = selector({
  key: 'currentExchangeRateState',
  get: ({ get }) => {
    const currencyOrigin = get(currencyOriginState);
    const currencyDestination = get(currencyDestinationState);

    const { exchange } = get(exchangeRateState(currencyOrigin));
    return exchange[currencyDestination];
  },
});

export const lastUpdateCurrentExchangeRateState = selector({
  key: 'lastUpdateCurrentExchangeRateState',
  get: ({ get }) => {
    const currencyOrigin = get(currencyOriginState);

    return get(exchangeRateState(currencyOrigin)).lastUpdate;
  },
});

// callbacks
export const refreshExchangeRatesCallback = ({
  set,
  snapshot,
}: CallbackInterface) => async () => {
  const currency = await snapshot.getPromise(currencyOriginState);
  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${currency}`,
    );
    const { rates, date } = (await response.json()) as ExchangeResponse;

    set(exchangeRateState(currency), { exchange: rates, lastUpdate: date });
  } catch (err) {
    console.error('There was an error while trying to get exchange Rates ...');
  }
};
