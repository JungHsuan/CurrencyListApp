import React from 'react';
import { View, Text, FlatList } from 'react-native';
import useCurrencyData from '../hooks/useCurrencyData';
import Button from './button';

export default function CurrencyTester() {
  const {
    listData,
    insertData,
    clearData,
    setDataWithCryptoList,
    setDataWithFiatList,
    setDataWithPurchasable,
  } = useCurrencyData();

  return (
    <View>
      <Button content="Insert" testID="insert" onPress={insertData} />
      <Button content="Clear" testID="clear" onPress={clearData} />
      <Button
        content="Crypto"
        testID="crypto"
        onPress={setDataWithCryptoList}
      />
      <Button content="Fiat" testID="fiat" onPress={setDataWithFiatList} />
      <Button
        content="Purchasable"
        testID="purchasable"
        onPress={setDataWithPurchasable}
      />
      <Text testID="count">Count: {listData.length}</Text>
      <FlatList
        testID="list"
        data={listData}
        keyExtractor={(item, _) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
