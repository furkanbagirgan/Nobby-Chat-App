import {View, Text, Image, TouchableHighlight} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import styles from './ContactCard.style';

const ContactCard = ({user, handlePress}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);

  //Elements that will appear on the screen are defined here
  return (
    <TouchableHighlight
      onPress={()=>{handlePress(user.displayName,user.photoURL)}}
      style={styles[theme].outerContainer}
      underlayColor={theme === 'light' ? '#eee' : '#555'}>
      <View style={styles[theme].container}>
        <View style={styles[theme].imageWrapper}>
          <Image source={{uri: user.photoURL}} style={styles[theme].image} />
        </View>
        <Text style={styles[theme].displayName}>{user.displayName}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ContactCard;
