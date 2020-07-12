import React from 'react';
import { noop } from '../utils/functions';

type Props = {
  onChange?: (amount: number) => void;
  amount: number;
};

const AmountInput = ({ onChange = noop, amount }: Props) => {
  return (
    <input
      type="number"
      value={amount}
      onChange={(evt) => {
        const { value } = evt.currentTarget;
        const amount = parseFloat(value) || 0;
        onChange(amount);
      }}
    />
  );
};

export default AmountInput;
