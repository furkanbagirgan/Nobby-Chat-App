import {View, Text} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './Profile.style';

const Profile = () => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <View style={styles[theme].container}>
      <Text style={{color: 'black'}}>Profile</Text>
    </View>
  );
};

export default Profile;
