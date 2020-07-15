import React, { ReactNode } from 'react';
import { Drop, Box } from 'grommet';

type Props = {
  target: Object;
  children: ReactNode;
};

const Tooltip = ({ target, children }: Props) => (
  <Drop
    align={{
      left: 'right',
    }}
    target={target}
    plain
  >
    <Box margin="xsmall" pad="small" background="accent-3" round="medium">
      {children}
    </Box>
  </Drop>
);

export default Tooltip;
