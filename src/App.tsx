import React from 'react';
import { useRecoilState } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
  amountOriginState,
  amountDestinationState,
} from './recoilState';

import CurrencySelector from './components/CurrencySelector';
import ExchangeButton from './components/ExchangeButton';
import AmountInput from './components/AmountInput';
import ExchangeInfo from './components/ExchangeInfo';
import SwapPocketsButton from './components/SwapPocketsButton';
import LastUpdateExchangeRate from './components/LastUpdateExchangeRate';

const App = () => {
  const [currencyOrigin, setCurrencyOrigin] = useRecoilState(
    currencyOriginState,
  );

  const [currencyDestination, setCurrencyDestination] = useRecoilState(
    currencyDestinationState,
  );

  const [amountOrigin, setAmountOrigin] = useRecoilState(amountOriginState);
  const [amountDestination, setAmountDestination] = useRecoilState(
    amountDestinationState,
  );

  return (
    <div>
      <h1>Exchange App</h1>
      <div style={{ display: 'flex' }}>
        <CurrencySelector
          currency={currencyOrigin}
          onChange={setCurrencyOrigin}
        />

        <AmountInput amount={amountOrigin} onChange={setAmountOrigin} />
      </div>

      <div>
        <SwapPocketsButton />
        <ExchangeInfo />
      </div>

      <div>
        <CurrencySelector
          currency={currencyDestination}
          onChange={setCurrencyDestination}
        />

        <AmountInput
          amount={amountDestination}
          onChange={setAmountDestination}
        />
      </div>

      <ExchangeButton />
      <LastUpdateExchangeRate />
    </div>
  );
};

export default App;
