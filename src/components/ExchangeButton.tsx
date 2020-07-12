import React from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import {
  exchangeEnabledState,
  currencyOriginState,
  currencyDestinationState,
  pocketState,
  amountOriginState,
  amountDestinationState,
} from '../recoilState';

type Props = {};

const useExchangeCurrency = () => {
  const [pocketOrigin, setPocketOrigin] = useRecoilState(
    pocketState(useRecoilValue(currencyOriginState)),
  );
  const [pocketDestination, setPocketDestination] = useRecoilState(
    pocketState(useRecoilValue(currencyDestinationState)),
  );
  const [amountOrigin, setAmountOrigin] = useRecoilState(amountOriginState);
  const [amountDestination, setAmountDestination] = useRecoilState(
    amountDestinationState,
  );
  return () => {
    setPocketOrigin(pocketOrigin - amountOrigin);
    setPocketDestination(pocketDestination + amountDestination);

    setAmountOrigin(0);
    setAmountDestination(0);
  };
};

const ExchangeButton = (props: Props) => {
  const enabled = useRecoilValue(exchangeEnabledState);
  const exchangeCurrency = useExchangeCurrency();

  return (
    <button onClick={exchangeCurrency} disabled={!enabled}>
      Exchange
    </button>
  );
};

export default ExchangeButton;
