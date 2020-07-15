import React from 'react';
import { useRecoilCallback } from 'recoil';
import { swapPocketsCallback } from '../recoil/pocket';
import { Button } from 'grommet';
import { RotateLeft } from 'grommet-icons';

const SwapPocketsButton = () => {
  const swapPockets = useRecoilCallback(swapPocketsCallback);

  return (
    <Button
      onClick={swapPockets}
      primary
      icon={<RotateLeft />}
      a11yTitle="Swap Pockets"
    />
  );
};

export default SwapPocketsButton;
