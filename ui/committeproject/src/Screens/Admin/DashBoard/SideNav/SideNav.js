import { NavLink } from "react-router-dom";
import { Navitems } from "../Navitems";
import styles from "./SideNav.module.css";
import React from "react";

export default function SideNav() {

    return (

        <div className={styles.sidenav} data-testid="sideNav-page">
            <button className={styles.menuBtn}>

            </button>
            {Navitems.map(item => {
                return <NavLink key={item.id} to={item.link} className={({ isActive }) => (isActive ? styles.sideItemActive : styles.sideitem)}
                >
                    {item.icon}
                    <span className={styles.linkText}>{item.text}</span>
                </NavLink>
            })}
        </div >
    )
}

