export const selectBoards = (state: RootState) => state.persistedReducer.board.boards;
export const selectSelectedBoardId = (state: RootState) => state.persistedReducer.board.selectedBoardId;
