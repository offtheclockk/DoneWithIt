import React, { useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import AccountScreen from '../screens/AccountScreen';
import expoPushTokensApi from "../api/expoPushTokens";
import ListingsScreen from '../screens/ListingsScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
          useEffect(() => {
                    registerForPushNotifications();
          }, []);

          const registerForPushNotifications = async () => {
                    try {
                              const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                              if (!permission.granted) return;

                              const token = await Notifications.getExpoPushTokenAsync();
                              expoPushTokensApi.register(token);
                              console.log(token);
                    } catch (error) {
                              console.log('Error getting a push token', error)
                    }
          }

          return (
                    <Tab.Navigator>
                              <Tab.Screen
                                        name="Feed"
                                        component={FeedNavigator}
                                        options={{
                                                  headerShown: false,
                                                  tabBarIcon: ({ color, size }) =>
                                                            <MaterialCommunityIcons
                                                                      name="home"
                                                                      color={color}
                                                                      size={size}
                                                            />
                                        }}
                              />
                              <Tab.Screen
                                        name="ListingEdit"
                                        component={ListingEditScreen}
                                        options={({ navigation }) => ({
                                                  headerShown: false,
                                                  tabBarButton: () =>
                                                            <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)} />,
                                                  tabBarIcon: ({ color, size }) =>
                                                            <MaterialCommunityIcons
                                                                      name="plus-circle"
                                                                      color={color}
                                                                      size={size}
                                                            />
                                        })}
                              />
                              <Tab.Screen
                                        name="Account"
                                        component={AccountNavigator}
                                        options={{
                                                  headerShown: false,
                                                  tabBarIcon: ({ color, size }) =>
                                                            <MaterialCommunityIcons
                                                                      name="account"
                                                                      color={color}
                                                                      size={size}
                                                            />
                                        }}
                              />
                    </Tab.Navigator>
          );
}

export default AppNavigator;