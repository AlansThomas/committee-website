import React from "react";

import axios from 'axios';
import Configuration from '../../Configuration';
const BASE_URL = Configuration.devUrl
// const BASE_URL='http://10.10.28.140:5000'
// const BASE_URL="http://10.5.22.52:5000"



export default axios.create({
    baseURL: BASE_URL
});

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {  },
    // withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem("Profile")).token;
        

        if (token) {
            config.headers['Authorization'] = token;
            config.headers['GenericValue'] = 2;
        }
        return config;
    },
    error => {

        
        Promise.reject(error)
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          
          if (error?.response?.data === "User not Found") {
            localStorage.clear();
            window.location.replace("/");
          } else if (error?.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const accessToken = await refreshAccessToken();
            axiosPrivate.defaults.headers.common["Authorization"] = accessToken;
            return axiosPrivate(originalRequest);
          } else throw error;
        }
      );
      
      export const axiosPrivate = instance;
      
      const refreshAccessToken = async () => {
        const refreshToken = JSON.parse(localStorage.getItem("Profile")).RefreshToken;
        const data = { token: refreshToken };
      
        try {
          const response = await axios.post(BASE_URL + "auth/jwt/refreshToken", data);
          
          localStorage.setItem("Profile", JSON.stringify(response?.data));
          return response?.data?.token;
        } catch (err) {
          
          localStorage.clear();
          window.location.replace("/");
        }
      };
      
      
  