export const selectIsAuthenticated = (state: RootState) =>
  state.persistedReducer.auth.isAuthenticated;

export const selectUser = (state: RootState) =>
  state.persistedReducer.auth.user;