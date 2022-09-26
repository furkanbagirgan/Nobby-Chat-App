import {createSlice} from '@reduxjs/toolkit';

//This is the slice where auth operations are made.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
  },
  reducers: {
    //The new incoming data is assigned to the existing currentUser.
    setCurrentUser: (state, action) => {
      return {
        currentUser: action.payload,
      };
    },
    //The value of currentUser is being flushed.
    resetUser: (state, action) => {
      return {
        currentUser: {},
      };
    },
  },
});

export const {setCurrentUser, resetUser} = authSlice.actions;
export default authSlice.reducer;
