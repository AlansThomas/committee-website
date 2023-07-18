import React from "react";

import { Navigate, useLocation } from "react-router-dom";

const AuthGuardShare = (props) => {
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem("Profile"));
  const token = profile?.token;

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Navigate to={`/Share/${variable}/postShare`} state={{ from: location }} />;
};

export default AuthGuardShare;
