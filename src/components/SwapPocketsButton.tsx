import React from 'react';
import { useRecoilCallback } from 'recoil';
import { swapPocketsCallback } from '../recoil/pocket';

const SwapPocketsButton = () => {
  const swapPockets = useRecoilCallback(swapPocketsCallback);

  return <button onClick={swapPockets}>Swap Pockets</button>;
};

export default SwapPocketsButton;
