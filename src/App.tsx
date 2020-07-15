import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
} from './recoil/currency';

import CurrencySelector from './components/CurrencySelector';
import ExchangeButton from './components/ExchangeButton';
import AmountInput from './components/AmountInput';
import ExchangeInfo from './components/ExchangeInfo';
import SwapPocketsButton from './components/SwapPocketsButton';
import LastUpdateExchangeRate from './components/LastUpdateExchangeRate';
import {
  amountOriginState,
  amountDestinationState,
  exchangeAmountCallback,
} from './recoil/amount';
import {
  Box,
  Form,
  Header,
  Text,
  Heading,
  Button,
  Footer,
  Anchor,
} from 'grommet';
import { swapPocketsCallback } from './recoil/pocket';
import ConfirmationModal from './components/ConfirmationModal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(true);
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

  const exchangeCurrency = useRecoilCallback(exchangeAmountCallback);
  const swapPockets = useRecoilCallback(swapPocketsCallback);

  return (
    <Box fill align="center" justify="center">
      <Header>
        <Heading>Exchange App</Heading>
      </Header>

      <Form onSubmit={() => setModalVisible(true)}>
        <div style={{ display: 'flex' }}>
          <CurrencySelector
            currency={currencyOrigin}
            onChange={setCurrencyOrigin}
          />

          <AmountInput
            amount={amountOrigin}
            onChange={setAmountOrigin}
            currency={currencyOrigin}
          />
        </div>

        <div>
          <Button onClick={swapPockets} primary label="Swap Pockets" />
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
            currency={currencyDestination}
          />
        </div>

        <ExchangeButton />
      </Form>

      {modalVisible && (
        <ConfirmationModal
          onClose={() => setModalVisible(false)}
          onConfirm={exchangeCurrency}
        />
      )}

      <Footer>
        <LastUpdateExchangeRate />
        <Text>
          Made by{' '}
          <Anchor href="https://github.com/EmaSuriano">EmaSuriano</Anchor>
        </Text>
      </Footer>
    </Box>
  );
};

export default App;
