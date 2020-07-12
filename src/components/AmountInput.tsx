import React from 'react';
import { noop } from '../utils/functions';

type Props = {
  onChange?: (amount: number) => void;
  amount: number;
};

const AmountInput = ({ onChange = noop, amount }: Props) => {
  return (
    <span>
      <input
        type="number"
        value={amount}
        onChange={(evt) => {
          const { value } = evt.currentTarget;
          const amount = parseFloat(value) || 0;
          onChange(amount);
        }}
      />
      <button onClick={() => onChange(0)}>Clear</button>
    </span>
  );
};

export default AmountInput;
