import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import {View, TextInput} from 'react-native';

import styles from './Input.style';

function Input(props) {
  //Here the input component is displayed on the screen.
  return (
    <View style={styles[props.theme].container}>
      <Icon
        name={props.iconName}
        size={20}
        color='#333'
      />
      <TextInput
        {...props}
        placeholderTextColor='#333'
        style={styles[props.theme].input}
      />
    </View>
  );
}

export default Input;
