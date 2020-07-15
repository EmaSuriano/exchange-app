import React from 'react';
import { FormNext } from 'grommet-icons';
import { Text, Box } from 'grommet';
import { formatPocket } from '../utils/format';

type Props = {
  origin: ExchangeTransaction;
  destination: ExchangeTransaction;
};

const ExchangeComparison = ({ origin, destination }: Props) => (
  <Text size="xxlarge">
    <Box align="center" direction="row" margin="medium" justify="center">
      {formatPocket(origin)}
      <FormNext size="large" />
      {formatPocket(destination)}
    </Box>
  </Text>
);

export default ExchangeComparison;
