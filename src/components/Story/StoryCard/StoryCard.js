import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './StoryCard.style';
import colors from '../../../styles/colors';

const StoryCard = ({user, handlePress}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);

  //Elements that will appear on the screen are defined here
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles[theme].container}>
        <View style={styles[theme].imageWrapper}>
          {user.photoURL !== null ? (
            <Image source={{uri: user.photoURL}} style={styles[theme].image} />
          ) : (
            <Icon name="person" size={36} color={colors.plainText} />
          )}
        </View>
        <Text style={styles[theme].displayName}>
          {user.displayName.split(' ')[0]}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StoryCard;
