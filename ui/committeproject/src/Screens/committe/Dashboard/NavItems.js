import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SportsVolleyballRoundedIcon from '@mui/icons-material/SportsVolleyballRounded';


export const NavItems = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Home",
        link: "/dashboardCommitte/Home",
    },
    {
        id: 3,
        icon: <CalendarMonthIcon/>,
        text: "List Event",
        link: "/dashboardCommitte/EventList",
    },
    {
        id: 1,
        icon: <PersonIcon  />,
        text: "List Games",
        link: "/dashboardCommitte/ListGames",
    },
    {
        id: 3,
        icon: <SportsVolleyballRoundedIcon  />,
        text: "Verify Points",
        link: "/dashboardCommitte/EventPoint",
    },
    {
        id: 4,
        icon: <PollOutlinedIcon  />,
        text: "Polls",
        link: "/dashboardCommitte/pole",
    },
  
]