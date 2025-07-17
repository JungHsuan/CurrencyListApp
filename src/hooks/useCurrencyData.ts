import { useState, useCallback, useMemo } from 'react';
import { CurrencyInfo } from '../types';
import CryptoList from '../data/crypto-list.json';
import FiatList from '../data/fiat-list.json';

const useCurrencyData = () => {
  const [localDB, setLocalDB] = useState<CurrencyInfo[]>([]);
  const [listData, setListData] = useState<CurrencyInfo[]>([]);
  const isDataReady = useMemo(() => {
    return localDB && localDB.length > 0;
  }, [localDB]);

  const clearData = useCallback(() => {
    setLocalDB([]);
    setListData([]);
  }, []);

  const insertData = useCallback(() => {
    setLocalDB(CryptoList.concat(FiatList));
  }, []);

  const setDataWithCryptoList = useCallback(() => {
    setListData(localDB.filter(item => item.code == null));
  }, [localDB]);

  const setDataWithFiatList = useCallback(() => {
    setListData(localDB.filter(item => item.code != null));
  }, [localDB]);

  const setDataWithPurchasable = useCallback(() => {
    setListData(localDB.filter(item => item.purchasable === true));
  }, [localDB]);

  return {
    isDataReady,
    listData,
    clearData,
    insertData,
    setDataWithCryptoList,
    setDataWithFiatList,
    setDataWithPurchasable,
  };
};

export default useCurrencyData;
