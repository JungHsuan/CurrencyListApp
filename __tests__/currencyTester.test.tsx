import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CurrencyTester from '../src/components/CurrencyTester';

jest.mock('../src/data/crypto-list.json', () => [
  { id: 'btc', name: 'Bitcoin', code: null, purchasable: true },
  { id: 'eth', name: 'Ethereum', code: null, purchasable: false },
]);

jest.mock('../src/data/fiat-list.json', () => [
  { id: 'usd', name: 'USD', code: 'USD', purchasable: true },
  { id: 'eur', name: 'Euro', code: 'EUR', purchasable: false },
]);

describe('CurrencyTester', () => {
  it('filters crypto only', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('insert'));
    fireEvent.press(getByTestId('crypto'));
    expect(getByTestId('count').props.children).toContain(2);
  });

  it('filters fiat only', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('insert'));
    fireEvent.press(getByTestId('fiat'));
    expect(getByTestId('count').props.children).toContain(2);
  });

  it('filters purchasable only', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('insert'));
    fireEvent.press(getByTestId('purchasable'));
    expect(getByTestId('count').props.children).toContain(2); // BTC + USD
  });

  it('clears all data', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('insert'));
    fireEvent.press(getByTestId('clear'));
    expect(getByTestId('count').props.children).toContain(0);
  });

  it('should show nothing after click crypto when no data is inserted', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('crypto'));
    expect(getByTestId('count').props.children).toContain(0);
  });

  it('should show nothing after click purchasable when no data is inserted', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('purchasable'));
    expect(getByTestId('count').props.children).toContain(0);
  });

  it('should show nothing after click fiat when no data is inserted', () => {
    const { getByTestId } = render(<CurrencyTester />);
    fireEvent.press(getByTestId('fiat'));
    expect(getByTestId('count').props.children).toContain(0);
  });
});
