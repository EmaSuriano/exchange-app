import React, { useState } from 'react';
import { noop } from '../utils/functions';
import { FormField, MaskedInput, Text } from 'grommet';
import {
  DECIMAL_SEPARATOR,
  CURRENCY_TO_TEXT,
  MAX_AMOUNT_EXCHANGE,
} from '../utils/constant';
import { formatAmount } from '../utils/format';

type Props = {
  onChange?: (amount: number) => void;
  amount: number;
  label: string;
  currency: Currency;
};

const AmountInput = ({ onChange = noop, amount, currency, label }: Props) => {
  const [decimalSeparator, setDecimalSeparator] = useState(false);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setDecimalSeparator(value.endsWith(DECIMAL_SEPARATOR));
    const newAmount = parseFloat(value) || 0;

    if (newAmount === amount || newAmount > MAX_AMOUNT_EXCHANGE) return;

    onChange(newAmount);
  };

  const containSeparator = amount % 1 !== 0;
  const value =
    !containSeparator && decimalSeparator
      ? `${amount}${DECIMAL_SEPARATOR}`
      : formatAmount(amount);

  return (
    <FormField label={label}>
      <MaskedInput
        aria-label="Amount Input"
        size="xxlarge"
        value={value}
        icon={<Text size="xxlarge">{CURRENCY_TO_TEXT[currency]}</Text>}
        mask={MASK_INPUT}
        onChange={onInputChange}
      />
    </FormField>
  );
};

const MASK_INPUT = [
  {
    regexp: /^[0-9]*$/,
    placeholder: '0',
  },
  { fixed: DECIMAL_SEPARATOR },
  {
    length: 2,
    regexp: /^[0-9]*$/,
    placeholder: '00',
  },
];

export default AmountInput;
