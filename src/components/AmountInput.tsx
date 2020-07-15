import React, { useState } from 'react';
import { noop } from '../utils/functions';
import { FormField, MaskedInput, Text } from 'grommet';
import { DECIMAL_SEPARATOR, CURRENCY_TO_TEXT } from '../utils/constant';

type Props = {
  onChange?: (amount: number) => void;
  amount: number;
  currency: Currency;
};

const AmountInput = ({ onChange = noop, amount, currency }: Props) => {
  const [decimalSeparator, setDecimalSeparator] = useState(false);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setDecimalSeparator(value.endsWith(DECIMAL_SEPARATOR));
    const newAmount = parseFloat(value) || 0;
    if (newAmount !== amount) onChange(newAmount);
  };

  const value = `${amount}${decimalSeparator ? DECIMAL_SEPARATOR : ''}`;

  return (
    <FormField label="From">
      <MaskedInput
        value={value}
        icon={<Text>{CURRENCY_TO_TEXT[currency]}</Text>}
        mask={[
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
        ]}
        onChange={onInputChange}
      />
    </FormField>
  );
};

export default AmountInput;
