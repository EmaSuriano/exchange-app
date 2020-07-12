import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
  exchangeState,
  amountOriginState,
  amountDestinationState,
} from './recoilState';
import CurrencySelector from './components/CurrencySelector';
import ExchangeButton from './components/ExchangeButton';
import AmountInput from './components/AmountInput';

function useRefreshExchangeRate(currency: Currency) {
  const setEur = useSetRecoilState(exchangeState('EUR'));
  const setUsd = useSetRecoilState(exchangeState('USD'));
  const setGbp = useSetRecoilState(exchangeState('GBP'));
  useEffect(() => {
    setEur([
      {
        currency: 'USD',
        value: 1.2,
      },
      {
        currency: 'EUR',
        value: 1,
      },
      {
        currency: 'GBP',
        value: 0.8,
      },
    ]);

    setUsd([
      {
        currency: 'USD',
        value: 1,
      },
      {
        currency: 'EUR',
        value: 0.8,
      },
      {
        currency: 'GBP',
        value: 0.8,
      },
    ]);

    setGbp([
      {
        currency: 'USD',
        value: 1.1,
      },
      {
        currency: 'EUR',
        value: 1.2,
      },
      {
        currency: 'GBP',
        value: 1,
      },
    ]);
  }, []);

  // implement API polling
}

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

  // const setFakePockets = useFakePockets();

  // useEffect(() => {
  //   setFakePockets();
  // }, []);

  useRefreshExchangeRate(currencyOrigin);

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
    </div>
  );
};

export default App;
