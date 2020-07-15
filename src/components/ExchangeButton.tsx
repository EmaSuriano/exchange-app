import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { exchangeEnabledState } from '../recoil/exchange';
import { exchangeAmountCallback } from '../recoil/amount';

const ExchangeButton = () => {
  const enabled = useRecoilValue(exchangeEnabledState);

  return (
    <button type="submit" disabled={!enabled}>
      Exchange
    </button>
  );
};

export default ExchangeButton;
