import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import {useSelector} from 'react-redux';

import styles from './Stories.style';
import StoryCard from './../StoryCard';
import UserCard from './../UserCard';
import {db} from './../../../utilities/firebase';

const Stories = ({newStory, storyDetail}) => {
  //Necessary states are created.
  const currentUser = useSelector(state => state.auth.currentUser);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    //Stories retrieved from the Firestore and saved in the stories state.
    const q = query(
      collection(db, 'contact'),
      where('storyDate', '!=', ''),
      orderBy('storyDate', 'desc'),
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const userStories = [];
      //The logged in user is added as the first element.
      userStories.unshift({...currentUser});
      //Calculates one day ahead by providing the current date.
      const todaysDate = new Date();
      todaysDate.setDate(new Date().getDate() - 1);
      snapshot.forEach(doc => {
        //It is checked whether the thrown story is within 1 day.
        let date = doc.data().storyDate.toDate();
        if (todaysDate <= date) {
          if (doc.data().id !== currentUser.id) {
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
    if (item.id === currentUser.id) {
      return <UserCard storyDetail={storyDetail} newStory={newStory} />;
    } else {
      return <StoryCard user={item} handlePress={() => checkUser(item)} />;
    }
  };

  //Checking user and running appropriate function
  const checkUser = async user => {
    storyDetail(user.displayName, user.storyURL, false);
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
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Stories;
