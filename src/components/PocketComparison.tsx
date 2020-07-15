import React from 'react';
import { Text, Box } from 'grommet';
import { formatPocket } from '../utils/format';

type Props = {
  origin: Pocket;
  destination: Pocket;
};

const PocketComparison = ({ origin, destination }: Props) => (
  <Box justify="around" direction="row" margin="medium">
    <Box align="center">
      <Text size="large" weight="bold">
        {origin.currency} Pocket
      </Text>
      <Text size="large" color="red">
        {formatPocket(origin)}
      </Text>
    </Box>

    <Box align="center">
      <Text size="large" weight="bold">
        {destination.currency} Pocket
      </Text>
      <Text size="large" color="green">
        {formatPocket(destination)}
      </Text>
    </Box>
  </Box>
);

export default PocketComparison;
