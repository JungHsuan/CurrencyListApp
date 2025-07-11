/* eslint-disable react-native/no-inline-styles */
import { StatusBar, StyleSheet, SafeAreaView, View } from 'react-native';
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
    <SafeAreaView style={{ ...styles.container }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          marginTop: StatusBar.currentHeight,
        }}
      >
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
