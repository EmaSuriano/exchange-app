import { MutableSnapshot } from 'recoil';
import { pocketState } from './pocket';
import { restorePocketAmount } from '../utils/local-storage';

// initializers
export const restoreState = () => ({
  EUR: restorePocketAmount('EUR'),
  USD: restorePocketAmount('USD'),
  GBP: restorePocketAmount('GBP'),
});

export const initializeState = (state: Record<Currency, number>) => ({
  set,
}: MutableSnapshot) => {
  set(pocketState('EUR'), state.EUR);
  set(pocketState('USD'), state.USD);
  set(pocketState('GBP'), state.GBP);
};
