import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

import styles from './Stories.style';
import {auth, db} from './../../../utilities/firebase';
import StoryCard from './../StoryCard';

const Stories = ({newStory, storyDetail}) => {
  //Necessary states are created.
  const [stories, setStories] = useState([]);

  useEffect(() => {
    //Stories retrieved from the Firestore and saved in the stories state.
    const q = query(collection(db, 'contact'), where('storyURL', '!=', ''));
    const unsubscribe = onSnapshot(q, snapshot => {
      const userStories = [
        {
          id: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
          displayName: auth.currentUser.displayName,
        },
      ];
      snapshot.forEach(doc => {
        userStories.push({...doc.data()});
      });
      setStories([...userStories]);
    });

    //The unsubscribe function is executed when the screen is closed.
    return () => {
      unsubscribe();
    };
  }, []);

  //Here is the function where key assignments of the fields to repeat in the flat list are made.
  const keyExtractor = item => {
    return String(item.id);
  };

  //Here, there is a function that adjusts how the areas to be repeated in the
  //flat list will appear on the screen. Also, a storyCard component is created for each chat.
  const renderItem = ({item}) => {
    return <StoryCard user={item} handlePress={() => checkUser(item)} />;
  };

  //Checking user and running appropriate function
  const checkUser = async user => {
    if (auth.currentUser.uid !== user.id) {
      storyDetail(user.displayName, user.storyURL);
    } else {
      //This function allows the user to select pictures by camera or gallery.
      Alert.alert('Add Story', 'Please select the photo option', [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
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
              aspect: [1, 1],
              quality: 0.5,
            });
            if (!result.cancelled) {
              newStory(result.uri);
            }
          },
        },
      ]);
    }
  };

  //Elements that will appear on the screen are defined here
  return (
    <FlatList
      contentContainerStyle={styles.container}
      keyExtractor={keyExtractor}
      data={stories}
      renderItem={renderItem}
      overScrollMode="never"
      bounces={false}
      horizontal={true}
    />
  );
};

export default Stories;
