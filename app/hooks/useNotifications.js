import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (addNotificationReceivedListener) => {
          useEffect(() => {
                    registerForPushNotifications();

                    if (addNotificationReceivedListener) Notifications.addNotificationReceivedListener(addNotificationReceivedListener)
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
}