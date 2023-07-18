import React from "react";
import SideNav from '../Sidenav/SideNavBar';
import clas from './Navbar.module.css';

export default function Navbar() {
    return (
        <div className={clas.SideNavbar}>
            <div className={clas.sidewrapper}>
                <SideNav />
            </div>
        </div>
    );
}
