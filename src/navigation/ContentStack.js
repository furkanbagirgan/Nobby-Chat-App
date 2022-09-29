import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import BottomTabs from './BottomTabs';
import Chat from '../screens/Chat';
import StoryDetail from '../screens/StoryDetail';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

//It is the navigation structure that will be displayed when the login is still made.
const ContentStack = () => {
  //The theme information is accessed with the useSelector hook.
  const theme = useSelector(state => state.theme.theme);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      {/*On the right side of the chat screen, there is a picture of the person to message.*/}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          headerStyle: {
            backgroundColor:
              theme === 'light'
                ? colors.lightBackground
                : colors.darkBackground,
          },
          headerTintColor:
            theme === 'light' ? colors.secondaryText : colors.secondaryText,
          headerTitleAlign: 'center',
          headerTitle: route.params.chatName,
          headerShadowVisible: false,
          headerBackVisible: true,
          headerRight: () => (
            <Image
              source={{uri: route.params.receiverPhoto}}
              style={styles.image}
            />
          ),
        })}
      />
      <Stack.Screen
        name="StoryDetail"
        component={StoryDetail}
        options={({route}) => ({
          presentation: 'modal',
          headerStyle: {
            backgroundColor:
              theme === 'light'
                ? colors.lightBackground
                : colors.darkBackground,
          },
          headerTintColor:
            theme === 'light' ? colors.secondaryText : colors.secondaryText,
          headerTitleAlign: 'center',
          headerTitle: route.params.displayName,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

//Here is the required style for the image to be displayed in the header of the chat screen.
const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default ContentStack;
