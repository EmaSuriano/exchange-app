import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { RecoilRoot } from 'recoil';
import { initializeState } from './recoil/initializers';
import { INITIALIZE_POCKETS, EXCHANGE_MOCKS } from './utils/mocks';
import fetch from 'jest-fetch-mock';
import { getNodeText, fireEvent } from '@testing-library/dom';

const waitForAnimation = () => new Promise((r) => setTimeout(r, 1000));

const renderApp = async (state = INITIALIZE_POCKETS) => {
  const wrapper = render(
    <RecoilRoot initializeState={initializeState(state)}>
      <App />
    </RecoilRoot>,
  );

  const [pocketOrigin, pocketDestination] = await wrapper.findAllByLabelText(
    /Pocket Select/i,
  );

  const exchangeRate = await wrapper.findByLabelText('Exchange Rate');

  const [amountOrigin, amountDestination] = await wrapper.findAllByLabelText(
    /Amount Input/i,
  );

  const exchangeAmount = await wrapper.findByLabelText('Exchange Amount');

  return {
    pocketOrigin,
    pocketDestination,
    exchangeRate,
    amountOrigin,
    amountDestination,
    exchangeAmount,
    wrapper,
  };
};

describe('Integration Tests', () => {
  beforeAll(() => {
    fetch.mockResponse((req) => {
      const currency = req.url.split('base=')[1] as Currency;
      return Promise.resolve(JSON.stringify(EXCHANGE_MOCKS[currency]));
    });
  });

  it('should load pocket amounts', async () => {
    const { pocketOrigin, pocketDestination } = await renderApp();

    expect(pocketOrigin).toBeInTheDocument();
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');

    expect(pocketDestination).toBeInTheDocument();
    expect(pocketDestination.value).toBe('Euro - 50.00');
  });

  it('should load exchange rate', async () => {
    const { exchangeRate } = await renderApp();

    expect(exchangeRate).toBeInTheDocument();
    expect(getNodeText(exchangeRate)).toBe('$1 = €0.8761');
  });

  it('should swap pockets when clicking on exchange rate', async () => {
    const {
      exchangeRate,
      pocketOrigin,
      pocketDestination,
      wrapper,
    } = await renderApp();

    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(pocketDestination.value).toBe('Euro - 50.00');

    await fireEvent.click(exchangeRate);

    await wrapper.findByText('€1 = $1.1414');
    expect(pocketOrigin.value).toBe('Euro - 50.00');
    expect(pocketDestination.value).toBe('US-Dollar - 100.00');
  });

  it('should calculate exchange amount', async () => {
    const { amountOrigin, amountDestination } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '1' } });
    expect(amountDestination.value).toBe('0.88');
  });

  it('should disable exchange when amount is zero', async () => {
    const { exchangeAmount, amountOrigin } = await renderApp();

    expect(amountOrigin.value).toBe('0');
    expect(exchangeAmount.disabled).toBe(true);
  });

  it('should disable exchange when amount is greater than pocket', async () => {
    const { exchangeAmount, amountOrigin, pocketOrigin } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '110' } });
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(exchangeAmount.disabled).toBe(true);
  });

  it('should enable exchange when amount is less than pocket and not zero', async () => {
    const { exchangeAmount, amountOrigin, pocketOrigin } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '90' } });
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(exchangeAmount.disabled).toBe(false);
  });

  it('should open modal when clicking exchange', async () => {
    const { exchangeAmount, amountOrigin, wrapper } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '10' } });
    fireEvent.click(exchangeAmount);

    expect(wrapper.getByText('Transaction Summary')).toBeInTheDocument();
  });

  it('should close modal when clicking Cancel Exc hange', async () => {
    const {
      exchangeAmount,
      amountOrigin,
      amountDestination,
      pocketOrigin,
      pocketDestination,
      wrapper,
    } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '10' } });
    expect(amountOrigin.value).toBe('10');
    expect(amountDestination.value).toBe('8.76');
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(pocketDestination.value).toBe('Euro - 50.00');

    fireEvent.click(exchangeAmount);

    const cancelExchange = await wrapper.findByLabelText('Cancel Exchange');
    fireEvent.click(cancelExchange);

    await waitForAnimation();

    expect(cancelExchange).not.toBeInTheDocument();
    expect(amountOrigin.value).toBe('10');
    expect(amountDestination.value).toBe('8.76');
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(pocketDestination.value).toBe('Euro - 50.00');
  });

  it('should exchange amount and change amount in pockets', async () => {
    const {
      exchangeAmount,
      amountOrigin,
      amountDestination,
      pocketOrigin,
      pocketDestination,
      wrapper,
    } = await renderApp();

    fireEvent.change(amountOrigin, { target: { value: '10' } });
    expect(amountOrigin.value).toBe('10');
    expect(amountDestination.value).toBe('8.76');
    expect(pocketOrigin.value).toBe('US-Dollar - 100.00');
    expect(pocketDestination.value).toBe('Euro - 50.00');

    fireEvent.click(exchangeAmount);

    const confirmExchange = await wrapper.findByLabelText('Confirm Exchange');
    fireEvent.click(confirmExchange);

    await waitForAnimation();

    expect(confirmExchange).not.toBeInTheDocument();
    expect(amountOrigin.value).toBe('0');
    expect(amountDestination.value).toBe('0');
    expect(pocketOrigin.value).toBe('US-Dollar - 90.00');
    expect(pocketDestination.value).toBe('Euro - 58.76');
  });
});
