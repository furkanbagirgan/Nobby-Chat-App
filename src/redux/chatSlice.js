import {createSlice} from '@reduxjs/toolkit';
import {query, collection, where, onSnapshot} from 'firebase/firestore';

//This is the slice where contact operations are made.
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    cancelSnapshot: () => {},
    loading: false,
    error: false,
  },
  reducers: {
    getChats: (state, action) => {
      try {
        const data = [];
        const q = query(
          collection(db, 'chats'),
          where('members', 'array-contains', action.payload),
        );
        const unsubscribe = onSnapshot(q, querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push({...doc.data(), docId: doc.id});
          });
        });
        return {
          cancelSnapshot: unsubscribe,
          chats: data,
        };
      } catch {
        return {
          cancelSnapshot: () => {},
          chats: [],
        };
      }
    },
  },
});

export const {getChats} = chatSlice.actions;
export default chatSlice.reducer;
