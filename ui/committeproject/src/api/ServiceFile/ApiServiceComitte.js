import React from "react";

import { axiosPrivate } from "../Interceptor/commiteeIntercepters";
import API_URL from "../API_URL";



export const listQuatersCommitte = (formData) => {
    return axiosPrivate.post(API_URL.GET_QUATERLIST, formData);
  };

  export async function postImageEdit2(formData) {
    return await axiosPrivate.put(API_URL.POST_EDIT, formData);
  }
  