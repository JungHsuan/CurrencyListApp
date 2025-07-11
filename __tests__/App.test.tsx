import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App Component', () => {
  test('should render buttons', () => {
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
