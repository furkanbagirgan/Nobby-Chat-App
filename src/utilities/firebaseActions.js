import {signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';

import {auth} from './firebase';
import {errorMessage} from './toastMessages';

//Login to firebase with incoming email and password. It then saves this information to storage and redux.
//In case of an error, it displays the toast message on the screen.
export const loginWithUser=async(email,password)=>{
  try{
    const {user}=await signInWithEmailAndPassword(auth, email, password);
    const userData={
      email: email,
      password: password,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    await setItem('@userData', userData);
    await setItem('@themeData', 'light');
    dispatch(
      setCurrentUser(userData),
    );
    dispatch(setTheme('light'));
  }
  catch (error){
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage('There is no user for this email!');
        break;
      case 'auth/wrong-password':
        errorMessage('Password is incorrect!');
        break;
      case 'auth/too-many-requests':
        errorMessage('There is too many auth request!');
        break;
      default:
        errorMessage('Error connecting to server!');
    }
  }
}

//Creates a new user in firebase with the incoming user data. It then saves this information to storage and redux.
//In case of an error, it displays the toast message on the screen.
export const createUser=async(email,password,displayName,photoURL)=>{
  try{
    const {user}=await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user,{displayName,photoURL});
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: email,
      displayName,
      photoURL,
      location: '',
      storyURL: '',
    });
    const newUserData={
      email: email,
      password: password,
      displayName: displayName,
      photoURL: photoURL
    }
    await setItem('@userData', newUserData);
    await setItem('@themeData', 'light');
    dispatch(setCurrentUser(newUserData));
    dispatch(setTheme('light'));
  }
  catch (error){
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage('An account already exists for this email!');
        break;
      default:
        errorMessage('Error connecting to server!');
    }
  }
}