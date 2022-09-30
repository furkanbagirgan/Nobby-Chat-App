import React from 'react';
import {View,Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './ContactModal.style';
import Contacts from './../Contacts/Contacts';
import colors from '../../../styles/colors';

function ContactModal({visible, close, contactPress}) {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);

  //Elements that will appear on the screen are defined here
  return (
    <Modal
      style={styles[theme].modal}
      isVisible={visible}
      onSwipeComplete={close}
      onBackdropPress={close}
      onBackButtonPress={close}>
      <View style={styles[theme].container}>
        <Icon
          name="close"
          size={28}
          color={
            theme === 'light' ? colors.darkBackground : colors.primaryBackground
          }
          style={styles[theme].close}
          onPress={close}
        />
        <Text style={styles[theme].header}>
          Select the person
        </Text>
        <Contacts contactPress={contactPress} />
      </View>
    </Modal>
  );
}

export default ContactModal;
