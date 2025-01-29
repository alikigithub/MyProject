import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
const store = configureStore({
  reducer: {
    authSlice: authSlice,
  },
});
export default store;
