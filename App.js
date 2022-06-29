import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NetInfo from '@react-native-community/netinfo';
import AppLoading from 'expo-app-loading';

import Screen from './app/components/Screen';
import AuthNavigator from './app/navigation/AuthNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';
import AuthContext from './app/auth/context';
import storage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';

const Link = () => {
      const navigation = useNavigation();

      return (
            <Button
                  title="Click"
                  onPress={() => navigation.navigate("TweetDetails", { id: 1 })}
            />
      )
}

const Tweets = () => (
      <Screen>
            <Text>Tweets</Text>
            <Link />
      </Screen>
);
const TweetDetails = ({ route }) => (
      <Screen>
            <Text>Tweet Details {route.params.id}</Text>
      </Screen>
);

const Stack = createNativeStackNavigator();
const StackNavigator = () => (
      <Stack.Navigator
            screenOptions={{
                  headerStyle: { backgroundColor: "dodgerblue" },
                  headerTintColor: "white",
            }}>
            <Stack.Screen
                  name="Tweets"
                  component={Tweets}
                  options={{
                        headerStyle: { backgroundColor: "tomato" },
                        headerTintColor: "white",
                  }}
            />
            <Stack.Screen
                  name="TweetDetails"
                  component={TweetDetails}
                  options={{ title: "Tweet Details" }}
            />
      </Stack.Navigator>
);

const Account = () => <Screen><Text>Account</Text></Screen>

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
      <Tab.Navigator
            tabBarOptions={{
                  activeBackgroundColor: "tomato",
                  activeTintColor: "white",
                  inactiveBackgroundColor: "#eee",
                  inactiveTintColor: "black",
            }}>
            <Tab.Screen
                  name="Feed"
                  component={StackNavigator}
                  options={{
                        tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />
                  }}
            />
            <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
)

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