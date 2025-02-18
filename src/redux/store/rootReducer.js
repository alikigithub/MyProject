import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice'; // Import all slices here

// Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authSlice'],
};

// Combine Reducers (if you have multiple slices)
const rootReducer = combineReducers({
  authSlice: authSlice,
});

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
