import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

//Writes data to storage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    Alert.alert('Storage Error', 'Could not write to storage!');
  }
};

//Read data from storage
export const getItem = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return 0;
    }
  } catch {
    Alert.alert('Storage Error', 'Storage could not be read!');
    return 0;
  }
};

//Update data in storage
export const updateItem = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch {
    Alert.alert('Storage Error', 'Could not update storage!');
  }
};

//Remove data from storage
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    Alert.alert('Storage Error', 'Could not delete from storage!');
  }
};
