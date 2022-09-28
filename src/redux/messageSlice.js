import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDoc, doc} from 'firebase/firestore';

//The new incoming data is assigned to the existing messages.
export const getMessages = createAsyncThunk(
  'message/getMessages',
  async docId => {
    try {
      const data = [];
      const docRef = doc(db, 'message', docId);
      const chat = await getDoc(docRef);
      data = [...chat.data().messages];
      return data;
    } catch {
      return [];
    }
  },
);

//This is the slice where message operations are made.
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    loading: false,
    error: false,
  },
  extraReducers: builder => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        //The reducer that will be generated while the getMessages function is running.
        return {
          loading: true,
          error: false,
        };
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        //The reducer that will occur when the getMessages function is positive.
        return {
          messages: action.payload,
          loading: false,
          error: false,
        };
      })
      .addCase(getMessages.rejected, (state, action) => {
        //The reducer that will occur when the getMessages function has failed.
        return {
          messages: action.payload,
          loading: false,
          error: true,
        };
      });
  },
});

export default messageSlice.reducer;
