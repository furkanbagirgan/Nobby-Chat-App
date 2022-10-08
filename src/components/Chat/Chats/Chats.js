import {FlatList, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import styles from './Chats.style';
import ChatCard from './../ChatCard';
import {auth, db} from '../../../utilities/firebase';

const Chats = ({chatDetail}) => {
  //Necessary states are created.
  const [chats, setChats] = useState([]);

  useEffect(() => {
    //Chats retrieved from the Firestore and saved in the chats state.
    const q = query(
      collection(db, 'message'),
      where('members', 'array-contains', auth.currentUser.uid),
      orderBy('lastDate', 'desc'),
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      let userChats = [];
      snapshot.forEach(doc => {
        userChats.push({...doc.data(), id: doc.id});
      });
      setChats([...userChats]);
    });

    //The unsubscribe function is executed when the screen is closed.
    return () => {
      unsubscribe();
    };
  }, []);

  //Here is the function where key assignments of the fields to repeat in the flat list are made.
  const keyExtractor = item => {
    return item.id;
  };

  //Here, there is a function that adjusts how the areas to be repeated in the
  //flat list will appear on the screen. Also, a chatCard component is created for each chat.
  const renderItem = ({item}) => {
    let members = item.members;
    const index = members.indexOf(auth.currentUser.uid);
    members.splice(index, 1);
    let messageCount = 0;
    item.messages.forEach(message => {
      if (message.receiverId === auth.currentUser.uid && !message.seen) {
        messageCount++;
      }
    });
    return (
      <ChatCard
        userId={members[0]}
        lastMessage={item.messages[item.messages.length - 1]}
        messageCount={messageCount}
        handlePress={chatDetail}
      />
    );
  };

  //Elements that will appear on the screen are defined here
  return (
    <View style={styles.container}>
      <FlatList
        fadingEdgeLength={30}
        contentContainerStyle={
          chats.length === 0 ? styles.emptyList : {}
        }
        keyExtractor={keyExtractor}
        data={chats}
        renderItem={renderItem}
        bounces={false}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>You have no messages yet</Text>
        )}
      />
    </View>
  );
};

export default Chats;
