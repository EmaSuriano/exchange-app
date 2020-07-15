import React, { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import ExchangeButton from './components/ExchangeButton';
import ExchangeInfo from './components/ExchangeInfo';
import { exchangeAmountCallback } from './recoil/amount';
import { Form, Header, Heading, Main, Box } from 'grommet';
import ConfirmationModal from './components/ConfirmationModal';
import Footer from './components/Footer';
import SwapPocketsButton from './components/SwapPocketsButton';
import ExchangePanel from './components/ExchangePanel';
import { useMobileViewport } from './utils/hooks';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const exchangeCurrency = useRecoilCallback(exchangeAmountCallback);
  const mobile = useMobileViewport();

  return (
    <Main fill align="center" justify="center" pad={{ horizontal: 'medium' }}>
      <Header>
        <Heading>Exchange App</Heading>
      </Header>

      <Form onSubmit={() => setModalVisible(true)}>
        <Box
          direction={mobile ? 'column' : 'row'}
          align="center"
          justify="center"
          pad="medium"
          gap="medium"
        >
          <ExchangePanel origin={true} />
          <SwapPocketsButton />
          <ExchangePanel origin={false} />
        </Box>

        <Box align="center" justify="center" pad="medium" direction="row">
          <ExchangeButton />
          <ExchangeInfo />
        </Box>
      </Form>

      {modalVisible && (
        <ConfirmationModal
          onClose={() => setModalVisible(false)}
          onConfirm={exchangeCurrency}
        />
      )}

      <Footer />
    </Main>
  );
};

export default App;
