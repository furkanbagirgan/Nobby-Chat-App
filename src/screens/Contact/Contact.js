import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import styles from './Contact.style';
import Contacts from './../../components/Contact/Contacts';

function Contact({navigation}) {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);

  //Here is the function that allows switching to the message screen when each contactCard or chatCard component is clicked.
  const goToChat = (displayName, photoURL, id) => {
    navigation.navigate('Message', {displayName, photoURL, id});
  };

  //Elements that will appear on the screen are defined here
  return (
    <View style={styles[theme].container}>
      <Contacts contactPress={goToChat} />
    </View>
  );
}

export default Contact;
