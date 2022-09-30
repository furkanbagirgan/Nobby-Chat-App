import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Stories.style';
import StoryCard from './../StoryCard';
import {auth, db} from './../../../utilities/firebase';
import {setUserStory} from './../../../redux/authSlice';

const Stories = ({newStory, storyDetail}) => {
  //Necessary states are created.
  const userStory=useSelector(state=>state.auth.userStory);
  const [stories, setStories] = useState([]);
  const [userStoryURL, setUserStoryURL] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    //Stories retrieved from the Firestore and saved in the stories state.
    const q = query(collection(db, 'contact'), where('storyURL', '!=', ''));
    const unsubscribe = onSnapshot(q, snapshot => {
      //The logged in user is added as the first element.
      const userStories = [
        {
          id: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
          displayName: auth.currentUser.displayName,
        },
      ];
      //Calculates one day ahead by providing the current date.
      const todaysDate=new Date().getDate()-1;
      snapshot.forEach(doc => {
        //It is checked whether the thrown story is within 1 day.
        let date=new Date(doc.data().storyDate);
        if(todaysDate<=date){
          if(doc.data().id===auth.currentUser.uid){
            dispatch(setUserStory(true));
            setUserStoryURL(doc.data().storyURL);
          }
          else{
            userStories.push({...doc.data()});
          }
        }
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
      storyDetail(user.displayName, user.storyURL,false);
    } else {
      //If there is user's story then run storyDetail, if not then allows the user to select pictures by camera or gallery.
      if(!userStory){
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
      else{
        storyDetail(auth.currentUser.displayName, userStoryURL, true);
      }
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
