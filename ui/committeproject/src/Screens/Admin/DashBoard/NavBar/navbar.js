import SideNav from '../SideNav/SideNav';
import classes from './navbar.module.css';
import React from "react";

export default function Navbar() {
    return (
        <div className={classes.sidebar} data-testid="admin-navbar">
            <div className={classes.sidebarWrapper}>
                <SideNav />
            </div>
        </div>
    );
}
