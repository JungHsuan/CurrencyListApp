import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CurrencyListFragment from './src/components/CurrencyListFragment';
import Button from './src/components/Button';
import useCurrencyData from './src/hooks/useCurrencyData';

function App() {
  const {
    listData,
    clearData,
    insertData,
    setDataWithCryptoList,
    setDataWithFiatList,
    setDataWithPurchasable,
  } = useCurrencyData();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Button content="Clear Data" onPress={clearData} />
        <Button content="Insert Data" onPress={insertData} />
        <Button content="Show Crypto List" onPress={setDataWithCryptoList} />
        <Button content="Show Fiat List" onPress={setDataWithFiatList} />
        <Button
          content="Show Purchasable List"
          onPress={setDataWithPurchasable}
        />
        <CurrencyListFragment data={listData} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default App;
