import Classes from './Dashboard.module.css'
import Header from './Header/header'
import Footer from './Footer/footer'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutesAdmin from '../../../auth/authGaurdAdmin';
import Navbar from './NavBar/navbar';
import React from "react";

export default function Dashboard(props) {
    
    return (
        <ProtectedRoutesAdmin>
            <Header />
            <Navbar />
            <div className={Classes.homeContainer} data-testid="admin-dashboard">
                <Outlet />
                <ToastContainer />
            </div>
            <Footer />
        </ProtectedRoutesAdmin>
    )
}

