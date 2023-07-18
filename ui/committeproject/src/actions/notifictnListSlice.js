import { createSlice } from '@reduxjs/toolkit';
import React from "react";

const initialState = {
  notificatDetails: []
}

export const notifictnListSlice = createSlice({
  name:'notificlist',
  initialState,
  reducers: {
    setnotifList: (state,action) => {
      
      state.notificatDetails=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setnotifList } = notifictnListSlice.actions
export const getSearchData=(state)=>state?.notificlist?.notificatDetails;

export default notifictnListSlice.reducer