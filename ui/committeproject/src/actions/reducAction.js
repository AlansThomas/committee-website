export const STORE_DATA = 'STORE_DATA';
import React from "react";

export const storeData = (data) => ({
  type: STORE_DATA,
  payload: data,
});