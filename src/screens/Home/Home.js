import { View, Text } from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

import styles from './Home.style';
import { logOut } from '../../utilities/firebaseActions';

const Home = ({navigation}) => {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <View style={styles[theme].container}>
      <Text onPress={()=>logOut(dispatch)} style={{color:'black'}}>Home</Text>
    </View>
  )
}

export default Home