import { useState, useCallback } from 'react';
import { CurrencyInfo } from '../types';
import CryptoList from '../data/crypto-list.json';
import FiatList from '../data/fiat-list.json';
import { Alert } from 'react-native';

const useCurrencyData = () => {
  const [localDB, setLocalDB] = useState<CurrencyInfo[]>([]);
  const [listData, setListData] = useState<CurrencyInfo[]>([]);

  const isDataReady = (data: CurrencyInfo[]) => {
    if (data && data.length > 0) {
      return true;
    } else {
      Alert.alert(
        'Data Not Ready',
        'Please insert data first.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return false;
    }
  };

  const clearData = () => {
    setLocalDB([]);
    setListData([]);
  };

  const insertData = () => {
    setLocalDB(CryptoList.concat(FiatList));
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

  return {
    listData,
    clearData,
    insertData,
    setDataWithCryptoList,
    setDataWithFiatList,
    setDataWithPurchasable,
  };
};

export default useCurrencyData;
