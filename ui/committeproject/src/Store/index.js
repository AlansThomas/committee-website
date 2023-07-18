
import React from "react";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ClearSearchData from '../actions/ClearSearchData';
import NoDataPostReducer from '../actions/NoDataPostReducer';
import notifReducer from '../actions/notifictnListSlice';
import notifSlice from '../actions/notifSlice';
import publicPostSlice from '../actions/publicPostSlice';
import ResolutionReducer from '../actions/ResolutionReducer';
import counterReducer from '../actions/searchSlice';
import togglePost from '../actions/togglePost';

const middleware = [
  ...getDefaultMiddleware({
    thunk: false
  }),
]

 const store = configureStore({
  reducer: {
    notifications:notifSlice,
    counter: counterReducer,
    prvpub:togglePost,
    list:publicPostSlice,
    clearsearch:ClearSearchData,
    noDataPostKeyGet:NoDataPostReducer,
    zoom:ResolutionReducer,
    notificlist:notifReducer
  },
  middleware
  
})
export default store;
