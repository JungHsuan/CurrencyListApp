import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});

describe('App Component', () => {
  it('should render buttons', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText('Clear Data')).toBeTruthy();
    expect(getByText('Insert Data')).toBeTruthy();
    expect(getByText('Show Crypto List')).toBeTruthy();
    expect(getByText('Show Fiat List')).toBeTruthy();
    expect(getByText('Show Purchasable List')).toBeTruthy();

    expect(getByPlaceholderText('Search Currency')).toBeTruthy();
    expect(getByText('No currencies to display')).toBeTruthy();
  });
});
