import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  addDoc,
  Timestamp,
  collection,
} from 'firebase/firestore';
import {ref, deleteObject, uploadBytes, getDownloadURL} from 'firebase/storage';

import {auth, db, storage} from './firebase';
import {setItem, updateItem, removeItem} from './asyncStorage';
import {errorMessage, successMessage} from './toastMessages';
import {setCurrentUser, resetUser, setUserStory} from '../redux/authSlice';
import {setTheme} from '../redux/themeSlice';

//Retrieves user information from Firestore according to userId that coming with prop.
export const getUser = async userId => {
  const docRef = doc(db, 'contact', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//Login to firebase with incoming email and password. It then saves this information to storage and redux.
//In case of an error, it displays the toast message on the screen.
export const loginWithUser = async (email, password, theme, dispatch) => {
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    //Update async storage with new values
    const userData = {
      id: user.uid,
      email: email,
      password: password,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    await setItem('@userData', userData);
    await setItem('@themeData', theme);
    //Update redux with new values
    dispatch(setCurrentUser(userData));
    dispatch(setTheme(theme));
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
//In case of an error, it displays the toast message on the screen.
export const createUser = async (email, password, displayName, dispatch) => {
  try {
    const {user: newUser} = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    //Update auth profile and firestore with new values
    await updateProfile(newUser, {displayName, photoURL: ''});
    await setDoc(doc(db, 'contact', newUser.uid), {
      id: newUser.uid,
      email: email,
      displayName,
      photoURL: null,
      storyURL: '',
      storyDate: '',
    });
    //Update async storage with new values
    const newUserData = {
      id: newUser.uid,
      email: email,
      password: password,
      displayName: displayName,
      photoURL: null,
    };
    await setItem('@userData', newUserData);
    await setItem('@themeData', 'light');
    //Update redux with new values
    dispatch(setCurrentUser(newUserData));
    dispatch(setTheme('light'));
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
    //Update if email and password changed.
    if (userSession.email !== data.email) {
      await updateEmail(auth.currentUser, data.email);
    }
    if (userSession.password !== data.password) {
      await updatePassword(auth.currentUser, data.password);
    }
    //Check profile image and delete the old one and assign a new one, depending on the situation.
    let image = profileImage === null ? null : userSession.photoURL;
    if (profileImage !== null) {
      if (profileImage !== userSession.photoURL) {
        if (userSession.photoURL !== null) {
          await deletePhoto(userSession.photoURL);
        }
        const result = await uploadPhoto(profileImage, 'profileImg');
        if (result !== '') {
          image = result;
        }
      }
    } else {
      if (userSession.photoURL !== null) {
        const fileRef = ref(storage, userSession.photoURL);
        await deleteObject(fileRef);
      }
    }
    //Update firestore with new values
    await updateDoc(doc(db, 'contact', auth.currentUser.uid), {
      email: data.email,
      displayName: data.displayName,
      photoURL: image,
    });
    //Update async storage with new values
    await updateItem('@userData', {
      ...data,
      id: auth.currentUser.uid,
      photoURL: image,
    });
    //Update auth profile with new values
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: image === null ? '' : image,
    });
    //Update redux with new values
    dispatch(
      setCurrentUser({...data, id: auth.currentUser.uid, photoURL: image}),
    );
    successMessage('The profile has been successfully updated');
  } catch (error) {
    console.log(error);
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
export const uploadPhoto = async (image, name) => {
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
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    //If there is an image in the firebase storage before, that image is deleted first and then the new image created is saved.
    const fileRef = ref(storage, auth.currentUser.uid + '-' + name);
    await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  } catch (error) {
    errorMessage(
      'Please check your internet connection!' + error.code
        ? ''
        : '',
    );
    return '';
  }
};

//Delete photo from firestore and storage
export const deletePhoto = async url => {
  //Update auth profile and firestore with new values
  await updateProfile(auth.currentUser, {
    displayName: auth.currentUser.displayName,
    photoURL: null,
  });
  await updateDoc(doc(db, 'contact', auth.currentUser.uid), {
    photoURL: '',
  });
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};

//Delete story from firestore and storage
export const deleteStory = async url => {
  //Update firestore with new values
  await updateDoc(doc(db, 'contact', auth.currentUser.uid), {
    storyURL: '',
    storyDate: '',
  });
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};

//Save new message to firestore
export const addMessage = async (newMessage, docId) => {
  //Update firestore with new values
  await updateDoc(doc(db, 'message', docId), {
    lastDate: newMessage.date,
    messages: arrayUnion(newMessage),
  });
};

//Add new message document aka chat to firestore
export const addNewChat = async (senderId, receiverId, message) => {
  await addDoc(collection(db, 'message'), {
    lastDate: Timestamp.now(),
    members: [senderId, receiverId],
    messages: [{...message}],
  });
};
