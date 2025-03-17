import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryApi, ICategoryDataWithTasks } from '@/entities/category';


interface InitialState {
  categories: ICategoryDataWithTasks[];
  selectedCategory: ICategoryDataWithTasks | null;
}

const initialState: InitialState = {
  categories: [],
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: 'categoryState',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategoryDataWithTasks[]>) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = state.categories.find(category => category.id === action.payload) || null;
    },
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
    extraReducers: (builder) => {
      builder
        .addMatcher(categoryApi.endpoints.getAllCategoriesWithTasksByBoardId.matchFulfilled, (state, action) => {
          state.categories = action.payload;
        })
  },
});

export const { setCategories, setSelectedCategory, clearSelectedCategory } = categorySlice.actions;
