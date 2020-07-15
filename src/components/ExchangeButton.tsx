import React from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { exchangeEnabledState } from '../recoil/exchange';
import { exchangeAmountCallback } from '../recoil/amount';
import { Button } from 'grommet';

const ExchangeButton = () => {
  const enabled = useRecoilValue(exchangeEnabledState);

  return (
    <Button primary type="submit" disabled={!enabled} label="Exchange"></Button>
  );
};

export default ExchangeButton;
