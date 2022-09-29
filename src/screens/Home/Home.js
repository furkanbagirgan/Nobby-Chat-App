import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import styles from './Home.style';
import colors from '../../styles/colors';
import StoryModal from './../../components/Story/StoryModal';
import Stories from './../../components/Story/Stories';

const Home = ({navigation}) => {
  //Necessary states are created.
  const currentUser = useSelector(state => state.auth.currentUser);
  const themea = useSelector(state => state.theme.theme);
  const theme = 'light';
  const dispatch = useDispatch();
  const [dayMessage, setDayMessage] = useState('');
  const [story, setStory] = useState('');
  const [showStoryModal, setShowStoryModal] = useState(false);

  //Runs the adjustDayMessage function when the screen is first turned on.
  useEffect(() => {
    adjustDayMessage();
  }, []);

  //The appropriate message is set according to the current time.
  const adjustDayMessage = () => {
    const today = new Date();
    const hour = today.getHours();
    switch (true) {
      case 6 <= hour && hour < 12:
        setDayMessage('Good Morning');
        break;
      case 12 <= hour && hour < 18:
        setDayMessage('Good Afternoon');
        break;
      case 18 <= hour && hour < 23:
        setDayMessage('Good Evening');
        break;
      default:
        setDayMessage('Good Night');
        break;
    }
  };

  //Here is the function that allows switching to the story detail screen when each storyCard component is clicked.
  const goToStoryDetail = (displayName, storyURL) => {
    navigation.navigate('StoryDetail', {displayName, storyURL});
  };

  //Displays the picture selected by the user to add a new story with a modal.
  const addNewStory = storyURL => {
    setStory(storyURL);
    storyModalToggle();
  };

  //Allows the story modal to close if it is open, and to open if it is closed.
  const storyModalToggle = () => {
    setShowStoryModal(!showStoryModal);
  };

  //Elements that will appear on the screen are defined here
  return (
    <LinearGradient
      colors={colors.primaryGradientColors}
      start={{x: 0.0, y: 0.5}}
      end={{x: 1.0, y: 0.5}}
      style={styles[theme].container}>
      {/* Prints information such as user picture and name on the screen */}
      <View style={styles[theme].headerContainer}>
        <View style={styles[theme].headerTextWrapper}>
          <Text style={styles[theme].headerText}>{dayMessage}</Text>
          <Text style={styles[theme].displayName}>
            {currentUser.displayName}
          </Text>
        </View>
        <View style={styles[theme].rightContainer}>
          <View style={styles[theme].newMessageWrapper}>
            <View style={styles[theme].iconWrapper}>
              <Icon name="add" color={colors.plainText} size={25} />
            </View>
            <Text style={styles[theme].headerText}>Message</Text>
          </View>
          <View style={styles[theme].userWrapper}>
            <View style={styles[theme].imageWrapper}>
              {currentUser.photoURL !== null ? (
                <Image
                  source={{uri: currentUser.photoURL}}
                  style={styles[theme].image}
                />
              ) : (
                <Icon name="person" color={colors.plainText} size={20} />
              )}
            </View>
            <Text style={styles[theme].headerText}>Me</Text>
          </View>
        </View>
      </View>
      {/* prints stories to the screen. */}
      <View style={styles[theme].storiesContainer}>
        <Stories newStory={addNewStory} storyDetail={goToStoryDetail} />
      </View>
      {/* prints chats to the screen. */}
      <View style={styles[theme].chatContainer}></View>
      <StoryModal
        visible={showStoryModal}
        close={storyModalToggle}
        storyUrl={story}
        theme={theme}
      />
    </LinearGradient>
  );
};

export default Home;
