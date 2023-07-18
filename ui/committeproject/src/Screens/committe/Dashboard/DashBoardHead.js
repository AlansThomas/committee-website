import React from "react";
import Clas from './DashBoard.module.css'
import Header from './Headers/Headers'
import { Outlet } from 'react-router-dom';
import { Helmet } from "react-helmet-async";



import NavBar from './Navbar/Navbar';
import ProtectedRoutesCommittee from '../../../auth/authGaurdCommittee';
export default function DashBoardHead(props) {

    
    return (
        <ProtectedRoutesCommittee>
            <Helmet>
                <title> Committee </title>
            </Helmet>
            <Header />
            <NavBar />
            <div className={Clas.homeContainer}>
                <Outlet />
            </div>
        </ProtectedRoutesCommittee>


    )
}

