import {createSlice} from '@reduxjs/toolkit';

//This is the slice where theme operations are made.
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
  reducers: {
    //The new incoming data is assigned to the existing theme.
    setTheme: (state, action) => {
      return {
        theme: action.payload,
      };
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
