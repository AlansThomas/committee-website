import React from "react";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { Link } from "react-router-dom";
import "./topbar.css";

export default function TopbarMobile() {


  return (
    <div className="topbarContainerM">
      <div className="topbarMobile">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to="feed">
            <span><HomeIcon sx={{color:'white'}}/></span>
            </Link>
          </div>
          
          <div className="topbarIconItem">
          <Link to="Events">
            <span><EmojiEventsIcon sx={{color:'white'}}/></span>
            </Link>
          </div><div className="topbarIconItem">
          <Link to="eventPoints">
          <span>  <ScoreboardIcon sx={{color:'white'}}/></span>
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
