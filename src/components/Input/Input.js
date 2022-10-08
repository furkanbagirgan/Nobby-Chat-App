import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './Input.style';
import colors from '../../styles/colors';

function Input(props) {
  //Here the input component is displayed on the screen.
  return (
    <View style={styles[props.theme].container}>
      <Icon name={props.iconName} size={20} color={colors.plainText} />
      <TextInput
        {...props}
        placeholderTextColor={colors.plainText}
        style={styles[props.theme].input}
        editable={props.enable ? props.enable : true}
      />
    </View>
  );
}

export default Input;
