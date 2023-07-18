import React from "react";

import { axiosPrivate } from "../Interceptor/AdminIntercepter";
import api from "../API_URL";

export const DeleteReportedPost = (data) => {
  return axiosPrivate.delete(api.DELETE_ALL_POST.concat(data));
};

export const GetSinglePost = (dataValue) => {
  return axiosPrivate.get(api.GET_SINGLE_POST.concat(dataValue));
};

export async function GraphData() {
  return await axiosPrivate.post(api.GET_TOTAL_SCORE);
}

export const GetPosts = (dataValue) => {
  return axiosPrivate.get(api.GET_POST_PAGINATED.concat(dataValue));
};

export async function getTaggedPostUser(DataID) {
  return await axiosPrivate.get(api.GET_TAGED_POST_USER.concat(DataID));
}

export async function getPostUserApi(DataID) {
  return axiosPrivate.get(api.GET_POST_USER.concat(DataID));
}

export async function getCommettePost() {
  return await axiosPrivate.get(api.GET_COMMITTEE_POST);
}

export async function userDetails(DataID) {
  return await axiosPrivate.get(api.GET_USER_DETAILS.concat(DataID));
}
