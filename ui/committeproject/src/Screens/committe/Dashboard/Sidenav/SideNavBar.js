
import  React,{ useState } from "react";
import { NavLink } from "react-router-dom";
import { NavItems } from "../NavItems"
import stylehead from "./SideNavBar.module.css";

export default function SideNavBar() {
    const [open, setOpen] = useState(true)
    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={stylehead.sideNavBar}>
            <button className={stylehead.Menubtn} onClick={toggleOpen}>    
            </button>
            {NavItems.map(item => {
                return <NavLink key={item.id} className={({ isActive }) => (isActive ? stylehead.sideNavItemActive : stylehead.sideNavItem)} to={item.link} style={{}}>
                    {item.icon}
                    <span className={stylehead.linkTextsbar}>{item.text}</span>
                </NavLink>
            })}
        </div>
    )
}
