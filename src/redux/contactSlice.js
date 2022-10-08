import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {collection, getDocs} from 'firebase/firestore';
import {auth, db} from '../utilities/firebase';
import {errorMessage} from './../utilities/toastMessages';

//The new incoming data is assigned to the existing contacts.
export const getContacts = createAsyncThunk('contact/getContacts', async () => {
  try {
    let data = [];
    const snapshot = await getDocs(collection(db, 'contact'));
    snapshot.forEach(doc => {
      if (doc.data().id !== auth.currentUser.uid) {
        data.push({
          id: doc.data().id,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          docId: doc.id,
        });
      }
    });
    return data;
  } catch (error) {
    errorMessage(
      'Please check your internet connection' + error.code
        ? ''
        : '',
    );
    return [];
  }
});

//This is the slice where contact operations are made.
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    loading: false,
    error: false,
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        //The reducer that will be generated while the getContacts function is running.
        return {
          loading: true,
          error: false,
        };
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        //The reducer that will occur when the getContacts function is positive.
        return {
          contacts: action.payload,
          loading: false,
          error: false,
        };
      })
      .addCase(getContacts.rejected, (state, action) => {
        //The reducer that will occur when the getContacts function has failed.
        return {
          contacts: action.payload,
          loading: false,
          error: true,
        };
      });
  },
});

export default contactSlice.reducer;
