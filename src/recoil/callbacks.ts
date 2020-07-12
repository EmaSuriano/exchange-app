import { CallbackInterface } from 'recoil';
import {
  amountOriginState,
  amountDestinationState,
  currencyOriginState,
  currencyDestinationState,
} from '../recoilState';
import { exchangeRateState } from './exchange';
import { pocketOriginState, pocketDestinationState } from './pocket';

// callbacks
export const exchangeAmountCallback = ({
  set,
  snapshot,
  reset,
}: CallbackInterface) => async () => {
  const pocketOrigin = await snapshot.getPromise(pocketOriginState);
  const pocketDestination = await snapshot.getPromise(pocketDestinationState);

  const amountOrigin = await snapshot.getPromise(amountOriginState);
  const amountDestination = await snapshot.getPromise(amountDestinationState);

  set(pocketOriginState, pocketOrigin - amountOrigin);
  set(pocketDestinationState, pocketDestination + amountDestination);

  reset(amountOriginState);
  reset(amountDestinationState);
};

export const swapPocketsCallback = ({
  set,
  snapshot,
}: CallbackInterface) => async () => {
  const currencyDestination = await snapshot.getPromise(
    currencyDestinationState,
  );

  set(currencyOriginState, currencyDestination);
};

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
