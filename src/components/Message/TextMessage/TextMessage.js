import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {auth} from '../../../utilities/firebase';
import {formatDate} from '../../../utilities/dateFormat';

import styles from './TextMessage.style';
import colors from './../../../styles/colors';

const TextMessage = ({message}) => {
  //Necessary states are created.
  const [date, setDate] = useState('');

  //When the component is first created, the date of the incoming message is formatted.
  //In addition, it is determined who the sender of the message is.
  useEffect(() => {
    const formattedDate = formatDate(message.date.toDate());
    setDate(formattedDate);
  }, []);

  //Here, messages are created by checking the status of the sender via the incoming message prop.
  return (
    <View style={message.senderId === auth.currentUser.uid ? styles.sendContainer : styles.receiveContainer}>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>{message.message}</Text>
      </View>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{date}</Text>
        {message.senderId === auth.currentUser.uid &&
          (message.seen ? (
            <Icon
              name="checkmark-done"
              color={colors.secondaryBlue}
              size={15}
              style={styles.icon}
            />
          ) : (
            <Icon
              name="checkmark-done"
              color={colors.primaryBackground}
              size={15}
              style={styles.icon}
            />
          ))}
      </View>
    </View>
  );
};

export default TextMessage;
