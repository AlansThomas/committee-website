import { createSlice } from '@reduxjs/toolkit'
import React from "react";

const initialState = {
  ownerDetails: {data:true}
}

export const togglePost = createSlice({
  name:'prvpub',
  initialState,
  reducers: {
    addPrivate: (state,action) => {
      
      state.ownerDetails=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPrivate  } = togglePost.actions
export const getSearchData=(state)=>state?.prvpub?.ownerDetails;

export default togglePost.reducer