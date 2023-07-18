import { createSlice } from '@reduxjs/toolkit';
import React from "react";

const zoomSlice = createSlice({
  name: 'zoom',
  initialState: {
    zoomLevel: 100,
  },
  reducers: {
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
  },
});

export const { setZoomLevel } = zoomSlice.actions;
export default zoomSlice.reducer;