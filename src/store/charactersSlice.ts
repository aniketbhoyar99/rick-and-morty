import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CharactersState } from "../types";

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCurrentPage, clearError } = charactersSlice.actions;
export default charactersSlice.reducer;
