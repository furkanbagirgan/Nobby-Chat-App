import {createSlice} from '@reduxjs/toolkit';
import {query, doc, where, onSnapshot} from 'firebase/firestore';

//This is the slice where contact operations are made.
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    cancelSnapshot: () => {},
    loading: false,
    error: false,
  },
  reducers: {
    getMessages: (state, action) => {
      try {
        const data = [];
        const chat = doc(db, 'message', action.payload);
        const unsubscribe = onSnapshot(chat, doc => {
          data=[...doc.data().messages];
        });
        return {
          cancelSnapshot: unsubscribe,
          messages: data,
        };
      } catch {
        return {
          cancelSnapshot: () => {},
          messages: [],
        };
      }
    },
  },
});

export const {getMessages} = messageSlice.actions;
export default messageSlice.reducer;
