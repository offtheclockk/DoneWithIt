import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NetInfo from '@react-native-community/netinfo';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Screen from './app/components/Screen';
import AuthNavigator from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';
import AuthContext from './app/auth/context';
import storage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';
import logger from './app/utility/logger';

logger.start();

Notifications.setNotificationHandler({
      handleNotification: async () => {
            return {
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true,
            };
      },
});

export default function App() {
      const [user, setUser] = useState();
      const [isReady, setIsReady] = useState(false);

      const restoreUser = async () => {
            const user = await storage.getToken();
            if (!user) setUser(user);
      }

      if (!isReady)
            return (
                  <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.warn} />
            );

      return (
            <AuthContext.Provider value={{ user, setUser }}>
                  <OfflineNotice />
                  <NavigationContainer ref={navigationRef} theme={navigationTheme}>
                        {user ? <AppNavigator /> : <AuthNavigator />}
                  </NavigationContainer>
            </AuthContext.Provider>
      );
}