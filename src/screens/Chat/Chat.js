import {View, Text} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './Chat.style';

const Chat = ({route}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const {chatName, receiverPhoto} = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles[theme].container}>
      <Text style={{color: 'black'}}>{chatName}</Text>
    </View>
  );
};

export default Chat;
