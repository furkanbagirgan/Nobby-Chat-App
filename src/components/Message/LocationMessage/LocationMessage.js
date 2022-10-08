import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {auth} from '../../../utilities/firebase';
import {formatDate} from '../../../utilities/dateFormat';

import styles from './LocationMessage.style';
import colors from './../../../styles/colors';
import MapModal from './../MapModal';

const LocationMessage = ({message}) => {
  //Necessary states are created.
  const [date, setDate] = useState('');
  const [sender, setSender] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //When the component is first created, the date of the incoming message is formatted.
  //In addition, it is determined who the sender of the message is.
  useEffect(() => {
    const formattedDate = formatDate(message.date.toDate());
    setDate(formattedDate);
    if (message.senderId === auth.currentUser.uid) {
      setSender(true);
    }
  }, []);

  //Open map modal
  const goToMap = () => {
    setShowModal(true);
  };

  //Here, message are created by checking the status of the sender via the incoming message prop.
  return (
    <>
      <View style={sender ? styles.sendContainer : styles.receiveContainer}>
        <Pressable onPress={goToMap}>
          <Image source={{uri: message.previewImage}} style={styles.image} />
        </Pressable>
        <View style={styles.timeWrapper}>
          <Text style={styles.time}>{date}</Text>
          {sender &&
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
      {/* prints map modal to the screen. */}
      <MapModal
        visible={showModal}
        close={setShowModal}
        userLocation={message.message}
        title=""
        sendNo={true}
      />
    </>
  );
};

export default LocationMessage;
