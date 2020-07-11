import React from 'react';
import { noop } from '../utils/functions';
import { useRecoilValue } from 'recoil';
import {
  currencyListWithAmountState,
  currencyAmountState,
} from '../recoilState';

type Props = {
  onChange?: (curr: Currency) => void;
  currency: Currency;
};

const CurrencySelector = ({ onChange = noop, currency }: Props) => {
  const currencyList = useRecoilValue(currencyListWithAmountState);
  const amountOrigin = useRecoilValue(currencyAmountState(currency));

  return (
    <div>
      <select
        value={currency}
        onChange={(evt) => onChange(evt.currentTarget.value as Currency)}
      >
        {currencyList.map((curr) => (
          <option value={curr.currency}>
            {curr.name} - {curr.amount}
          </option>
        ))}
      </select>
      {amountOrigin}
    </div>
  );
};

export default CurrencySelector;
