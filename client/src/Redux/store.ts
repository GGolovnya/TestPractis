import { configureStore } from '@reduxjs/toolkit';
import practiceReducer from './Slices/practiceSlice';

export const store = configureStore({
  reducer: {
    practice: practiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;