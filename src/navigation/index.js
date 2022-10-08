import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import AuthStack from './AuthStack';
import ContentStack from './ContentStack';
import {getItem} from '../utilities/asyncStorage';
import {loginWithUser} from '../utilities/firebaseActions';

const Navigation = () => {
  //The currentUser information is accessed with the useSelector hook.
  //setTheme and setCurrentUser function is accessed with the useDispatch hook.
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  //Checking if there is any user data saved in the storage. If there is, this user and theme information is saved in redux.
  useEffect(() => {
    async function prepare() {
      const userData = await getItem('@userData');
      const themeData = await getItem('@themeData');
      if (userData !== 0 || themeData !== 0) {
        await loginWithUser(
          userData.email,
          userData.password,
          themeData,
          dispatch,
        );
      }
      setAppIsReady(true);
    }
    prepare();
  }, []);

  //If app Ready is true, the appropriate stack appears on the screen.
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  //If appIsReady is false, nothing will appear on the screen, so the splash screen will work.
  if (!appIsReady) {
    return null;
  }

  //Here, the appropriate navigation structure is displayed on the screen according to the userSession status.
  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {currentUser.email ? <ContentStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
