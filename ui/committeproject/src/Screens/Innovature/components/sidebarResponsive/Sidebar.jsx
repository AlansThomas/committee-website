import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.css";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { FcCalendar, FcHome, FcInspection } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setkeydata } from "../../../../actions/ClearSearchData";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import Rightbar from "../Members/Members";

function Sidebar({ refreshimage }) {
  const [posts, setPosts] = useState([]);

  const [gname, setGname] = useState(null);
  const dispatch = useDispatch();

  function clearSearchData(clr) {
    dispatch(setkeydata({ data: clr }));
  }
  useEffect(() => {
    const url = api.GET_GROUP_GROUP_MEMBERS;
    axiosPrivate.get(url).then((res) => {
      setPosts(
        res?.data?.slice(1).sort((a, b) => {
          return b.GroupRole - a.GroupRole;
        })
      );
      setGname(res?.data[0]?.GroupName);
    });
  }, [refreshimage]);

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <body>
        <aside class="sidebar">
          <header class="sidebar-header">
            <i class="logo-icon uil uil-instagram"></i>
          </header>
          <nav>
            <NavLink
              to="feed"
              className={({ isActive }) => (isActive ? "highlight" : undefined)}
              onClick={() => clearSearchData(true)}
            >
              <div className="actionColor">
                <button>
                  <span>
                    <FcHome size={25} />
                    <Typography variant="" sx={{ color: "black" }}>
                      Home
                    </Typography>
                  </span>
                </button>
              </div>
            </NavLink>
            <NavLink
              to="Events"
              className={({ isActive }) => (isActive ? "highlight" : undefined)}
              onClick={() => clearSearchData(false)}
            >
              <div className="actionColor">
                <button>
                  <span>
                    <FcCalendar size={29} />

                    <Typography variant="" sx={{ color: "black" }}>
                      Events
                    </Typography>
                  </span>
                </button>
              </div>
            </NavLink>
            <NavLink
              to="eventPoints"
              className={({ isActive }) => (isActive ? "highlight" : undefined)}
              onClick={() => clearSearchData(false)}
            >
              <div className="actionColor">
                <button>
                  <span>
                    <FcInspection size={29} />

                    <Typography variant="" sx={{ color: "black" }}>
                      Points
                    </Typography>
                  </span>
                </button>
              </div>
            </NavLink>
            <NavLink
              to="Polls"
              className={({ isActive }) => (isActive ? "highlight" : undefined)}
              onClick={() => clearSearchData(false)}
            >
              <div className="actionColor">
                <button>
                  <span>
                    <PollOutlinedIcon size={29} />
                    <Typography variant="" sx={{ color: "black" }}>
                      Polls
                    </Typography>
                  </span>
                </button>
              </div>
            </NavLink>
          </nav>
          {/* </div> */}

          <div className="hrTag1">
            {Number(posts) === 0 ? (
              <div className="notAdded">Not in a group yet!</div>
            ) : (
              <>
                <div
                  title={gname}
                  style={{
                    wordBreak: "break-word",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "#484848",
                    maxWidth: 240,
                    marginTop: "9%",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {gname}
                </div>
              </>
            )}
            <div className="sideNavGroupListScroll">
              <Rightbar group={posts} refreshimage={refreshimage} />
            </div>
          </div>
        </aside>
      </body>
    </div>
  );
}

export default Sidebar;
