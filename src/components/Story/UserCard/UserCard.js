import {View, Text, TouchableWithoutFeedback, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {doc, onSnapshot} from 'firebase/firestore';

import styles from './UserCard.style';
import colors from '../../../styles/colors';
import {auth, db} from '../../../utilities/firebase';

const UserCard = ({newStory, storyDetail}) => {
  //Necessary states are created.
  const [user, setUser] = useState({});
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'contact', auth.currentUser.uid),
      doc => {
        let userData = {};
        if (doc.data().storyDate !== '') {
          //Calculates one day ahead by providing the current date.
          const todaysDate = new Date();
          todaysDate.setDate(new Date().getDate() - 1);
          //It is checked whether the thrown story is within 1 day.
          let date = doc.data().storyDate.toDate();
          if (todaysDate <= date) {
            userData = {...doc.data()};
          } else {
            userData = {...doc.data(), storyDate: '', storyURL: ''};
          }
        } else {
          userData = {...doc.data()};
        }
        setUser({...userData});
      },
    );

    //The unsubscribe function is executed when the component is closed.
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePress = async () => {
    //If there is user's story then run storyDetail, if not then allows the user to select pictures by camera or gallery.
    if (user.storyDate === '') {
      Alert.alert('Add Story', 'Please select the photo option', [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.5,
            });
            if (!result.cancelled) {
              newStory(result.uri);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 0.5,
            });
            if (!result.cancelled) {
              newStory(result.uri);
            }
          },
        },
      ]);
    } else {
      storyDetail(user.displayName, user.storyURL, true);
    }
  };

  //Elements that will appear on the screen are defined here
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles[theme].container}>
        <View
          style={[
            styles[theme].imageWrapper,
            user.storyDate === '' ? {borderWidth: 0} : {},
          ]}>
          {user.photoURL !== null ? (
            <Image source={{uri: user.photoURL}} style={styles[theme].image} />
          ) : (
            <Icon name="person" size={36} color={colors.plainText} />
          )}
          {user.storyDate === '' && (
            <View style={styles[theme].addWrapper}>
              <Icon name="add" size={18} color={colors.primaryBackground} />
            </View>
          )}
        </View>
        <Text style={styles[theme].displayName}>Me</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserCard;
