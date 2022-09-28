import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Home from './../screens/Home';
import Profile from './../screens/Profile';
import colors from './../styles/colors';

const Tab = createBottomTabNavigator();

//Here, the tabs required for the bottom navigation are created and the necessary configs are made.
const BottomTabs = () => {
  //The theme information is accessed with the useSelector hook.
  const theme = useSelector(state => state.theme.theme);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        //Here the tabBar icon is set according to the screen name.
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconSize = 26;
          if (route.name === 'Home') {
            iconName = 'chatbubbles';
            iconSize = 28;
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarStyle: {
          backgroundColor:
            theme === 'light' ? colors.lightBackground : colors.darkBackground,
          position: 'absolute',
          bottom: 30,
          marginHorizontal: 80,
          height: 60,
          borderRadius: 25,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor:
          theme === 'light' ? colors.darkBackground : colors.primaryBackground,
        tabBarInactiveTintColor:
          theme === 'light' ? colors.plainText : colors.darkText,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
