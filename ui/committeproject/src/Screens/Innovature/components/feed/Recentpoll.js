import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom/dist";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import styles from "../ListPoll/ViewPoll.module.css";
import { IoIosShareAlt } from "react-icons/io";
import GridAnim from "./GridAnim";
import { useDispatch } from "react-redux";
import { setkeydata } from "../../../../actions/ClearSearchData";

function Recentpoll() {
  const navigate = useNavigate();
  const [pollData, setPollData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    listPole();
  }, []);

  function listPole() {
    

    axiosPrivate.get(api.GET_RECENT_POLL).then((response) => {
      
      
      setPollData(response.data);
      
    });
  }
  function clearSearchData(clr) {
    dispatch(setkeydata({ data: clr }));
  }

  function vote(pollid) {
    
    navigate("/");
  }

  return (
    <div >
      {pollData != "" ? (
        <div className={styles["pollbody"]}>
          {pollData?.map((value, key) => {
            return pollData ? (
              <div>
                <div className={styles["pollDiv"]}>
                  <div className={styles["head"]}>
                    <b className={styles["head1"]}>
                      <GridAnim />
                      <span className={styles["text"]}>{value.text}</span>
                    </b>

                    <div className={styles["head1"]} style={{marginLeft:"-134px"}}>
                      {" "}
                      <h1  style={{wordBreak:"break-word"}}>{value.Topic} </h1>
                    </div>
                  </div>
                  <div className={styles[("head", "flex")]}>
                    <div></div>
                    <div>
                      <b>
                        <NavLink
                          to={{
                            pathname: "/dashboardInno/viewpoll/" + value._id,
                          }}
                        >
                          <button
                            style={{
                              borderRadius: "10px",
                              marginBottom: "15px",
                              marginRight: "-73px",
                              border:"none",
                              color:"darkslateblue",
                              backgroundColor:"transparent"
                            }}
                            type="button"
                            className={styles.btn7}
                            onClick={() => {
                              vote(value._id);
                              clearSearchData(false);
                            }}
                          >
                            <IoIosShareAlt size={27} title="Click to redirect"/>
                          </button>
                        </NavLink>
                      </b>  
                    </div>
                  </div>
                  <div></div>

                  {/* <Poll  post={value}/> */}
                </div>
              </div>
            ) : (
              <div>no polls</div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Recentpoll;
