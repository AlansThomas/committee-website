import { createSlice } from '@reduxjs/toolkit'
import React from "react";

const initialState = {
  notifDetails: {"data":1}
}

export const notifSlice = createSlice({
  name:'notifications',
  initialState,
  reducers: {
    getNotif: (state,action) => {
      
      state.notifDetails=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { getNotif  } = notifSlice.actions
export const getSearchData=(state)=>state?.notifications?.notifDetails;

export default notifSlice.reducer