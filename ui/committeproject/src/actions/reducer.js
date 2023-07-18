import { STORE_DATA } from './reducAction';
import React from "react";

const initialState = {
  data: null,
};

const reducer = (action,state = initialState, ) => {
  if (action.type === STORE_DATA) {
    return {
      ...state,
      data: action.payload,
    };
  } else {
    return state;
  }
};

export default reducer;
