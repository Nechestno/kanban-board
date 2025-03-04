import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseCategoryData } from '../model';

interface CategoryState {
  categories: IResponseCategoryData[];
  selectedCategory: IResponseCategoryData | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<IResponseCategoryData[]>) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = state.categories.find(category => category.id === action.payload) || null;
    },
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
});

export const { setCategories, setSelectedCategory, clearSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;