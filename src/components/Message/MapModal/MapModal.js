import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {GeoPoint} from 'firebase/firestore';
import MapView, {Marker} from 'react-native-maps';

import styles from './MapModal.style';
import colors from '../../../styles/colors';

function MapModal({visible, close, userLocation}) {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [location, setLocation] = useState(new GeoPoint(userLocation.latitude, userLocation.longitude));

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
          onPress={()=>close(false)}
        />
        <Text style={styles[theme].header}>Mark your location</Text>
        <MapView
          style={styles[theme].mapContainer}>
          <Marker
            draggable={true}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onDragEnd={e =>
              setLocation(
                new GeoPoint(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                ),
              )
            }
          />
        </MapView>
      </View>
    </Modal>
  );
}

export default MapModal;
