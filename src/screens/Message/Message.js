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
} from 'firebase/firestore';

import styles from './Message.style';
import colors from '../../styles/colors';
import Input from '../../components/Input';
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
  let listRef=null;

  //Here, the messages belonging to the receiver id, that come as a parameter, in the message collection
  //on the firestore are checked and thrown into the messages state.
  useEffect(() => {
    let messageDoc = '';
    let unsubscribe = () => {};
    async function getData() {
      const q = query(
        collection(db, 'message'),
        where('members', 'array-contains', currentUser.id),
      );
      const docs = await getDocs(q);
      docs.forEach(doc => {
        if (doc.data().members.includes(id)) {
          messageDoc = doc.id;
        }
      });
      unsubscribe = onSnapshot(doc(db, 'message', messageDoc), snapshot => {
        setMessages([...snapshot.data().messages]);
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
    await addMessage(message);
  };

  //A new location is created and saved firestore.
  const sendLocation = async () => {};

  //Elements that will appear on the screen are defined here
  return (
    <View style={styles[theme].container}>
      <FlatList
        ref={(ref)=>(listRef=ref)}
        contentContainerStyle={messages.length ===0 ? styles[theme].emptyList : {}}
        fadingEdgeLength={30}
        keyExtractor={keyExtractor}
        data={messages}
        renderItem={renderItem}
        overScrollMode="never"
        bounces={false}
        onContentSizeChange={()=>listRef.scrollToEnd()}
        ListEmptyComponent={()=><Text style={styles[theme].emptyText}>You have no messages yet</Text>}
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
    </View>
  );
};

export default Message;
