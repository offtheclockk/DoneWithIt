import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
          {
                    id: 1,
                    title: 'Tristan White',
                    description: 'Hey! Is this item still available?',
                    image: require('../assets/tristan.jpg')
          },
          {
                    id: 2,
                    title: 'Tristan White',
                    description: "I'm interested in this item. When will you be able to post it?",
                    image: require('../assets/tristan.jpg')
          },
]

function MessagesScreen(props) {
          const [messages, setMessages] = useState(initialMessages);
          const [refreshing, setRefreshing] = useState(false);

          const handleDelete = message => {
                    //Delete the message from messages
                    setMessages(messages.filter(m => m.id !== message.id));
          }

          return (
                    <Screen style={styles.screen}>
                              <FlatList
                                        data={messages}
                                        keyExtractor={message => message.id.toString()}
                                        renderItem={({ item }) =>
                                                  <ListItem
                                                            title={item.title}
                                                            subTitle={item.description}
                                                            image={item.image}
                                                            onPress={() => console.log("Message selected", item)}
                                                            renderRightActions={() =>
                                                                      <ListItemDeleteAction onPress={() => handleDelete(item)}
                                                                      />}
                                                  />}
                                        ItemSeparatorComponent={ListItemSeparator}
                                        refreshing={refreshing}
                                        onRefresh={() => {
                                                  setMessages([
                                                            {
                                                                      id: 2,
                                                                      title: 'Tristan White',
                                                                      description: "I'm interested in this item. When will you be able to post it?",
                                                                      image: require('../assets/tristan.jpg')
                                                            },
                                                  ])
                                        }} />
                    </Screen>
          );
}

const styles = StyleSheet.create({

})

export default MessagesScreen;