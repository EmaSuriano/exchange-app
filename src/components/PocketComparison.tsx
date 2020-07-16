import React from 'react';
import { Text, Box } from 'grommet';
import { formatPocket } from '../utils/format';

type Props = {
  pocket: Pocket;
  origin: boolean;
};

const PocketComparison = ({ pocket, origin }: Props) => (
  <Box align="center" gap="small">
    <Text size="large" weight="bold">
      {pocket.currency} Pocket
    </Text>
    <Text size="large" color={origin ? 'status-critical' : 'status-ok'}>
      {formatPocket(pocket)}
    </Text>
  </Box>
);

export default PocketComparison;
