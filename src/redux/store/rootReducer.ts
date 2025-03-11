import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import chatSlice from '../slice/chatSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSlice', 'chatSlice'],
};

const rootReducer = combineReducers({
  userSlice: userSlice,
  chatSlice: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
