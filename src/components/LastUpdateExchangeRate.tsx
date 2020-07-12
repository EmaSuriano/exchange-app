import React from 'react';
import { useRecoilValue } from 'recoil';
import { lastUpdateCurrentExchangeRateState } from '../recoil/exchange';

const LastUpdateExchangeRate = () => {
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);

  return <div>Last Update Exchange Rate: {lastUpdate}</div>;
};

export default LastUpdateExchangeRate;
