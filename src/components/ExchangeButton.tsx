import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { exchangeAmountCallback } from '../recoil/callbacks';
import { exchangeEnabledState } from '../recoil/exchange';

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
