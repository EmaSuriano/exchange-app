import React, { ReactNode } from 'react';
import { Drop, Box } from 'grommet';

type Props = {
  target: Object;
  children: ReactNode;
  position: 'right' | 'bottom';
};

const Tooltip = ({ target, children, position }: Props) => {
  const top = position === 'bottom' ? 'bottom' : undefined;
  const left = position === 'right' ? 'right' : undefined;

  return (
    <Drop align={{ top, left }} target={target} plain>
      <Box margin="small" pad="small" background="accent-1" round="small">
        {children}
      </Box>
    </Drop>
  );
};

export default Tooltip;
