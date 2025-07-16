import { CurrencyInfo } from '../types';

/**
 * Apply search criteria to filter currency data
 * @param query - The search term
 * @param input - Array of CurrencyInfo to search through
 * @returns Filtered array of CurrencyInfo
 */
export const getSearchResult = (
  query: string,
  input: CurrencyInfo[],
): CurrencyInfo[] => {
  if (!query) {
    return input;
  }

  return input.filter(item => {
    // The coin's name starts with the search term
    if (item.name.toLowerCase().startsWith(query.toLowerCase())) {
      return true;
    }

    // The coin's name contains a partial match with a ' ' (space) prefixed to the search term
    const splitBySpace = item.name.split(' ');
    if (splitBySpace.length > 1) {
      for (let i = 1; i < splitBySpace.length; i++) {
        const splitName = splitBySpace[i];
        if (splitName.toLowerCase().startsWith(query.toLowerCase())) {
          return true;
        }
      }
    }

    // The coin's symbol starts with the search term
    if (item.symbol.toLowerCase().startsWith(query.toLowerCase())) {
      return true;
    }

    return false;
  });
};
