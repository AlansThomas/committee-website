import { createSlice } from '@reduxjs/toolkit'
import React from "react";

const initialState = {
  ownerDetails: []
}

export const counterSlice = createSlice({
  name:'counter',
  initialState,
  reducers: {
    increment: (state,action) => {
      
      state.ownerDetails=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment,  } = counterSlice.actions
export const getSearchData=(state)=>state?.counter?.ownerDetails;

export default counterSlice.reducer