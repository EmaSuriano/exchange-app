import React from 'react';
import { noop } from '../utils/functions';
import { Select } from 'grommet';

type Props = {
  onChange?: (curr: Currency) => void;
  currency: Currency;
  options: { label: string; value: Currency }[];
};

const CurrencySelector = ({ onChange = noop, options, currency }: Props) => {
  return (
    <Select
      a11yTitle="Pocket Select"
      value={currency}
      options={options}
      labelKey="label"
      valueKey={{ key: 'value', reduce: true }}
      onChange={({ value }) => onChange(value as Currency)}
    />
  );
};

export default CurrencySelector;
