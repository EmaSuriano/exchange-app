import React from 'react';
import { Layer, Button, Text, Box } from 'grommet';
import { useRecoilValue } from 'recoil';
import { FormClose } from 'grommet-icons';
import { compose } from '../utils/functions';
import ExchangeComparison from './ExchangeComparison';
import {
  transactionOriginState,
  transactionDestinationState,
  calculatePocketOriginState,
  calculatePocketDestinationState,
} from '../recoil/shared-selector';
import PocketComparison from './PocketComparison';

type Props = {
  onClose: () => any;
  onConfirm: () => any;
};

const ConfirmationModal = ({ onClose, onConfirm }: Props) => {
  const transactionOrigin = useRecoilValue(transactionOriginState);
  const transactionDestination = useRecoilValue(transactionDestinationState);

  const pocketOrigin = useRecoilValue(calculatePocketOriginState);
  const pocketDestination = useRecoilValue(calculatePocketDestinationState);

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      animation="slide"
      modal
    >
      <ModalHeader onClose={onClose} title="Confirm Transaction" />
      <Box margin="medium">
        <Text>Are you sure you want to exchange the following amount?</Text>

        <ExchangeComparison
          origin={transactionOrigin}
          destination={transactionDestination}
        />

        <Text>Status of accounts after exchange:</Text>

        <PocketComparison
          origin={pocketOrigin}
          destination={pocketDestination}
        />

        <ModalFooter onClose={onClose} onConfirm={onConfirm} />
      </Box>
    </Layer>
  );
};

type ModalHeaderProps = {
  onClose: () => void;
  title: string;
};

const ModalHeader = ({ onClose, title }: ModalHeaderProps) => (
  <Box
    direction="row"
    align="center"
    tag="header"
    elevation="small"
    justify="between"
  >
    <Text margin="small" weight="bold">
      {title}
    </Text>
    <Button icon={<FormClose />} a11yTitle="Close button" onClick={onClose} />
  </Box>
);

const ModalFooter = ({ onClose, onConfirm }: Props) => {
  const onAccept = compose(onClose, onConfirm);

  return (
    <Box direction="row" gap="medium" justify="center">
      <Button secondary label="Cancel" onClick={onClose} />
      <Button primary label="Confirm" onClick={onAccept} />
    </Box>
  );
};

export default ConfirmationModal;
