import {
  type BaseQueryFn,
  type FetchArgs,
  createApi,
  fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie'
import { removeCookies, setCookies } from '@/shared/lib';
import { API_ENDPOINTS, ErrorWithMessage } from '../model';


const mutex = new Mutex();
const _baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers) => {

    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ErrorWithMessage, {}>;

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ErrorWithMessage,
  {}
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await _baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const res: any = await _baseQuery(
          {
            url: API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN,
            method: 'POST',
            body: Cookies.get('refreshToken'),
          },
          api,
          extraOptions,
        );

        if (res.data) {
          const { refreshToken, accessToken } = res.data;
          setCookies({ refreshToken, accessToken });
          result = await _baseQuery(args, api, extraOptions);
        } else {
          removeCookies();

        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await _baseQuery(args, api, extraOptions);
    }
  }
  return result;
};


export const baseApi = createApi({
  reducerPath: 'splitApi',
  keepUnusedDataFor: 30,
  baseQuery: baseQueryWithRefresh,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Board', 'Category','Task'],
  endpoints: (builder) => ({
    resetApiState: builder.query<void, void>({
      query: () => '',
      providesTags: [],
    }),
  }),
});



export const { useResetApiStateQuery } = baseApi;