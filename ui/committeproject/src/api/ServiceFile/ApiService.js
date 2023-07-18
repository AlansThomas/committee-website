import React from "react";

import { axiosPrivate } from "../Interceptor/AdminIntercepter";

import api from "../API_URL";

export const FindCommittee = (data) => {
  return axiosPrivate.post(api.POST_FIND_COMMITTEE, data);
};

export const ListCommitteeMember = (dataValue) => {
  return axiosPrivate.get(api.GET_LIST_COMMITTEE_MEMBERS.concat(dataValue));
};
export const DeleteCommitteeMember = (id, body) => {
  return axiosPrivate.post(api.POST_DELETE_USERS.concat(id), body);
};
export const ListUserToAddCommittee = () => {
  return axiosPrivate.get(api.GET_USERS_TO_ADD_COMMITTEE);
};
export const AddCommitteeMember = (GetGroupType, empList) => {
  return axiosPrivate.put(
    api.PUT_ADD_COMMITTEE_MEMBER.concat(GetGroupType),
    empList
  );
};
export const CommitteeEmailSearch = (event) => {
  return axiosPrivate.get(api.GET_COMMITTEE_EMAIL_SEARCH.concat(event));
};
export const CommitteeSearch = (params, body) => {
  return axiosPrivate.post(api.GET_SEARCH + `?${params}`, body);
};
export const ListDesignation = () => {
  return axiosPrivate.get(api.GET_DESIGNATION);
};

export const GetAllEvents = () => {
  return axiosPrivate.get(api.GET_ALL_EVENTS);
};

export const GsetQuarterEvents = () => {
  return axiosPrivate.post(api.GET_ALL_EVENTS_QUARTERS);
};

export const GetCurrentEvents = () => {
  return axiosPrivate.get(api.GET_CURRENT_EVENT);
};

export const getEventHistory = () => {
  return axiosPrivate.get(api.GET_ALL_EVENTS);
};

export const FindEventgroupList = (id) => {
  return axiosPrivate.post(api.POST_GAME_LIST_EVENT_WINNER.concat(id));
};

export const getEventgameList = (body) => {
  return axiosPrivate.post(api.POST_LIST_GAME_EVENT_ID, body);
};

export const GetEventWiseGroup = (id) => {
  return axiosPrivate.get(api.GET_EVENT_WISE_GROUP.concat(id));
};

export const getEventGroupGameList = (grpPoints) => {
  return axiosPrivate.post(api.POST_LIST_GAME, grpPoints);
};

export const totalPointPublishPoint = () => {
  return axiosPrivate.post(api.POST_TOTAL_POINT_PUBLISH_COMMITTEE);
};

export const updatPoint = (body) => {
  return axiosPrivate.post(api.POST_UPDATE_POINT, body);
};

export const PendingsList = () => {
  return axiosPrivate.post(api.POST_POINTS_PUBLISHED_TO_COMMITTEE);
};

export const ReportedPoints = () => {
  return axiosPrivate.get(api.REPORTED_POINTS);
};

export const pointforPublish = () => {
  return axiosPrivate.get(api.GET_POINT_TO_PUBLISH);
};

export const deletePub = (id) => {
  return axiosPrivate.delete("TotalPoint/deleteVerifiedPoints/" + id);
};

export const publishToInnovator = (list, firstcity) => {
  return axiosPrivate.post(api.POST_PUBLISH_POINT, { list, firstcity });
};

export const grpPoint = () => {
  return axiosPrivate.post(api.GET_TOTAL_SCORE);
};

export const getgrpPoint = (body) => {
  return axiosPrivate.post(api.POST_TOTAL_POINT, body);
};

export const eventWisewinner = () => {
  return axiosPrivate.post(api.POST_LIST_EVENT_WINNER);
};

// Admin Employee

export const CSVUpload = (formData) => {
  return axiosPrivate.post(api.POST_UPLOAD_CSV, formData);
};

export const ListUsers = () => {
  return axiosPrivate.get(api.GET_LIST_ALL_USERS);
};

export const DeleteUser = (id, body) => {
  return axiosPrivate.post(api.POST_DELETE_USERS.concat(id), body);
};

export const listDesignationAPI = () => {
  return axiosPrivate.get(api.GET_DESIGNATION);
};

//Admin Group

export const createGrp = (body) => {
  return axiosPrivate.post(api.POST_CREATE_GROUP, body);
};

export const listGrp = () => {
  return axiosPrivate.get(api.GET_LIST_GROUP);
};

export const deleteGrp = (id) => {
  return axiosPrivate.put(api.PUT_DELETE_GROUP.concat(id));
};

export const getGrp = (id) => {
  return axiosPrivate.get(api.GET_SINGLE_GROUP.concat(id));
};

export const EditGrpName = (id, body) => {
  return axiosPrivate.put(api.PUT_UPDATE_GROUP.concat(id), body);
};

export const editGrpImage = (id, body) => {
  return axiosPrivate.put(api.PUT_UPDATE_GROUP_IMAGE.concat(id), body);
};

export const AdminPassChange = (body) => {
  return axiosPrivate.post(api.POST_CHANGE_USER_PASSWORD, body);
};

export const AdminUserSearch = (params) => {
  return axiosPrivate.post(api.GET_SEARCH + `?${params}`);
};

export const rReportedPostNoty = (page) => {
  return axiosPrivate.get("Report/report/" + page);
};
export const Read = (id) => {
  return axiosPrivate.post("Report/report/" + id);
};
export const AddUserAdmin = (user) => {
  return axiosPrivate.post(api.POST_ADD_USER, user);
};

export const searchGroupMember = (params, body) => {
  return axiosPrivate.post(api.GET_SEARCH + `?${params}`, body);
};
export const groupMemberList = (Gid) => {
  return axiosPrivate.get(api.GET_LIST_GROUP_MEMBER.concat(Gid));
};
export const UserListToCommitteeAdd = () => {
  return axiosPrivate.get(api.GET_USERS_TO_ADD_GROUP);
};
export const listUserChangeRole = (Gid) => {
  return axiosPrivate.get(api.GET_LIST_USERS_SET_ROLE.concat(Gid));
};
export const DeleteGroupMember = (id, body) => {
  return axiosPrivate.put(api.PUT_DELETE_GROUP_MEMBER.concat(id), body);
};

export const listQuaters = (formData) => {
  return axiosPrivate.post(api.GET_QUATERLIST, formData);
};

export const addQuaters = () => {
  return axiosPrivate.post(api.ADD_QUATER);
};

export const editQuaters = (body) => {
  return axiosPrivate.put(api.EDIT_QUATER, body);
};

export const QuatersHistory = (id) => {
  return axiosPrivate.get(api.GET_QUATER_HISTORY.concat(id));
};

export const resetQuaters = (body) => {
  return axiosPrivate.put(api.RESET_QUATER, body);
};
export const resetYearly = (body) => {
  return axiosPrivate.put(api.YEARLY_RESET, body);
};

export const AdminAddImage = (body) => {
  for (const entry of body.entries()) {
    console.log(entry[0], entry[1]);
  }
  return axiosPrivate.post(api.POST_IMAGE_ADMIN, body);
};

export const AdminImageGet = () => {
  return axiosPrivate.get(api.GET_IMAGE_ADMIN);
};

export const AdminDeleteImage = (id) => {
  return axiosPrivate.put(api.PUT_DELETE_IMAGE, id);
};
