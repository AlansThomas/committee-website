import React from "react";

import Topbar from "../../components/topbar/Topbar";
import TopbarMobile from "../../components/topbar/TopbarMobile";
import { Helmet } from "react-helmet-async";
import SidebarRes from "../../components/sidebarResponsive/Sidebar";
import "./home.css";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../../../../auth/authGuard";


export default function Home({refreshnavInHome}) {


  return (
    <ProtectedRoutes>
      <Helmet>
        <title> Recreation Committee </title>
      </Helmet>
      <Topbar refreshimage={refreshnavInHome} />
      <div className="homeContainer">
        <div className="sidenav">
          <SidebarRes refreshimage={refreshnavInHome} />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      <div className="MobileNav">
        <TopbarMobile />
      </div>
    </ProtectedRoutes>
  );
}
