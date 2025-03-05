import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardData } from '@/entities/board';

interface BoardState {
  boards: IBoardData[];
  selectedBoardId: string | null;
  previousBoardId: string | null;
}

const initialState: BoardState = {
  boards: [],
  selectedBoardId: null,
  previousBoardId: null,
};

export const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<IBoardData[]>) {
      state.boards = action.payload;
    },
    setSelectedBoardId(state, action: PayloadAction<string | null>) {
      state.selectedBoardId = action.payload;
    },
    setPreviousBoardId(state, action: PayloadAction<string | null>) {
      state.previousBoardId = action.payload;
    }
  },
});

// Export actions and reducer
export const { setBoards, setSelectedBoardId, setPreviousBoardId } = boardSlice.actions;
export default boardSlice.reducer;