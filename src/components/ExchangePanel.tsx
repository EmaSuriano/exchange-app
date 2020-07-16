import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { amountOriginState, amountDestinationState } from '../recoil/amount';
import {
  currencyOriginState,
  currencyDestinationState,
} from '../recoil/currency';
import { Box } from 'grommet';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import { pocketListState } from '../recoil/pocket';
import { DECIMAL_AMOUNT_SUMMARY } from '../utils/constant';

type Props = {
  origin: boolean;
};

const ExchangePanel = ({ origin }: Props) => {
  const [currency, setCurrency] = useRecoilState(
    origin ? currencyOriginState : currencyDestinationState,
  );
  const [amount, setAmount] = useRecoilState(
    origin ? amountOriginState : amountDestinationState,
  );
  const pocketList = useRecoilValue(pocketListState);

  const options = pocketList.map(({ name, amount, currency }) => ({
    label: `${name} - ${amount.toFixed(DECIMAL_AMOUNT_SUMMARY)}`,
    value: currency,
  }));

  const label = origin ? 'Exchange' : 'Receive';
  const testId = origin ? 'panel-origin' : 'panel-destination';

  return (
    <Box gap="small" data-testid={testId}>
      <CurrencySelector
        currency={currency}
        onChange={setCurrency}
        options={options}
      />

      <AmountInput
        label={label}
        amount={amount}
        onChange={setAmount}
        currency={currency}
      />
    </Box>
  );
};

export default ExchangePanel;
