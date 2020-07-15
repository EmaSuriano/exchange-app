import React from 'react';
import { useRecoilValue } from 'recoil';
import { lastUpdateCurrentExchangeRateState } from '../recoil/exchange';
import { Text, Box, Anchor } from 'grommet';
import { useMobileViewport } from '../utils/hooks';

const Footer = () => {
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);
  const mobile = useMobileViewport();

  return (
    <Box
      as="footer"
      direction={mobile ? 'column' : 'row'}
      align="center"
      justify="between"
      fill="horizontal"
    >
      <Text>Exchange Rate Update: {lastUpdate}</Text>
      <Text>
        Made by <Anchor href="https://github.com/EmaSuriano">EmaSuriano</Anchor>
      </Text>
    </Box>
  );
};

export default Footer;
