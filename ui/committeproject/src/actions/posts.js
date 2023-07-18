import * as api from "../api";
import React from "react";

import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "../constants/actionTypes";

//actions creators ,in here we dispatch a function
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    
  }
};

//create post

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    
  }
};

//update post

export const updatePost = (updatedPost, id) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    
  }
};

//delete post

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    
  }
};

//like post

export const likePosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    
  }
};
