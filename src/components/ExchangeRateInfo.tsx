import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  exchangeRateState,
  currencyOriginState,
  currencyDestinationState,
} from '../recoilState';

const ExchangeRateInfo = () => {
  const exchangeRate = useRecoilValue(exchangeRateState);
  const currencyOrigin = useRecoilValue(currencyOriginState);
  const currencyDestination = useRecoilValue(currencyDestinationState);

  return (
    <span>
      1 {currencyOrigin} = {exchangeRate} {currencyDestination}
    </span>
  );
};

export default ExchangeRateInfo;
