import { baseApi } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/model';
import { ICategoryData, ICategoryDataCreate, IResponseCategoryData } from '../model';


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoriesWithTasksByBoardId: builder.query<IResponseCategoryData[], string>({
      query: (boardId) => ({
        url: `${API_ENDPOINTS.CATEGORIES.GET_ALL_WITH_TASKS_BY_BOARD_ID}/${boardId}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Category' as const, id })), 'Category']
          : ['Category', 'Task'],
    }),
    createCategory: builder.mutation<IResponseCategoryData, ICategoryDataCreate>({
      query: (categoryData) => ({
        url: API_ENDPOINTS.CATEGORIES.CREATE,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: ['Category']
    }),
    updateCategory: builder.mutation<ICategoryData, ICategoryData>({
      query: (categoryData) => ({
        url: API_ENDPOINTS.CATEGORIES.CREATE,
        method: 'PATCH',
        body: categoryData,
      }),
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (categoryId) => ({
        url: `${API_ENDPOINTS.CATEGORIES.DELETE}/${categoryId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetAllCategoriesWithTasksByBoardIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;