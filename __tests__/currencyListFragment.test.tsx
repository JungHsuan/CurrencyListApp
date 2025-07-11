import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import CurrencyListFragment from '../src/components/currencyListFragment';

jest.useFakeTimers();

const mockSearchData = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH' },
  { id: 'BET', name: 'Betcoin', symbol: 'BET' },
  { id: 'LTC', name: 'Litecoin', symbol: 'LTC' },
];

describe('CurrencyListFragment Component', () => {
  it('should render currency items correctly', () => {
    const { getByText } = render(
      <CurrencyListFragment
        data={[{ id: '1', name: 'Bitcoin', symbol: 'BTC' }]}
      />,
    );

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText(' (BTC)')).toBeTruthy();
  });

  it('should render other currency items correctly', () => {
    const { getByText } = render(
      <CurrencyListFragment
        data={[
          { id: '2', name: 'Ethereum', symbol: 'ETH' },
          {
            id: 'SGD',
            name: 'Singapore Dollar',
            symbol: '$',
            code: 'SGD',
          },
        ]}
      />,
    );

    expect(getByText('Ethereum')).toBeTruthy();
    expect(getByText(' (ETH)')).toBeTruthy();
    expect(getByText('Singapore Dollar')).toBeTruthy();
    expect(getByText(' ($)')).toBeTruthy();
  });

  it('should render item with first character in a circle', () => {
    const { getByText } = render(
      <CurrencyListFragment
        data={[{ id: '3', name: 'Litecoin', symbol: 'LTC' }]}
      />,
    );

    expect(getByText('L')).toBeTruthy();
  });
});

describe('CurrencyListFragment Empty State', () => {
  it('should display empty view when no data is provided', () => {
    const { getByText } = render(<CurrencyListFragment data={[]} />);

    expect(getByText('No currencies to display')).toBeTruthy();
  });
});

describe('CurrencyListFragment Search Functionality', () => {
  it('should render search bar input with correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <CurrencyListFragment
        data={[{ id: '1', name: 'Bitcoin', symbol: 'BTC' }]}
      />,
    );
    const input = getByPlaceholderText('Search Currency');
    expect(input).toBeTruthy();
    expect(input.props.value).toBe(''); // default value is empty
  });

  it('should filter list based on search input with name', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <CurrencyListFragment data={mockSearchData} />,
    );

    const input = getByPlaceholderText('Search Currency');

    await waitFor(() => {
      fireEvent.changeText(input, 'bit');
      jest.advanceTimersByTime(500); // debounce delay
    });

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(queryByText('Ethereum')).toBeNull();
    expect(queryByText('Litecoin')).toBeNull();
    expect(queryByText('Betcoin')).toBeNull();
  });

  it('should filter list based on search input with symbol', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <CurrencyListFragment data={mockSearchData} />,
    );

    const input = getByPlaceholderText('Search Currency');

    await waitFor(() => {
      fireEvent.changeText(input, 'et');
      jest.advanceTimersByTime(500); // debounce delay
    });

    expect(getByText('Ethereum')).toBeTruthy();
    expect(queryByText('Bitcoin')).toBeNull();
    expect(queryByText('Litecoin')).toBeNull();
    expect(queryByText('Betcoin')).toBeNull();
  });

  it('should handle empty search input', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CurrencyListFragment data={mockSearchData} />,
    );

    const input = getByPlaceholderText('Search Currency');

    await waitFor(() => {
      fireEvent.changeText(input, '');
      jest.advanceTimersByTime(500); // debounce delay
    });

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
    expect(getByText('Litecoin')).toBeTruthy();
    expect(getByText('Betcoin')).toBeTruthy();
  });

  it('should clear search input when clear button is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CurrencyListFragment data={mockSearchData} />,
    );

    const input = getByPlaceholderText('Search Currency');
    const clearButton = getByTestId('clear-search-button');

    await waitFor(() => {
      fireEvent.changeText(input, 'bit');
      expect(input.props.value).toBe('bit');
    });

    await waitFor(() => {
      fireEvent.press(clearButton);
      expect(input.props.value).toBe('');
    });
  });

  it('should clear search input when back button is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CurrencyListFragment data={mockSearchData} />,
    );

    const input = getByPlaceholderText('Search Currency');
    const backButton = getByTestId('back-search-button');

    await waitFor(() => {
      fireEvent.changeText(input, 'bit');
      expect(input.props.value).toBe('bit');
    });

    await waitFor(() => {
      fireEvent.press(backButton);
      expect(input.props.value).toBe('');
    });
  });
});
