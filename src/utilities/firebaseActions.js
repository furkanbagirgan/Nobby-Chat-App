import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import {doc, setDoc, updateDoc, getDoc} from 'firebase/firestore';
import {ref, deleteObject, uploadBytes, getDownloadURL} from 'firebase/storage';

import {auth, db, storage} from './firebase';
import {setItem, updateItem, removeItem} from './asyncStorage';
import {errorMessage, successfulMessage} from './toastMessages';
import {setCurrentUser, resetUser} from '../redux/authSlice';
import {setTheme} from '../redux/themeSlice';
import {getChats} from '../redux/chatSlice';

//Retrieves user information from Firestore.
export const getUser = async () => {
  const docRef = doc(db, 'contact', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//Login to firebase with incoming email and password. It then saves this information to storage and redux.
//Then get chats from firestore and save redux. In case of an error, it displays the toast message on the screen.
export const loginWithUser = async (email, password, theme, dispatch) => {
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    const userData = {
      email: email,
      password: password,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    await setItem('@userData', userData);
    await setItem('@themeData', theme);
    dispatch(setCurrentUser(userData));
    dispatch(setTheme(theme));
    dispatch(getChats(user.uid));
  } catch (error) {
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
};

//Creates a new user in firebase with the incoming user data. It then saves this information to storage and redux.
//Then get chats from firestore and save redux. In case of an error, it displays the toast message on the screen.
export const createUser = async (
  email,
  password,
  displayName,
  photoURL,
  dispatch,
) => {
  try {
    const {user: newUser} = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(newUser, {displayName, photoURL});
    await setDoc(doc(db, 'contact', newUser.uid), {
      id: newUser.uid,
      email: email,
      displayName,
      photoURL,
      storyURL: '',
    });
    const newUserData = {
      email: email,
      password: password,
      displayName: displayName,
      photoURL: photoURL,
    };
    await setItem('@userData', newUserData);
    await setItem('@themeData', 'light');
    dispatch(setCurrentUser(newUserData));
    dispatch(setTheme('light'));
    dispatch(getChats(newUser.uid));
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage('An account already exists for this email!');
        break;
      default:
        errorMessage('Error connecting to server!');
    }
  }
};

//Remove user and theme data from storage and reset user data in redux. Then sign out of firebase
export const logOut = async dispatch => {
  await removeItem('@userData');
  await removeItem('@themeData');
  dispatch(resetUser());
  await signOut(auth);
};

//Changed user data here is updated via redux, storage and firestore.
export const editProfile = async (
  data,
  userSession,
  profileImage,
  dispatch,
) => {
  try {
    if (userSession.email !== data.email) {
      await updateEmail(auth.currentUser, data.email);
    }
    if (userSession.password !== data.password) {
      await updatePassword(auth.currentUser, data.password);
    }
    let image = profileImage === '' ? '' : auth.currentUser.profileURL;
    if (profileImage !== '') {
      if (profileImage !== auth.currentUser.profileURL) {
        if (auth.currentUser.photoURL !== '') {
          await deletePhoto('profileImg');
        }
        const result = await uploadPhoto(profileImage, 'profileImg');
        if (result !== '') {
          image = result;
        }
      }
    } else {
      if (auth.currentUser.profileURL !== '') {
        const fileRef = ref(storage, auth.currentUser.uid + '-profileImg');
        await deleteObject(fileRef);
      }
    }
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      email: data.email,
      displayName: data.displayName,
      profileURL: image,
    });
    await updateItem('@userData', {...data, photoURL: image});
    dispatch(setCurrentUser({...data, photoURL: image}));
    successfulMessage('The profile has been successfully updated');
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage('An account already exists for this email!');
        break;
      default:
        errorMessage('Error connecting to server!');
    }
  }
};

//The picture that selected from the gallery or camera is turned into a blob and saved to firebase storage.
export const uploadPhoto = async (profileImage, name) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', profileImage, true);
      xhr.send(null);
    });

    //If there is an image in the firebase storage before, that image is deleted first and then the new image created is saved.
    const fileRef = ref(storage, auth.currentUser.uid + '-' + name);
    await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  } catch {
    errorMessage('Please check your internet connection!');
    return '';
  }
};

export const deletePhoto = async name => {
  const fileRef = ref(storage, auth.currentUser.uid + '-' + name);
  await deleteObject(fileRef);
};
