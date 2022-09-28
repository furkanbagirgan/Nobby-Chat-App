import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {query, collection, where, getDocs} from 'firebase/firestore';

//The new incoming data is assigned to the existing chats.
export const getChats = createAsyncThunk('chat/getChats', async userId => {
  try {
    const data = [];
    const q = query(
      collection(db, 'message'),
      where('members', 'array-contains', userId),
    );
    const docs = getDocs(q);
    docs.forEach(doc => {
      data.push({...doc.data(), docId: doc.id});
    });
    return data;
  } catch {
    return [];
  }
});

//This is the slice where chat operations are made.
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    loading: false,
    error: false,
  },
  extraReducers: builder => {
    builder
      .addCase(getChats.pending, (state, action) => {
        //The reducer that will be generated while the getChats function is running.
        return {
          loading: true,
          error: false,
        };
      })
      .addCase(getChats.fulfilled, (state, action) => {
        //The reducer that will occur when the getChats function is positive.
        return {
          chats: action.payload,
          loading: false,
          error: false,
        };
      })
      .addCase(getChats.rejected, (state, action) => {
        //The reducer that will occur when the getChats function has failed.
        return {
          chats: action.payload,
          loading: false,
          error: true,
        };
      });
  },
});

export default chatSlice.reducer;
