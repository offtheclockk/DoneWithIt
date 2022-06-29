import React, { useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

function ListingsScreen({ navigation }) {
          const wait = timeout => {
                    return new Promise(resolve => setTimeout(resolve, timeout));
          };

          const getListingsApi = useApi(listingsApi.getListings);
          const [refreshing, setRefreshing] = React.useState(false);

          const onRefresh = React.useCallback(() => {
                    getListingsApi.request();
                    setRefreshing(true);
                    wait(1000).then(() => setRefreshing(false));
          }, []);

          useEffect(() => {
                    getListingsApi.request();
          }, []);

          return (
                    <>
                              <SafeAreaView style={styles.container}>
                                        <ScrollView
                                                  contentContainerStyle={styles.scrollView}
                                                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                                                  <ActivityIndicator visible={getListingsApi.loading} />
                                                  <Screen style={styles.screen}>
                                                            {getListingsApi.error && (
                                                                      <>
                                                                                <AppText>Couldn't retrieve the listings.</AppText>
                                                                                <AppButton title='Retry' onPress={getListingsApi.request} />
                                                                      </>
                                                            )}
                                                            <FlatList
                                                                      data={getListingsApi.data}
                                                                      keyExtractor={(listing) => listing.id.toString()}
                                                                      renderItem={({ item }) =>
                                                                                <Card
                                                                                          title={item.title}
                                                                                          subTitle={"$" + item.price}
                                                                                          imageUrl={item.images[0].url}
                                                                                          onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                                                                                          thumbnailUrl={item.images[0].thumbnailUrl}
                                                                                />
                                                                      }
                                                            />
                                                  </Screen>
                                        </ScrollView>
                              </SafeAreaView>
                    </>
          );
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
          },
          screen: {
                    padding: 20,
                    backgroundColor: colors.light
          },
          scrollView: {
                    flex: 1,
                    backgroundColor: colors.light,
                    alignItems: 'center',
                    justifyContent: 'center',
          },
})

export default ListingsScreen;