import { useState, useCallback } from 'react';
import { CurrencyInfo } from '../types';
import CryptoList from '../data/crypto-list.json';
import FiatList from '../data/fiat-list.json';

const useCurrencyData = () => {
  const [localDB, setLocalDB] = useState<CurrencyInfo[]>([]);
  const [listData, setListData] = useState<CurrencyInfo[]>([]);

  const isDataReady = (data: CurrencyInfo[]) => {
    return data && data.length > 0;
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
