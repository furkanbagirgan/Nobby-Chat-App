import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';

import Login from './../screens/Login';
import Signup from './../screens/Signup';

const Stack = createNativeStackNavigator();

//It is the navigation structure that will be shown in case there is no entry yet.
const AuthStack = () => {
  //The theme information is accessed with the useSelector hook.
  const theme = useSelector(state => state.theme.theme);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerStyle: {
            backgroundColor: colors.primaryBlue,
          },
          headerTintColor:
            theme === 'light' ? colors.secondaryText : colors.primaryText,
          headerTitle: '',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
