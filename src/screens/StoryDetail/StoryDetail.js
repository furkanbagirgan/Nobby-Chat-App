import {
  SafeAreaView,
  Image,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import styles from './StoryDetail.style';
import colors from '../../styles/colors';
import {deleteStory} from '../../utilities/firebaseActions';
import {setUserStory} from '../../redux/authSlice';

const StoryDetail = ({route, navigation}) => {
  //Necessary states are created.
  const {storyURL, removeStory} = route.params;
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();

  //If the user is sure about deleting the story, the story is deleted and
  //the previous page is returned and if cancelled, nothing will happen.
  const deleteUserStory = async () => {
    Alert.alert('Delete Story', 'Are you sure you want to delete your story?', [
      {
        text: 'Cancel',
        onPress: async () => {},
      },
      {
        text: 'Delete',
        onPress: async () => {
          setLoading(true);
          await deleteStory(storyURL);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  //If loading is true prints ActivityIndicator to screen
  if (loading) {
    return (
      <View style={styles[theme].loadingWrapper}>
        <ActivityIndicator color={colors.primaryBackground} size={35} />
      </View>
    );
  }

  //Elements that will appear on the screen are defined here
  return (
    <SafeAreaView style={styles[theme].container}>
      {storyURL !== '' ? (
        <>
          {imageLoading && (
            <View style={styles[theme].imageLoadingWrapper}>
              <ActivityIndicator color={colors.primaryBackground} size={35} />
            </View>
          )}
          <Image
            source={{uri: storyURL}}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            style={styles[theme].image}
          />
          {removeStory && (
            <View style={styles[theme].deleteWrapper}>
              <Icon
                name="trash"
                color={colors.primaryBackground}
                size={25}
                onPress={deleteUserStory}
              />
            </View>
          )}
        </>
      ) : (
        <View style={styles[theme].errorWrapper}>
          <Text style={styles[theme].errorText}>
            An error was viewing the image.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StoryDetail;
