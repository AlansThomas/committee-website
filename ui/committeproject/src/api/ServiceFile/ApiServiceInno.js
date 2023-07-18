import React from "react";

import { axiosPrivate } from "../Interceptor/intercepter";
import API_URL from "../API_URL";


//user Details

export const userDetails = () => {
  return axiosPrivate.get("Users/currentuserDetails");
};
export async function postImage(formData) {
  return await axiosPrivate.post(API_URL.POST_POST_IMAGE, formData);
}

export async function postImageEdit(formData) {
  return await axiosPrivate.put(API_URL.POST_EDIT, formData);
}


export async function postImagePrivateEdit(formData) {
  return await axiosPrivate.put(API_URL.POST_IMAGE_PRIVATE_EDIT, formData);
}


export async function postImagePrivate(formData) {
  return await axiosPrivate.post(API_URL.POST_IMAGE_PRIVATE, formData);
}

export const AdminImageGet = () => {
  return axiosPrivate.get(API_URL.GET_IMAGE_ADMIN);
}