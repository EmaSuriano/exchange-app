import React from 'react';
import { useRecoilValue } from 'recoil';
import { lastUpdateCurrentExchangeRateState } from '../recoil/exchange';
import { Text } from 'grommet';

const LastUpdateExchangeRate = () => {
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);

  return <Text>Last Update Exchange Rate: {lastUpdate}</Text>;
};

export default LastUpdateExchangeRate;
