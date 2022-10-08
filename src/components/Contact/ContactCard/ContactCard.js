import {View, Text, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './ContactCard.style';
import colors from '../../../styles/colors';

const ContactCard = ({user, handlePress}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);

  //Elements that will appear on the screen are defined here
  return (
    <TouchableHighlight
      onPress={() => {
        handlePress(user.displayName, user.photoURL, user.id);
      }}
      style={styles[theme].outerContainer}
      underlayColor={theme === 'light' ? '#eee' : '#555'}>
      <View style={styles[theme].container}>
        <View style={styles[theme].imageWrapper}>
          {user.photoURL !== null ? (
            <Image source={{uri: user.photoURL}} style={styles[theme].image} />
          ) : (
            <Icon
              name="person"
              color={
                theme === 'light'
                  ? colors.primaryBackground
                  : colors.secondaryBackground
              }
              size={25}
            />
          )}
        </View>
        <Text style={styles[theme].displayName} numberOfLines={1}>
          {user.displayName}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ContactCard;
