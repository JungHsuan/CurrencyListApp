/* eslint-disable react-native/no-inline-styles */
/**
 *  CurrencyListFragment can be reused for different purposes, such as displaying
 *  Crypto Currency and Fiat Currency.
 *
 *  1. Receive a list of CurrencyInfo objects to create the UI.
 *  2. Provide a search feature that can be cancelled when the user clicks the back or close button.
 *  3. Should include an empty view for displaying an empty list.
 */

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CurrencyInfo } from '../types';
import { getSearchResult } from '../utils/searchUtils';

const EmptyListView = () => {
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#888', marginTop: 16 }}>
        No currencies to display
      </Text>
    </View>
  );
};

const CurrencyItem = ({ item }: { item: CurrencyInfo }) => {
  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: '#222',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}
      >
        <Text style={{ color: '#fff' }}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{` (${item.symbol})`}</Text>
    </View>
  );
};

const SearchBar = ({
  onSearchQueryChanged,
}: {
  onSearchQueryChanged: (value: string) => void;
}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <View
      style={{
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TextInput
        value={searchText}
        onChangeText={value => {
          setSearchText(value);
          onSearchQueryChanged(value);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        placeholderTextColor="#888"
        style={{ flex: 1, fontSize: 16 }}
        numberOfLines={1}
        placeholder="Search Currency"
      />
      <TouchableOpacity
        testID="clear-search-button"
        onPress={() => {
          setSearchText('');
          onSearchQueryChanged('');
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{ padding: 10 }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>&#x2715;</Text>
      </TouchableOpacity>
    </View>
  );
};

const CurrencyListFragment = ({ data }: { data: CurrencyInfo[] }) => {
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [rawData, setRawData] = useState<CurrencyInfo[]>(data);
  const [filteredData, setFilteredData] = useState<CurrencyInfo[]>(data);
  const [searchKey, setSearchKey] = useState<number>(0);

  useEffect(() => {
    setFilteredData(data);
    setRawData(data);
    // Reset search bar when data changes by updating the key
    setSearchKey(prev => prev + 1);
  }, [data]);

  const debouncedSearch = useCallback(
    (query: string) => {
      // Implement debouncing logic here
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        if (!query) {
          setFilteredData(rawData);
        } else {
          setFilteredData(getSearchResult(query, rawData));
        }
      }, 500);
    },
    [rawData],
  );

  return (
    <View style={{ flex: 1, marginTop: 8 }}>
      <SearchBar key={searchKey} onSearchQueryChanged={debouncedSearch} />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyListView />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
});

export default CurrencyListFragment;
