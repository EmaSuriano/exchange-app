import { MutableSnapshot } from 'recoil';
import { pocketState } from './pocket';
import { restorePocketAmount } from '../utils/local-storage';

// initializers
export const initializeState = ({ set }: MutableSnapshot) => {
  set(pocketState('EUR'), restorePocketAmount('EUR'));
  set(pocketState('USD'), restorePocketAmount('USD'));
  set(pocketState('GBP'), restorePocketAmount('GBP'));
};
