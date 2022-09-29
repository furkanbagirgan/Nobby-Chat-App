import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './StoryCard.style';
import colors from '../../../styles/colors';
import {auth} from './../../../utilities/firebase';

const StoryCard = ({user, handlePress}) => {
  //Necessary states are created.
  const currentUser = useSelector(state => state.auth.currentUser);
  const theme = useSelector(state => state.theme.theme);

  //Elements that will appear on the screen are defined here
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles[theme].container}>
        <View style={styles[theme].imageWrapper}>
          {user.photoURL !== null && user.photoURL !== '' ? (
            <Image source={{uri: user.photoURL}} style={styles[theme].image} />
          ) : (
            <Icon name="person" size={28} color={colors.plainText} />
          )}
        </View>
        <Text
          style={
            user.id !== currentUser.id
              ? {...styles[theme].displayName}
              : {...styles[theme].displayName, fontWeight: 'bold'}
          }>
          {user.id !== currentUser.id ? user.displayName.split(' ')[0] : 'Me'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StoryCard;
