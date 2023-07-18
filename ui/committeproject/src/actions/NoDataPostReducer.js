import { createSlice } from '@reduxjs/toolkit';
import React from "react";

const initialState = {
  setnoDataPostKey: true,
};

export const noDataPostSlice = createSlice({
  name: 'noDataPostKeyGet',
  initialState,
  reducers: {
    setNoPost: (state, action) => {
      state.setnoDataPostKey = action.payload;
    },
  },
});

export const { setNoPost } = noDataPostSlice.actions;

export const selectNoDataPostKey = (state) => state.noDataPostKeyGet.setnoDataPostKey;

export default noDataPostSlice.reducer;