import {SafeAreaView, Image, View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import styles from './StoryDetail.style';

const StoryDetail = ({route}) => {
  //Necessary states are created.
  const {displayName,storyURL} = route.params;
  const theme = useSelector(state => state.theme.theme);

  return (
    <SafeAreaView style={styles[theme].container}>
      {storyURL !== '' ? (
        <Image source={{uri: storyURL}} style={styles[theme].image} />
      ) : (
        <View style={styles[theme].errorWrapper}>
          <Text style={styles[theme].errorText}>An error was viewing the image.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StoryDetail;
