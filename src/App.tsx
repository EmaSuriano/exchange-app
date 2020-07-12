import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
  exchangeState,
  pocketState,
  amountOriginState,
  amountDestinationState,
} from './recoilState';
import CurrencySelector from './components/CurrencySelector';
import ExchangeButton from './components/ExchangeButton';

const EXCHANGE_RATES: ExchangeRate[] = [
  {
    currency: 'USD',
    value: 0.8,
  },
  {
    currency: 'EUR',
    value: 1,
  },
  {
    currency: 'GBP',
    value: 0.8,
  },
];

function useFakeData() {
  const setEur = useSetRecoilState(pocketState('EUR'));
  const setUsd = useSetRecoilState(pocketState('USD'));
  const setGbp = useSetRecoilState(pocketState('GBP'));

  useEffect(() => {
    setEur(100);
    setUsd(50);
    setGbp(0);
  }, []);
}

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

  useRefreshExchangeRate(currencyOrigin);
  useFakeData();

  return (
    <div>
      <h1>Exchange App</h1>
      <div style={{ display: 'flex' }}>
        <CurrencySelector
          currency={currencyOrigin}
          onChange={setCurrencyOrigin}
        />

        <input
          type="number"
          value={amountOrigin}
          onChange={(evt) => {
            const { value } = evt.currentTarget;
            const amount = parseFloat(value) || 0;
            setAmountOrigin(amount);
          }}
        />
      </div>

      <div>
        <CurrencySelector
          currency={currencyDestination}
          onChange={setCurrencyDestination}
        />

        <input
          type="number"
          value={amountDestination}
          onChange={(evt) => {
            const { value } = evt.currentTarget;
            setAmountDestination(parseFloat(value) || 0);
          }}
        />
      </div>

      <ExchangeButton />
    </div>
  );
};

export default App;
