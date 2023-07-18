import { Event } from '@mui/icons-material';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import React from "react";
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';

export const Navitems = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Home",
        link: "/dashboard/app",
    },
    {
        id: 1,
        icon: <PersonIcon />,
        text: "Innovators",
        link: "/dashboard/employees",
    },
    {
        id: 2,
        icon: <Diversity1Icon />,
        text: "Groups",
        link: "/dashboard/Groups",
    },
    {
        id: 3,
        icon: <PeopleAltIcon />,
        text: "Committee",
        link: "/dashboard/Committee",
    },
    {
        id: 4,
        icon: <EventRepeatIcon />,
        text: "Quarters",
        link: "/dashboard/quaters",
    },
    {
        id: 5,
        icon: < ScoreboardIcon />,
        text: "Point Table ",
        link: "/dashboard/pointlist",
    },
    {
        id: 6,
        icon: < Event />,
        text: "Events",
        link: "/dashboard/events",
    },
    {
        id: 7,
        icon: < FeedRoundedIcon />,
        text: "Post",
        link: "/dashboard/adminfeed",
    },
    {
        id: 8,
        icon: < MonochromePhotosIcon/>,
        text: "Glimpse",
        link: "/dashboard/Glimpses",
    },
]