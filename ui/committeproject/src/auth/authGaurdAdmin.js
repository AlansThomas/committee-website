import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const AuthGaurdAdmin = (props) => {
    const location = useLocation();
    const profile = JSON.parse(localStorage.getItem("Profile"))
    const token = profile?.token
    const Type = localStorage.getItem("Type")


    if (!token) {
        return <Navigate to='/' state={{ from: location }} />;
    }
    
    if (Type !== '2') {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return <>{props.children}</>

};

export default AuthGaurdAdmin;