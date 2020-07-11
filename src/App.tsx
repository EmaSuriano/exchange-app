import React from 'react';
import { useRecoilState } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
  amountState,
} from './recoilState';
import CurrencySelector from './components/CurrencySelector';

const App = () => {
  const [currencyOrigin, setCurrencyOrigin] = useRecoilState(
    currencyOriginState,
  );

  const [currencyDestination, setCurrencyDestination] = useRecoilState(
    currencyDestinationState,
  );

  // const [amount, setAmount] = useRecoilState(amountState);

  const swapCurrency = () => {
    setCurrencyOrigin(currencyDestination);
    setCurrencyDestination(currencyOrigin);
  };

  return (
    <div>
      <h1>Exchange App</h1>

      <CurrencySelector
        currency={currencyOrigin}
        onChange={(curr) =>
          curr === currencyDestination
            ? swapCurrency()
            : setCurrencyOrigin(curr)
        }
      />

      {/* <input
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount === 0 ? '' : amount}
        onKeyDown={(evt) => [190].includes(evt.keyCode) && evt.preventDefault()}
        onChange={(evt) => {
          const NUMERIC_REGEX = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
          const { value } = evt.currentTarget;

          if (!value || NUMERIC_REGEX.test(value)) {
            setAmount(parseFloat(value) || 0);
          }
        }}
      /> */}

      <CurrencySelector
        currency={currencyDestination}
        onChange={(curr) =>
          curr === currencyOrigin
            ? swapCurrency()
            : setCurrencyDestination(curr)
        }
      />
    </div>
  );
};

export default App;
