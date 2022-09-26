import {Alert} from 'react-native';

//Incoming email and password are checked and return 1 if appropriate and 0 otherwise.
export const checkLogin = (email, password) => {
  if (email.includes('@')) {
    if (password.length >= 8) {
      return 1;
    } else {
      Alert.alert('Error', 'Password must contain at least 8 characters!');
      return 0;
    }
  } else {
    Alert.alert('Error', 'Please enter a valid email!');
    return 0;
  }
};

//Incoming email, password, repeat password and user name are checked and return 1 if appropriate and 0 otherwise.
export const checkSignup = (email, password, repeatPassword) => {
  const res = checkLogin(email, password);
  if (res === 1) {
    if (repeatPassword === password) {
      return 1;
    } else {
      Alert.alert('Error', 'Passwords do not match!');
      return 0;
    }
  } else {
    return 0;
  }
};

//It shows the appropriate error on the screen according to the errorCode from the login.
export const showLoginError = errorCode => {
  switch (errorCode) {
    case 'auth/user-not-found':
      Alert.alert('Error', 'There is no user for this email!');
      break;
    case 'auth/wrong-password':
      Alert.alert('Error', 'Password is incorrect!');
      break;
    case 'auth/too-many-requests':
      Alert.alert('Error', 'There is too many auth request!');
      break;
    default:
      Alert.alert('Error', 'Error connecting to server!');
  }
};

//It shows the appropriate error on the screen according to the errorCode from the signUp.
export const showSignupError = errorCode => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      Alert.alert('Error', 'An account already exists for this email!');
      break;
    default:
      Alert.alert('Error', 'Error connecting to server!');
  }
};
