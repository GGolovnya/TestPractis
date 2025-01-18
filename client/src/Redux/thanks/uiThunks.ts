import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface UIState {
  isLoading: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

export const setLoadingThunk = createAsyncThunk<void, boolean, { dispatch: AppDispatch }>(
  'ui/setLoading',
  async (isLoading, { dispatch }) => {
    dispatch({ type: 'ui/setLoading', payload: isLoading });
  }
);

export const toggleThemeThunk = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'ui/toggleTheme',
  async (_, { dispatch }) => {
    dispatch({ type: 'ui/toggleTheme' });
  }
);

export const toggleSidebarThunk = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'ui/toggleSidebar',
  async (_, { dispatch }) => {
    dispatch({ type: 'ui/toggleSidebar' });
  }
);