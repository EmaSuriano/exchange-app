import React from 'react';
import { useRecoilValue } from 'recoil';
import { exchangeEnabledState } from '../recoil/exchange';
import { Button } from 'grommet';

const ExchangeButton = () => {
  const disabled = !useRecoilValue(exchangeEnabledState);

  return (
    <Button
      size="large"
      primary
      type="submit"
      a11yTitle="Exchange amount"
      disabled={disabled}
      label="Exchange"
    />
  );
};

export default ExchangeButton;
