import React from 'react';
import { StyleSheet } from 'react-native';

import MessagesScreen from './app/screens/MessagesScreen'
import ListingEditScreen from './app/screens/ListingEditScreen';

export default function App() {

  return (
    <ListingEditScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
