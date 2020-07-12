import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { currencyOriginState, currencyDestinationState } from '../recoilState';
import { refreshExchangeRatesCallback } from '../recoil/callbacks';
import { useInterval } from '../utils/hooks';
import { POLLING_TIME } from '../utils/constant';
import {
  currentExchangeRateState,
  lastUpdateCurrentExchangeRateState,
} from '../recoil/exchange';

const ExchangeInfo = () => {
  const exchange = useRecoilValue(currentExchangeRateState);
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);
  const currencyOrigin = useRecoilValue(currencyOriginState);
  const currencyDestination = useRecoilValue(currencyDestinationState);
  const refreshExchangeRates = useRecoilCallback(refreshExchangeRatesCallback);

  if (!lastUpdate) refreshExchangeRates();

  useInterval(() => {
    refreshExchangeRates();
  }, POLLING_TIME);

  return (
    <span>
      1 {currencyOrigin} = {exchange} {currencyDestination}
    </span>
  );
};

export default ExchangeInfo;
