import {configureStore} from '@reduxjs/toolkit';

import AuthReducer from './authSlice';
import ThemeReducer from './themeSlice';
import ContactReducer from './contactSlice';

//A store is created by pulling reducers from all slices.
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    theme: ThemeReducer,
    contact: ContactReducer,
  },
});

export default store;
