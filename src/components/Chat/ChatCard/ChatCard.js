import {View, Text, Image, TouchableHighlight} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './ChatCard.style';
import colors from '../../../styles/colors';
import {getUser} from '../../../utilities/firebaseActions';
import {auth} from '../../../utilities/firebase';

const ChatCard = ({userId, lastMessage, messageCount, handlePress}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      const data = await getUser(userId);
      setUser({...data});
    }
    getUserData();
  }, []);

  //Elements that will appear on the screen are defined here
  return (
    <TouchableHighlight
      onPress={() => {
        handlePress(user.displayName, user.photoURL, user.id);
      }}
      style={styles[theme].outerContainer}
      underlayColor={theme === 'light' ? '#eee' : '#555'}>
      <View style={styles[theme].container}>
        <View style={styles[theme].userWrapper}>
          <View style={styles[theme].imageWrapper}>
            {user.photoURL !== null ? (
              <Image
                source={{uri: user.photoURL}}
                style={styles[theme].image}
              />
            ) : (
              <Icon name="person" color={theme === 'light' ? colors.primaryBackground : colors.secondaryBackground} size={25} />
            )}
          </View>
          <View style={styles[theme].messageWrapper}>
            <Text style={styles[theme].displayName}>{user.displayName}</Text>
            <Text style={styles[theme].message} numberOfLines={1}>
              {lastMessage.senderId === auth.currentUser.uid
                ? 'Me:' + lastMessage.message
                : lastMessage.message}
            </Text>
          </View>
        </View>
        <View style={styles[theme].detailWrapper}>
          <Text style={styles[theme].message}>
            {lastMessage.date.toDate().getHours().toString() +
              ':' +
              lastMessage.date.toDate().getMinutes().toString()}
          </Text>
          {lastMessage.senderId !== auth.currentUser.uid ? 
            (messageCount !== 0 && 
              <View style={styles[theme].countWrapper}>
                <Text style={styles[theme].count}>{messageCount}</Text>
              </View>
            ) : (
            <Icon
              name="checkmark-done"
              color={lastMessage.seen ? colors.primaryBlue : colors.plainText}
              size={22}
            />
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatCard;
