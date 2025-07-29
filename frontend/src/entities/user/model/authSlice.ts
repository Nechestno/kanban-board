import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api';

interface InitialState {
  user: string | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.name;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.name;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload.name;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

