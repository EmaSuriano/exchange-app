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

  const onAccept = compose(onClose, onConfirm);

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      animation="slide"
      responsive={false}
      margin="small"
      modal
    >
      <ModalHeader onClose={onClose} title="Transaction Summary" />
      <Box gap="medium" pad="medium" width="500px">
        <Box>
          <Text>Are you sure you want to exchange the following amount?</Text>

          <ExchangeComparison
            origin={transactionOrigin}
            destination={transactionDestination}
          />
        </Box>

        <Box>
          <Text>Status of accounts after exchange:</Text>

          <Box justify="around" direction="row" margin="medium">
            <PocketComparison pocket={pocketOrigin} origin={true} />
            <PocketComparison pocket={pocketDestination} origin={false} />
          </Box>
        </Box>

        <Box direction="row" gap="medium" justify="center">
          <Button
            secondary
            a11yTitle="Cancel Exchange"
            label="Cancel"
            onClick={onClose}
          />
          <Button
            primary
            a11yTitle="Confirm Exchange"
            label="Confirm"
            onClick={onAccept}
          />
        </Box>
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

export default ConfirmationModal;
