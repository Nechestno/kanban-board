import { baseApi } from '@/shared/api';
import {
  ILoginData,
  IResponseDataWithToken,
  IUserData,
} from '../model';
import { API_ENDPOINTS } from '@/shared/model';


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponseDataWithToken, ILoginData>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<IResponseDataWithToken, IUserData>({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<IResponseDataWithToken, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.CURRENT,
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;