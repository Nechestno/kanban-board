import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { boardSlice }from '@/entities/board';
import { categorySlice } from '@/entities/category';
import { listenerMiddleware } from '@/entities/user';
import { authSlice } from '@/entities/user';
import { baseApi } from '@/shared/api';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'board'],
};
const reducer = combineReducers({
  auth: authSlice.reducer,
  board: boardSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    persistedReducer,
    category: categorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware).prepend(listenerMiddleware.middleware),
});


export const persistor = persistStore(store);
export default store;

