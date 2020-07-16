import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
} from '../recoil/currency';
import { useInterval } from '../utils/hooks';
import { POLLING_TIME, CURRENCY_TO_TEXT } from '../utils/constant';
import {
  currentExchangeRateState,
  lastUpdateCurrentExchangeRateState,
  refreshExchangeRatesCallback,
} from '../recoil/exchange';
import { Button } from 'grommet';
import { formatExchange } from '../utils/format';
import { swapPocketsCallback } from '../recoil/pocket';

const ExchangeInfo = () => {
  const exchange = useRecoilValue(currentExchangeRateState);
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);
  const currencyOrigin = useRecoilValue(currencyOriginState);
  const currencyDestination = useRecoilValue(currencyDestinationState);
  const refreshExchangeRates = useRecoilCallback(refreshExchangeRatesCallback);
  const swapPockets = useRecoilCallback(swapPocketsCallback);

  if (!lastUpdate) refreshExchangeRates();

  useInterval(() => {
    refreshExchangeRates();
  }, POLLING_TIME);

  const label = `${CURRENCY_TO_TEXT[currencyOrigin]}1 = ${formatExchange({
    amount: exchange,
    currency: currencyDestination,
  })}`;

  return (
    <Button onClick={swapPockets} color="accent-1" label={label} primary />
  );
};

export default ExchangeInfo;
