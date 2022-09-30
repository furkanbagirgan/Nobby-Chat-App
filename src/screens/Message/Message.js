import {View, Text} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './Message.style';

const Message = ({route}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const {displayName, photoURL} = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles[theme].container}>
      <Text style={{color: 'black'}}>{displayName}</Text>
    </View>
  );
};

export default Message;
