import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AccountScreen from '../screens/AccountScreen';
import ListingsScreen from '../screens/ListingsScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';
import navigation from './rootNavigation';
import useNotifications from '../hooks/useNotifications';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
          useNotifications();

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