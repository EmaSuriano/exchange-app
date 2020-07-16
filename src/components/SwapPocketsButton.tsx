import React, { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import { swapPocketsCallback } from '../recoil/pocket';
import { Button, Box } from 'grommet';
import { RotateLeft } from 'grommet-icons';
import styled, { keyframes } from 'styled-components';
import { ANIMATION_DURATION } from '../utils/constant';

const SwapPocketsButton = () => {
  const swapPockets = useRecoilCallback(swapPocketsCallback);
  const [rotate, setRotate] = useState(false);

  const onClick = () => {
    setRotate(true);
    swapPockets();
    setTimeout(() => setRotate(false), ANIMATION_DURATION);
  };

  return (
    <Button
      onClick={onClick}
      icon={
        <RotateBox rotate={rotate}>
          <RotateLeft color="white" />
        </RotateBox>
      }
      a11yTitle="Swap Pockets"
      primary
    />
  );
};

const rotateAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const RotateBox = styled(Box)<{ rotate: boolean }>`
  animation: ${rotateAnimation}
    ${(props) => (props.rotate ? ANIMATION_DURATION : 0)}ms linear infinite;
`;

export default SwapPocketsButton;
