import {View, FlatList, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
  doc,
  Timestamp,
  GeoPoint
} from 'firebase/firestore';
import * as Location from 'expo-location';

import styles from './Message.style';
import colors from '../../styles/colors';
import Input from '../../components/Input';
import MapModal from '../../components/Message/MapModal';
import TextMessage from '../../components/Message/TextMessage';
//import LocationMessage from '../../components/Message/LocationMessage';
import {db} from '../../utilities/firebase';
import {addMessage} from '../../utilities/firebaseActions';

const Message = ({route}) => {
  //Necessary states are created.
  const currentUser = useSelector(state => state.auth.currentUser);
  const theme = useSelector(state => state.theme.theme);
  const {id} = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [messageDoc, setMessageDoc] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [userLocation,setUserLocation] = useState(new GeoPoint(38.72049, 35.482597));

  //Here, the messages belonging to the receiver id, that come as a parameter, in the message collection
  //on the firestore are checked and thrown into the messages state.
  useEffect(() => {
    let messageDocId = '';
    let unsubscribe = () => {};
    async function getData() {
      const q = query(
        collection(db, 'message'),
        where('members', 'array-contains', currentUser.id),
      );
      const docs = await getDocs(q);
      docs.forEach(doc => {
        if (doc.data().members.includes(id)) {
          messageDocId = doc.id;
        }
      });
      unsubscribe = onSnapshot(doc(db, 'message', messageDocId), snapshot => {
        setMessages([...snapshot.data().messages.reverse()]);
        setMessageDoc(messageDocId);
      });
    }
    getData();

    //The unsubscribe function is executed when the component is closed.
    return () => {
      unsubscribe();
    };
  }, []);

  //Here is the function where key assignments of the fields to repeat in the flatlist are made.
  const keyExtractor = (item, index) => {
    return String(index);
  };

  //Here, there is a function that adjusts how the areas to be repeated in the flatlist will
  //appear on the screen. Also, a TextMessage or LocationMessage component is created for each message.
  const renderItem = ({item}) => {
    return <TextMessage message={item} />;
    /*if(item.type === 'text'){
      return <TextMessage message={item} />;
    }
    else{
      return <LocationMessage message={item} />;
    }*/
  };

  //A new message or an additional messages to the existing one is created and saved firestore.
  const sendMessage = async () => {
    setMessage('');
    const newMessage = {
      message,
      senderId: currentUser.id,
      receiverId: id,
      type: 'text',
      seen: false,
      date: Timestamp.now(),
    };
    await addMessage(messages, newMessage, messageDoc);
  };

  //A new location is created and saved firestore.
  const sendLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      //Get user location
      const resultLoc = await Location.getCurrentPositionAsync({});
      const currentLocation = new GeoPoint(
        resultLoc.coords.latitude,
        resultLoc.coords.longitude,
      );
      setUserLocation(currentLocation);
      setShowMapModal(true);
    }
  };

  //Elements that will appear on the screen are defined here
  return (
    <View style={styles[theme].container}>
      <FlatList
        contentContainerStyle={
          messages.length === 0 ? styles[theme].emptyList : {}
        }
        fadingEdgeLength={30}
        keyExtractor={keyExtractor}
        data={messages}
        renderItem={renderItem}
        overScrollMode="never"
        bounces={false}
        ListEmptyComponent={() => (
          <Text style={styles[theme].emptyText}>You have no messages yet</Text>
        )}
        inverted
      />
      <View style={styles[theme].bottomContainer}>
        <View style={styles[theme].inputWrapper}>
          <Input
            placeholder="Write a message"
            theme={theme}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={3}
          />
          <Icon
            onPress={sendLocation}
            name="location-sharp"
            size={23}
            color={
              theme === 'light'
                ? colors.darkBackground
                : colors.primaryBackground
            }
          />
        </View>
        <View style={styles[theme].sendButton}>
          <Icon
            onPress={sendMessage}
            name="send"
            size={23}
            color={colors.primaryBackground}
          />
        </View>
      </View>
      {/* prints map modal to the screen. */}
      <MapModal visible={showMapModal} close={setShowMapModal} userLocation={userLocation} />
    </View>
  );
};

export default Message;
