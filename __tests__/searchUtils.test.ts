import { getSearchResult } from '../src/utils/searchUtils';
import { mockCurrencyData } from '../__mocks__/mockData';

describe('getSearchResult', () => {
  describe('Search by name (starts with)', () => {
    it('should return currencies whose name starts with search term (case insensitive)', () => {
      const result = getSearchResult('bit', mockCurrencyData);
      expect(result).toHaveLength(2);
      expect(result.map(item => item.name)).toContain('Bitcoin');
      expect(result.map(item => item.name)).toContain('Bitcoin Cash');
    });

    it('should return currencies whose name starts with search term (uppercase)', () => {
      const result = getSearchResult('BIT', mockCurrencyData);
      expect(result).toHaveLength(2);
      expect(result.map(item => item.name)).toContain('Bitcoin');
      expect(result.map(item => item.name)).toContain('Bitcoin Cash');
    });

    it('should return single currency when search term is specific', () => {
      const result = getSearchResult('ethereum', mockCurrencyData);
      expect(result).toHaveLength(2);
      expect(result.map(item => item.name)).toContain('Ethereum');
      expect(result.map(item => item.name)).toContain('Ethereum Classic');
    });

    it('should return currency by exact name match', () => {
      const result = getSearchResult('chainlink', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Chainlink');
    });
  });

  describe('Search by name (contains word boundary)', () => {
    it('should return currencies whose name contains search term with word boundary', () => {
      const result = getSearchResult('dollar', mockCurrencyData);
      expect(result).toHaveLength(4);
      expect(result.map(item => item.name)).toContain('Singapore Dollar');
      expect(result.map(item => item.name)).toContain('Hong Kong Dollar');
      expect(result.map(item => item.name)).toContain('Australian Dollar');
      expect(result.map(item => item.name)).toContain('United States Dollar');
    });

    it('should return currencies when searching for "coin"', () => {
      const result = getSearchResult('coin', mockCurrencyData);
      expect(result).toHaveLength(2);
      expect(result.map(item => item.name)).toContain('Binance Coin');
      expect(result.map(item => item.name)).toContain('USD Coin');
    });

    it('should not match partial words without word boundaries', () => {
      const result = getSearchResult('oin', mockCurrencyData); // Should not match "Bitcoin" or "Litecoin"
      expect(result).toHaveLength(0);
    });
  });

  describe('Search by symbol (starts with)', () => {
    it('should return currencies whose symbol starts with search term', () => {
      const result = getSearchResult('BT', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('BTC');
    });

    it('should return currencies whose symbol starts with search term (case insensitive)', () => {
      const result = getSearchResult('et', mockCurrencyData);
      expect(result).toHaveLength(2);
      expect(result.map(item => item.symbol)).toContain('ETH');
      expect(result.map(item => item.symbol)).toContain('ETC');
    });

    it('should return currencies with special character symbols', () => {
      const result = getSearchResult('€', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('€');
      expect(result[0].name).toBe('Euro');
    });

    it('should return multiple currencies with same symbol prefix', () => {
      const result = getSearchResult('$', mockCurrencyData);
      expect(result).toHaveLength(4);
      expect(result.map(item => item.name)).toContain('Singapore Dollar');
      expect(result.map(item => item.name)).toContain('Hong Kong Dollar');
      expect(result.map(item => item.name)).toContain('Australian Dollar');
      expect(result.map(item => item.name)).toContain('United States Dollar');
    });
  });

  describe('Edge cases', () => {
    it('should return empty array when no matches found', () => {
      const result = getSearchResult('xyz', mockCurrencyData);
      expect(result).toHaveLength(0);
    });

    it('should return input when searching for empty string', () => {
      const result = getSearchResult('', mockCurrencyData);
      expect(result).toHaveLength(mockCurrencyData.length);
    });

    it('should return empty array when searching for space character', () => {
      const result = getSearchResult(' ', mockCurrencyData);
      expect(result).toHaveLength(0);
    });

    it('should handle empty input array', () => {
      const result = getSearchResult('bitcoin', []);
      expect(result).toHaveLength(0);
    });

    it('should handle special characters in search term', () => {
      const result = getSearchResult('¥', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('¥');
      expect(result[0].name).toBe('Japanese Yen');
    });

    it('should handle British Pound symbol', () => {
      const result = getSearchResult('£', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('£');
      expect(result[0].name).toBe('British Pound');
    });
  });

  describe('Multiple criteria matching', () => {
    it('should return currency when search term matches symbol', () => {
      const result = getSearchResult('XRP', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('XRP');
      expect(result[0].name).toBe('XRP');
    });

    it('should not return duplicates when multiple criteria match the same item', () => {
      const result = getSearchResult('Bitcoin', mockCurrencyData);
      expect(result).toHaveLength(2); // Bitcoin and Bitcoin Cash
      expect(result.map(item => item.name)).toContain('Bitcoin');
      expect(result.map(item => item.name)).toContain('Bitcoin Cash');
    });

    it('should find EOS by symbol and name', () => {
      const result = getSearchResult('EOS', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('EOS');
      expect(result[0].symbol).toBe('EOS');
    });
  });

  describe('Real-world scenarios', () => {
    it('should find crypto currencies by common abbreviations', () => {
      const result = getSearchResult('BTC', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Bitcoin');
    });

    it('should handle search for "crypto" related terms', () => {
      const result = getSearchResult('crypto', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Crypto.com Chain');
    });

    it('should find currencies by partial name match', () => {
      const result = getSearchResult('british', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('British Pound');
    });

    it('should find currencies by country/region', () => {
      const result = getSearchResult('hong kong', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Hong Kong Dollar');
    });

    it('should handle cucumber edge case', () => {
      const result = getSearchResult('cucumber', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Cucumber');
    });
  });

  describe('Fiat vs Crypto distinction', () => {
    it('should find fiat currencies with codes', () => {
      const result = getSearchResult('singapore', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('SGD');
    });

    it('should find crypto currencies without codes', () => {
      const result = getSearchResult('litecoin', mockCurrencyData);
      expect(result).toHaveLength(1);
      expect(result[0].code).toBeUndefined();
    });

    it('should find purchasable currencies', () => {
      const result = getSearchResult('ethereum', mockCurrencyData);
      const ethereum = result.find(item => item.name === 'Ethereum');
      expect(ethereum?.purchasable).toBe(true);
    });
  });
});
