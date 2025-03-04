import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authState from '@/entities/user/model/authSlice.ts';
import { baseApi } from '@/shared/api';
import { listenerMiddleware } from '@/entities/user';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import boardState from '@/entities/board/model/boardSlice.ts';
import categoryReducer from '@/entities/category/model/categorySlice.ts';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'board'],
};
const reducer = combineReducers({
  auth: authState,
  board: boardState,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    persistedReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware).prepend(listenerMiddleware.middleware),
});


export const persistor = persistStore(store);
export default store;

