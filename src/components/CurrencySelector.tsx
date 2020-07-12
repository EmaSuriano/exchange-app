import React from 'react';
import { noop } from '../utils/functions';
import { useRecoilValue } from 'recoil';
import { pocketListState, pocketState } from '../recoilState';

type Props = {
  onChange?: (curr: Currency) => void;
  currency: Currency;
};

const CurrencySelector = ({ onChange = noop, currency }: Props) => {
  const pocketList = useRecoilValue(pocketListState);
  const pocketAmount = useRecoilValue(pocketState(currency));

  return (
    <div>
      <select
        value={currency}
        onChange={(evt) => onChange(evt.currentTarget.value as Currency)}
      >
        {pocketList.map((curr) => (
          <option value={curr.currency} key={curr.currency}>
            {curr.name} - {curr.amount}
          </option>
        ))}
      </select>
      {pocketAmount}
    </div>
  );
};

export default CurrencySelector;
