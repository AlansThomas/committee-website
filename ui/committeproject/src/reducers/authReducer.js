import React from "react";

import { AUTH, LOGOUT, FORGOT, RESET } from "../constants/actionTypes.js";

const authReducer = (action,state = { authData: null },) => {
  switch (action.type) {
    case AUTH:

      localStorage.setItem("Profile", JSON.stringify(action.LocalData));
      localStorage.setItem("loggedInUser", action.LocalData.UserName)
      localStorage.setItem("LoggedInEmail", action.LocalData.Email)
      return { ...state, authData: action?.LocalData };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    ///this login type is for radio button if it is greater than zero only then radio button is vissible
    case "LOGINTYPE":
      localStorage.setItem("Type", action.UserData);
      return { ...state, authData: action?.UserData };
    case "LOGINROUTETYPE":
      localStorage.setItem("Logintype", action.RadioResponse);
      return { ...state, authData: action?.RadioResponse };

    case FORGOT:
      return state;
    case RESET:
      return state;
    default:
      return state;
  }
};
export default authReducer;
