import { createSlice } from '@reduxjs/toolkit';
import React from "react";

const initialState = {
  postDetails: []
}

export const publicPostSlice = createSlice({
  name:'list',
  initialState,
  reducers: {
    setPostList: (state,action) => {
      
      state.postDetails=action.payload;    
    }
  },
})

// Action creators are generated for each case reducer function
export const {  setPostList } = publicPostSlice.actions
export const getSearchData=(state)=>state?.list?.postDetails;

export default publicPostSlice.reducer