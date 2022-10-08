import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessage} from './toastMessages';

//Writes data to storage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    errorMessage(
      'Could not write to storage!' + error.code ? '' : '',
    );
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
  } catch (error) {
    errorMessage(
      'Storage could not be read!' + error.code ? '' : '',
    );
    return 0;
  }
};

//Update data in storage
export const updateItem = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    errorMessage(
      'Could not update storage!' + error.code ? '' : '',
    );
  }
};

//Remove data from storage
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    errorMessage(
      'Could not delete from storage!' + error.code
        ? ' Code:' + error.code
        : '',
    );
  }
};
