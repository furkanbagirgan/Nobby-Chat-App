import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import styles from './Button.style';

function Button({title, onClick, loading, theme}) {
  //Here the button component is displayed on the screen.
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles[theme].container}>
        {loading ? (
          <ActivityIndicator size={25} color="#555" />
        ) : (
          <Text style={styles[theme].title}>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Button;
