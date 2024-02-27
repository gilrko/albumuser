import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    albums: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;