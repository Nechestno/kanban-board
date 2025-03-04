import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).persistedReducer.auth.user?.token ||
      localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const baseApi = createApi({
  reducerPath: 'splitApi',
  keepUnusedDataFor: 30,
  baseQuery: baseQueryWithRetry,
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