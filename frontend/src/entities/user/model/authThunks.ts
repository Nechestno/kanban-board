import { baseApi } from '@/shared/api';
import { removeCookies } from '@/shared/lib';
import { logout } from './authSlice';

export const handleLogout = () => (dispatch: AppDispatch) => {
  dispatch(logout());
  dispatch(baseApi.util.resetApiState());
  removeCookies();
};