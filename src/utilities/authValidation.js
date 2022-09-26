import {errorMessage} from './toastMessages';

//Incoming email and password are checked and return 1 if appropriate and 0 otherwise.
export const checkLogin = (email, password) => {
  if (email.includes('@')) {
    if (password.length >= 8) {
      return 1;
    } else {
      errorMessage('Password must contain at least 8 characters!');
      return 0;
    }
  } else {
    errorMessage('Please enter a valid email!');
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
      errorMessage('Passwords do not match!');
      return 0;
    }
  } else {
    return 0;
  }
};
