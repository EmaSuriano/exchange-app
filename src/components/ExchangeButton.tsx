import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { exchangeEnabledState } from '../recoil/exchange';
import { exchangeAmountCallback } from '../recoil/amount';

const ExchangeButton = () => {
  const enabled = useRecoilValue(exchangeEnabledState);
  const exchangeCurrency = useRecoilCallback(exchangeAmountCallback);

  return (
    <button onClick={exchangeCurrency} disabled={!enabled}>
      Exchange
    </button>
  );
};

export default ExchangeButton;
