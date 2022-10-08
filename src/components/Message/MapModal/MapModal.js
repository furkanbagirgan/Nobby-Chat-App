import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {GeoPoint} from 'firebase/firestore';
import MapView, {Marker} from 'react-native-maps';

import styles from './MapModal.style';
import colors from '../../../styles/colors';
import Button from '../../../components/Button';

function MapModal({visible, close, userLocation, title, sendNo, handlePress}) {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [location, setLocation] = useState(new GeoPoint(0, 0));
  const [loading, setLoading] = useState(false);
  let mapRef = null;

  const sendLocation = async () => {
    setLoading(true);
    let snapUrl = '';
    const snapshot = mapRef.takeSnapshot({
      width: 100,
      height: 100,
      quality: 1,
    });
    snapshot.then(async uri => {
      snapUrl = uri;
      await handlePress(
        location.latitude === 0 ? userLocation : location,
        snapUrl,
      );
      close(false);
      setLoading(false);
    });
  };

  //Elements that will appear on the screen are defined here
  return (
    <Modal
      style={styles[theme].modal}
      isVisible={visible}
      onSwipeComplete={() => close(false)}
      onBackdropPress={() => close(false)}
      onBackButtonPress={() => close(false)}>
      <View style={styles[theme].container}>
        <Icon
          name="close"
          size={28}
          color={
            theme === 'light' ? colors.darkBackground : colors.primaryBackground
          }
          style={styles[theme].close}
          onPress={() => close(false)}
        />
        <Text style={styles[theme].header}>{title}</Text>
        <MapView
          ref={map => {
            mapRef = map;
          }}
          style={styles[theme].mapContainer}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.002,
          }}
          onPress={e => {
            if (!sendNo) {
              setLocation(
                new GeoPoint(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                ),
              );
            }
          }}>
          <Marker
            coordinate={{
              latitude:
                location.latitude === 0
                  ? userLocation.latitude
                  : location.latitude,
              longitude:
                location.longitude === 0
                  ? userLocation.longitude
                  : location.longitude,
            }}
          />
        </MapView>
        {!sendNo && (
          <View style={styles[theme].buttonWrapper}>
            <Button
              title="Send"
              loading={loading}
              onClick={sendLocation}
              theme="blue"
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

export default MapModal;
