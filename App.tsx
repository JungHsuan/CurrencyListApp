import {
  StatusBar,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import CurrencyListFragment from './src/components/currencyListFragment';
import { useCallback, useState } from 'react';
import { CurrencyInfo } from './src/types';
import CryptoList from './src/data/crypto-list.json';
import FiatList from './src/data/fiat-list.json';
import Button from './src/components/button';

function App() {
  const [localDB, setLocalDB] = useState<CurrencyInfo[]>([]);
  const [listData, setListData] = useState<CurrencyInfo[]>([]);

  const isDataReady = (data: CurrencyInfo[]) => {
    if (data && data.length > 0) {
      return true;
    } else {
      console.warn('No data available');
      ToastAndroid.show(
        'No data available, please insert data first',
        ToastAndroid.SHORT,
      );
      return false;
    }
  };

  const clearData = () => {
    setLocalDB([]);
    setListData([]);
  };

  // Simulate local database operations
  const insertData = () => {
    setLocalDB([
      ...(CryptoList as CurrencyInfo[]),
      ...(FiatList as CurrencyInfo[]),
    ]);
  };

  const setDataWithCryptoList = useCallback(() => {
    if (isDataReady(localDB)) {
      setListData(localDB.filter(item => item.code == null));
    }
  }, [localDB]);

  const setDataWithFiatList = useCallback(() => {
    if (isDataReady(localDB)) {
      setListData(localDB.filter(item => item.code != null));
    }
  }, [localDB]);

  const setDataWithPurchasable = useCallback(() => {
    if (isDataReady(localDB)) {
      setListData(localDB.filter(item => item.purchasable === true));
    }
  }, [localDB]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Button content="Clear Data" onPress={clearData} />
      <Button content="Insert Data" onPress={insertData} />
      <Button content="Show Currency List A" onPress={setDataWithCryptoList} />
      <Button content="Show Currency List B" onPress={setDataWithFiatList} />
      <Button
        content="Show Purchasable Currencies"
        onPress={setDataWithPurchasable}
      />
      <CurrencyListFragment data={listData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default App;
