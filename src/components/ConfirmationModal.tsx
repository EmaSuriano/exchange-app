import React from 'react';
import { Layer, Header, Button, Text, Box } from 'grommet';
import { FormClose } from 'grommet-icons';
import { useRecoilValue } from 'recoil';
import {
  currencyOriginState,
  currencyDestinationState,
} from '../recoil/currency';
import {
  amountOriginState,
  amountDestinationState,
  calculatePocketAmountOriginState,
  calculatePocketAmountDestinationState,
} from '../recoil/amount';
import { FormNext, Descend, Ascend } from 'grommet-icons';
import { CURRENCY_TO_TEXT } from '../utils/constant';

type Props = {
  onClose: () => any;
  onConfirm: () => any;
};

const ConfirmationModal = ({ onClose, onConfirm }: Props) => {
  const currencyOrigin = useRecoilValue(currencyOriginState);
  const currencyDestination = useRecoilValue(currencyDestinationState);

  const amountOrigin = useRecoilValue(amountOriginState);
  const amountDestination = useRecoilValue(amountDestinationState);

  const pocketAmountOrigin = useRecoilValue(calculatePocketAmountOriginState);
  const pocketAmountDestination = useRecoilValue(
    calculatePocketAmountDestinationState,
  );

  const confirmExchange = () => {
    onConfirm();
    onClose();
  };

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      animation="slide"
      modal
    >
      <Box
        direction="row"
        align="center"
        tag="header"
        elevation="small"
        justify="between"
      >
        <Text margin={{ left: 'small' }}>
          <b>Confirm Transaction</b>
        </Text>
        <Button
          icon={<FormClose />}
          a11yTitle="Close popup button"
          onClick={onClose}
        />
      </Box>
      <Box margin="medium">
        <Text>Are you sure you want to exchange the following amount?</Text>

        <Text size="xxlarge">
          <Box align="center" direction="row" margin="medium" justify="center">
            {CURRENCY_TO_TEXT[currencyOrigin]} {amountOrigin.toFixed(2)}
            <FormNext size="large" />
            {CURRENCY_TO_TEXT[currencyDestination]}{' '}
            {amountDestination.toFixed(2)}
          </Box>
        </Text>

        <Text>Status of accounts after exchange:</Text>

        <Box justify="around" direction="row" margin="medium">
          <Box direction="row" align="center" gap="small">
            <Descend />
            <Text size="large">
              <b>{currencyOrigin} Pocket</b>
              <br />
              {CURRENCY_TO_TEXT[currencyOrigin]} {pocketAmountOrigin.toFixed(2)}
            </Text>
          </Box>

          <Box direction="row" align="center" gap="small">
            <Ascend />
            <Text size="large">
              <b>{currencyDestination} Pocket</b>
              <br />
              {CURRENCY_TO_TEXT[currencyDestination]}{' '}
              {pocketAmountDestination.toFixed(2)}
            </Text>
          </Box>
        </Box>

        <Box direction="row" gap="small" justify="center">
          <Button secondary label="Cancel" onClick={onClose} />
          <Button primary label="Confirm" onClick={confirmExchange} />
        </Box>
      </Box>
    </Layer>
  );
};

export default ConfirmationModal;
