import { IBoardData } from '@/entities/board';
import { baseApi } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/model';


export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserBoards: builder.query<IBoardData[], void>({
      query: () => ({
        url: API_ENDPOINTS.BOARDS.GET_ALL_USER_BOARDS,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Board' as const, id })), 'Board']
          : ['Board'],
    }),
    getBoardById: builder.query<IBoardData, string>({
      query: (boardId) => ({
        url: `${API_ENDPOINTS.BOARDS.GET_BY_ID}/${boardId}`,
        method: 'GET',
      }),
      providesTags: result => [{ type: 'Board', id: result?.id }],
    }),
    createBoard: builder.mutation<IBoardData, IBoardData>({
      query: (boardData) => ({
        url: API_ENDPOINTS.BOARDS.CREATE,
        method: 'POST',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoard: builder.mutation<IBoardData, IBoardData>({
      query: (boardData) => ({
        url: API_ENDPOINTS.BOARDS.UPDATE,
        method: 'PUT',
        body: boardData,
      }),
      invalidatesTags: result => [{ type: 'Board', id: result?.id }],
    }),
    deleteBoard: builder.mutation<{ message: string }, string>({
      query: (boardId) => ({
        url: `${API_ENDPOINTS.BOARDS.DELETE}/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});


export const {
  useGetAllUserBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;