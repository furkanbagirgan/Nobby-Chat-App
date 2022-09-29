import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessage} from './toastMessages';

//Writes data to storage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    errorMessage('Could not write to storage!');
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
    errorMessage('Storage could not be read!');
    return 0;
  }
};

//Update data in storage
export const updateItem = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch {
    errorMessage('Could not update storage!');
  }
};

//Remove data from storage
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    errorMessage('Could not delete from storage!');
  }
};
