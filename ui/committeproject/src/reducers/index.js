import { combineReducers } from "redux";

import posts from "./posts";
import authReducer from "./authReducer";

export default combineReducers({
  posts,
  authReducer,
});
