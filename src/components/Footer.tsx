import React, { useState, useRef, Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { lastUpdateCurrentExchangeRateState } from '../recoil/exchange';
import { Text, Box, Anchor } from 'grommet';
import { useMobileViewport } from '../utils/hooks';
import Tooltip from './Tooltip';

const Footer = () => {
  const lastUpdate = useRecoilValue(lastUpdateCurrentExchangeRateState);
  const mobile = useMobileViewport();

  const [over, setOver] = useState(false);
  const ref = useRef(null);

  return (
    <Fragment>
      <Box
        as="footer"
        fill="horizontal"
        gap="medium"
        justify="between"
        direction={mobile ? 'column' : 'row'}
      >
        <Box
          ref={ref}
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          <Text textAlign="center">
            Rates provided by{' '}
            <Anchor href="https://exchangeratesapi.io/">
              Exchange Rates API
            </Anchor>
          </Text>
        </Box>

        <Text textAlign="center">
          Made by{' '}
          <Anchor href="https://github.com/EmaSuriano">EmaSuriano</Anchor>
        </Text>
      </Box>

      {ref.current && over && (
        <Tooltip target={ref.current!} position={mobile ? 'bottom' : 'right'}>
          <Text textAlign="center">
            Last update: <b>{lastUpdate}</b>
          </Text>
        </Tooltip>
      )}
    </Fragment>
  );
};

export default Footer;
