import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';

import BottomTabs from './BottomTabs';
import Message from '../screens/Message';
import StoryDetail from '../screens/StoryDetail';
import Contact from '../screens/Contact';
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
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor:
              theme === 'light'
                ? colors.lightBackground
                : colors.darkBackground,
          },
          headerTintColor:
            theme === 'light' ? colors.primaryText : colors.secondaryText,
          headerTitleAlign: 'center',
          headerTitle: 'Select the person',
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <Icon
                name="close"
                size={28}
                color={
                  theme === 'light' ? colors.primaryText : colors.secondaryText
                }
                onPress={() => navigation.goBack()}
              />
            );
          },
        })}
      />
      {/*On the right side of the chat screen, there is a picture of the person to message.*/}
      <Stack.Screen
        name="Message"
        component={Message}
        options={({route, navigation}) => ({
          headerStyle: {
            backgroundColor:
              theme === 'light'
                ? colors.lightBackground
                : colors.darkBackground,
          },
          headerTintColor:
            theme === 'light' ? colors.primaryText : colors.secondaryText,
          headerTitle: route.params.displayName,
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <>
                <TouchableHighlight
                  style={styles.backButton}
                  underlayColor={theme === 'light' ? '#eee' : '#555'}
                  onPress={() => navigation.popToTop()}>
                  <Icon
                    name="arrow-back"
                    color={
                      theme === 'light'
                        ? colors.primaryText
                        : colors.secondaryText
                    }
                    size={25}
                  />
                </TouchableHighlight>
                <View style={styles.imageWrapper}>
                  {route.params.photoURL !== null ? (
                    <Image
                      source={{uri: route.params.photoURL}}
                      style={styles.image}
                    />
                  ) : (
                    <Icon
                      name="person"
                      color={
                        theme === 'light'
                          ? colors.primaryBackground
                          : colors.secondaryBackground
                      }
                      size={18}
                    />
                  )}
                </View>
              </>
            );
          },
        })}
      />
      <Stack.Screen
        name="StoryDetail"
        component={StoryDetail}
        options={({route, navigation}) => ({
          headerStyle: {
            backgroundColor: colors.darkBackground,
          },
          headerTintColor: colors.secondaryText,
          headerTitleAlign: 'center',
          headerTitle: route.params.displayName,
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <Icon
                name="close"
                size={28}
                color="#FFF"
                onPress={() => navigation.goBack()}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

//Here is the required style for the image to be displayed in the header of the chat screen.
const styles = StyleSheet.create({
  backButton: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.plainText,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
});

export default ContentStack;
