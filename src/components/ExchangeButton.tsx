import React from 'react';
import { useRecoilValue } from 'recoil';
import { exchangeEnabledState } from '../recoil/exchange';
import { Button } from 'grommet';
import { Update } from 'grommet-icons';
import { useMobileViewport } from '../utils/hooks';

const ExchangeButton = () => {
  const disabled = !useRecoilValue(exchangeEnabledState);
  const mobile = useMobileViewport();
  return (
    <Button
      size="large"
      gap="medium"
      type="submit"
      a11yTitle="Exchange amount"
      disabled={disabled}
      label="Exchange"
      icon={<Update />}
      fill={mobile && 'horizontal'}
      primary
    />
  );
};

export default ExchangeButton;
