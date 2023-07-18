import { createSlice } from '@reduxjs/toolkit';
import React from "react";

const initialState = {
  ownerDetails: {}
};
export const restaurantDashboardSlice = createSlice({
  name: 'ownerDashboard',
  initialState,
  reducers: {
    getOwner: (state, action) => {
      
      state.ownerDetails = action.payload;
    }
  }
});

export const { getOwner } = restaurantDashboardSlice.actions;
export const getOwnerDetails = (data) => async (dispatch) => {
  try {
   
   
      dispatch(getOwner(data));
      

    
  } catch (e) {
    
  }
};
export default restaurantDashboardSlice.reducer;
