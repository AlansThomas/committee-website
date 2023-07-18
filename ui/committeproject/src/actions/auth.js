
import React from "react";

export const signOut = (navigate) => async () => {
  try {
     localStorage.clear();
    await navigate("/")

  } catch (error) {

  }
}

export const SwitchInnnovator = (innnovator) => async() => {
  try{
    localStorage.setItem("toggleId",1)
    await innnovator("/dashboardCommitte/Home")
  }
  catch(error){
    
  }
}

export const toggle = (navigate) => async () => {
  try {
    
    await navigate("/dashboardInno/feed")

  } catch (error) {

  }
  
}









