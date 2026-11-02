import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import NotasScreen from './src/screens/NotasScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6cc993"
      />

      <NotasScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#b8b8d8',
  },
});