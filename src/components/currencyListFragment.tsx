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
  Image,
  Keyboard,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const SearchBar = React.memo(
  ({
    onSearchQueryChanged,
  }: {
    onSearchQueryChanged: (value: string) => void;
  }) => {
    const [searchText, setSearchText] = useState('');

    const cancelSearch = useCallback(() => {
      setSearchText('');
      onSearchQueryChanged('');
      Keyboard.dismiss();
    }, [onSearchQueryChanged]);

    const handleTextChange = useCallback(
      (value: string) => {
        setSearchText(value);
        onSearchQueryChanged(value);
      },
      [onSearchQueryChanged],
    );

    return (
      <View
        style={{
          paddingHorizontal: 8,
          borderRadius: 4,
          backgroundColor: '#e0e0e0',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          testID="back-search-button"
          onPress={cancelSearch}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            style={{ width: 20, height: 20, marginRight: 8 }}
            source={require('../assets/left-arrow.png')}
          />
        </TouchableOpacity>

        <TextInput
          value={searchText}
          onChangeText={handleTextChange}
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
          onPress={cancelSearch}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ padding: 10 }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>&#x2715;</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const CurrencyListFragment = ({ data }: { data: CurrencyInfo[] }) => {
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [searchKey, setSearchKey] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // memoize the filtered data based on search query
  const filteredData = useMemo(() => {
    return getSearchResult(searchQuery, data);
  }, [searchQuery, data]);

  // clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    // reset search bar when data changes by updating the key
    setSearchKey(prev => prev + 1);
    setSearchQuery('');

    // clear any existing debounce timer, when data changes
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, [data]);

  const debouncedSearch = useCallback((query: string) => {
    // implement debouncing logic here
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(query);
    }, 500);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 8 }}>
      <SearchBar key={searchKey} onSearchQueryChanged={debouncedSearch} />
      <FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 4 }}
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
