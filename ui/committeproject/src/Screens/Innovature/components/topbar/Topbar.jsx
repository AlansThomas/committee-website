import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setNoPost } from "../../../../actions/NoDataPostReducer";
import { increment } from "../../../../actions/searchSlice";
import NotificationsPopover from "../../../../Layouts/InnovatureLayout/dashboard/header/NotificationsPopover";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import AccountPopover from "../../../../Layouts/InnovatureLayout/dashboard/header/AccountPopover";
import "./topbar.css";

function Topbar({ refreshimage }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  let variable = query;
  const searchkey = useSelector((state) => state.clearsearch);
  const navigate = useNavigate();
  const dispatch2 = useDispatch();


  const [searchCondition, setSearchCondition] = useState(false);

  const [sclearData, setSclearData] = useState(variable);

  const location = useLocation();
  const currentPath = location.pathname;
  const lastSlashIndex = currentPath.lastIndexOf("/");
  const urlBeforeLastSegment = currentPath.substring(0, lastSlashIndex + 5);
  
  const myCurrentUrl = `/dashboardInno/feed`;

  let searchData;
  let searchTimeout = null;

  const search = (event) => {
    setSearchCondition(true);

    if (event.target.value.length < 1) {
      setSearchCondition(false);
    }
    // Clear the previous timeout, if any
    setSclearData(event.target.value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout of 2 seconds
    searchTimeout = setTimeout(() => {
      let sData = String(event.target.value);
      if (sData.charAt(0) === "#") {
        searchData = sData.replace("#", "");
      } else {
        searchData = event.target.value;
      }
      if (searchData.length < 1) {
        dispatch2(setNoPost(true));
        dispatch2(increment([]));
      } else {
        axiosPrivate
          .get(`post/hashtagSearch?tags=${searchData}`)
          .then((response) => {
           


            dispatch2(increment(response?.data));
            if (response?.data.length === 0) {
              dispatch2(setNoPost(false));
            } else {
              dispatch2(setNoPost(true));
            }

          });
      }
    }, 1000); // 700-ms delay
  };
  useEffect(() => {
    if (urlBeforeLastSegment !== myCurrentUrl) {
      variable = null;
      setSclearData("");
      setSearchCondition(false);
    }
  }, [searchkey]);

  const onLoadSearch = () => {
    if (sclearData && variable !== null) {
      setSearchCondition(true);

      axiosPrivate
        .get(`post/hashtagSearch?tags=${sclearData}`)
        .then((response) => {
          


          dispatch2(increment(response?.data));
          if (response?.data.length === 0) {
            dispatch2(setNoPost(false));
          } else {
            dispatch2(setNoPost(true));
          }

        });
    }
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout

    searchTimeout = setTimeout(() => {
      onLoadSearch();
    }, 500); // delay

    searchTimeout = setTimeout(() => {
      onLoadSearch();
    }, 1500); //  delay
    searchTimeout = setTimeout(() => {
      onLoadSearch();
    }, 2000); //  delay
  }, []);

  

  const clearSearch = () => {
    dispatch2(setNoPost(true));
    dispatch2(increment([]));
    setSclearData("");
    setSearchCondition(false);
    navigate("/dashboardInno/feed");
    searchTimeout = setTimeout(() => {
      dispatch2(setNoPost(true));
      dispatch2(increment([]));
    }, 1700); // delay
  };

  return (
    <div className="topbarContainer">
      <Link to="/dashboardInno/feed">
        <div >
          <div className="topbarLeft">
            <img class="logo-img" src="/assets/committee-removed.png" />
            <span className="logo"> Recreation</span>
          </div>
        </div>
      </Link>
      <div className="topbarCenter">
        <div class="groupSearch">
          {searchCondition ? (
            <>
              <svg on onClick={clearSearch} class="icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.78 4.22a1 1 0 0 0-1.42 0L12 10.59 6.64 5.22a1 1 0 1 0-1.42 1.42L10.59 12l-5.37 5.36a1 1 0 1 0 1.42 1.42L12 13.41l5.36 5.37a1 1 0 0 0 1.42-1.42L13.41 12l5.37-5.36a1 1 0 0 0 0-1.42z"
                />
              </svg>
            </>
          ) : (
            <>
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </>
          )}

          <input
            type="text"
            placeholder="#Tag Search"
            class="searchInput"
            onChange={search}
            value={sclearData}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationsPopover />
          </div>
          <div className="topbarIconItem">
            <AccountPopover refreshimage={refreshimage} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Topbar;
