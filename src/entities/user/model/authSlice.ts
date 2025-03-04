import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api';
import { IUserDataWithToken } from './user.types.ts';
import { baseApi } from '@/shared/api';

interface InitialState {
  user: IUserDataWithToken | null;
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
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;

export const handleLogout = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  dispatch(baseApi.util.resetApiState());
};
export default authSlice.reducer;

