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
import { FormField, Text } from 'grommet';
import { formatExchange } from '../utils/format';

const ExchangeInfo = () => {
  const exchange = useRecoilValue(currentExchangeRateState);
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);
  const currencyOrigin = useRecoilValue(currencyOriginState);
  const currencyDestination = useRecoilValue(currencyDestinationState);

  const exchangeMap = {
    amount: exchange,
    currency: currencyDestination,
  };

  const refreshExchangeRates = useRecoilCallback(refreshExchangeRatesCallback);

  if (!lastUpdate) refreshExchangeRates();

  useInterval(() => {
    refreshExchangeRates();
  }, POLLING_TIME);

  return (
    <FormField label="Exchange Rate">
      <Text margin="small" weight="bold">
        {CURRENCY_TO_TEXT[currencyOrigin]} 1 = {formatExchange(exchangeMap)}
      </Text>
    </FormField>
  );
};

export default ExchangeInfo;
