import { createSlice } from '@reduxjs/toolkit'
import React from "react";

const initialState = {
  searchkey: {}
}

export const counterSlice = createSlice({
  name:'clearsearch',
  initialState,
  reducers: {
    setkeydata: (state,action) => {
      
      state.searchkey=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { setkeydata  } = counterSlice.actions
export const getkeydata=(state)=>state?.clearsearch?.setkeydata;

export default counterSlice.reducer