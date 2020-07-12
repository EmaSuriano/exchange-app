import { MutableSnapshot } from 'recoil';
import { pocketState } from './pocket';

// initializers
export const setFakeData = ({ set }: MutableSnapshot) => {
  set(pocketState('EUR'), 100);
  set(pocketState('USD'), 50);
  set(pocketState('GBP'), 0);
};
