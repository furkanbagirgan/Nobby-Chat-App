import {FlatList, ActivityIndicator, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './Contacts.style';
import ContactCard from './../ContactCard';
import {getContacts} from './../../../redux/contactSlice';

const Contacts = ({contactPress}) => {
  //Necessary states are created.
  const {contacts, loading, error} = useSelector(state => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    //getContact function is executed when the component is first opened
    dispatch(getContacts());
  }, []);

  //Here is the function where key assignments of the fields to repeat in the flat list are made.
  const keyExtractor = item => {
    return item.id;
  };

  //Here, there is a function that adjusts how the areas to be repeated in the
  //flat list will appear on the screen. Also, a contactCard component is created for each chat.
  const renderItem = ({item}) => {
    return <ContactCard user={item} handlePress={contactPress} />;
  };

  //if there is error then prints the error message to screen
  if (error) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>Connection Error</Text>
      </View>
    );
  }

  //if loading is true then prints the ActivityIndicator to screen
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#A9A9A9" size={35} />
      </View>
    );
  }

  //Elements that will appear on the screen are defined here
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={contacts}
        renderItem={renderItem}
        overScrollMode="never"
        bounces={false}
      />
    </View>
  );
};

export default Contacts;
