import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import MessagesScreen from './app/screens/MessagesScreen'
import ListingEditScreen from './app/screens/ListingEditScreen';
import Screen from './app/components/Screen';
import AppButton from './app/components/AppButton';

export default function App() {
  const [imageUri, setImageUri] = useState();

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert('You need to enable permission to access the library')
  };

  useEffect(() => {
    requestPermission();
  }, [])

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled)
        setImageUri(result.uri);
    } catch (error) {
      console.log('Error reading an image')
    }
  }

  return (
    <Screen>
      <Button title="Select image" onPress={selectImage} />
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
