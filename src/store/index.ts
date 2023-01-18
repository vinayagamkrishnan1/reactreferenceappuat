import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;