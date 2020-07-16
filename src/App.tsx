import React, { useState } from 'react';
import { useRecoilCallback } from 'recoil';
import ExchangeButton from './components/ExchangeButton';
import ExchangeInfo from './components/ExchangeInfo';
import { exchangeAmountCallback } from './recoil/amount';
import { Form, Header, Heading, Main, Box } from 'grommet';
import ConfirmationModal from './components/ConfirmationModal';
import Footer from './components/Footer';
import ExchangePanel from './components/ExchangePanel';
import { useMobileViewport } from './utils/hooks';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const exchangeCurrency = useRecoilCallback(exchangeAmountCallback);
  const mobile = useMobileViewport();

  return (
    <Main
      fill
      align="center"
      justify="center"
      pad="medium"
      background="background-front"
    >
      <Header margin="small">
        <Heading>{`💸 Exchange App 💸`}</Heading>
      </Header>

      <Form onSubmit={() => setModalVisible(true)}>
        <Box align="center" justify="center" gap="medium" margin="medium">
          <Box
            direction={mobile ? 'column' : 'row'}
            align="center"
            justify="center"
            gap="large"
          >
            <ExchangePanel origin={true} />
            <Box gap="medium" style={{ minWidth: mobile ? '100%' : '200px' }}>
              <ExchangeInfo />
              {!mobile && <ExchangeButton />}
            </Box>
            <ExchangePanel origin={false} />
          </Box>
          {mobile && <ExchangeButton />}
          <Footer />
        </Box>
      </Form>

      {modalVisible && (
        <ConfirmationModal
          onClose={() => setModalVisible(false)}
          onConfirm={exchangeCurrency}
        />
      )}
    </Main>
  );
};

export default App;
