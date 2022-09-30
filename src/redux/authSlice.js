import {createSlice} from '@reduxjs/toolkit';

//This is the slice where auth operations are made.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    userStory: false
  },
  reducers: {
    //The new incoming data is assigned to the existing currentUser.
    setCurrentUser: (state, action) => {
      return {
        currentUser: action.payload,
        userStory: state.userStory,
      };
    },
    //The value of currentUser is being flushed.
    resetUser: (state, action) => {
      return {
        currentUser: {},
        userStory: state.userStory,
      };
    },
    //The value of currentUser is being flushed.
    setUserStory: (state, action) => {
      return {
        currentUser: state.currentUser,
        userStory: action.payload,
      };
    },
  },
});

export const {setCurrentUser, resetUser,setUserStory} = authSlice.actions;
export default authSlice.reducer;
