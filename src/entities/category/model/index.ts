export type {
  ICategoryData,
  ICategoryDataCreate
} from './category.types.ts';

export {categorySlice, setCategories, setSelectedCategory, clearSelectedCategory } from './categorySlice.ts'
export {selectCategories, selectSelectedCategory} from './categorySelectors.ts'