import { Topic } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import styles from "./ViewPoll.module.css";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";

function ViewPoll() {
  const [pollData, setPollData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  let { variable } = useParams();
  useEffect(() => {
    listPole();
  }, [variable]);

  const navigate = useNavigate();

  const handleOptionClick = (event) => {
    const clickedOption = event.currentTarget.getAttribute("for");

    if (selectedOption === clickedOption) {
      setSelectedOption("");
    } else {
      setSelectedOption(clickedOption);
    }
  };

  function listPole() {
    axiosPrivate
      .get(api.GET_SINGLE_POLL + variable)
      .then((response) => {
        setPollData([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function findObjectById(id) {
    let objectsArray = pollData;
    for (let currentObject of objectsArray) {
      const options = currentObject.Options;
      if (currentObject._id === id) {
        for (let option of options) {
          if (option._id === selectedOption) {
            return false;
          }
        }
      }
    }
    return true; // ID not found in any object
  }

  function Onvote(pollid) {
    const body = {
      optionId: selectedOption,
      pollId: pollid,
    };
    if (findObjectById(pollid)) {
      return;
    }
    confirmAlert({
      title: "Click to Confirm ",
      message: "Are you sure you want to make this poll submit",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosPrivate.post(api.POST_POLL_VOTING, body).then(() => {
              listPole();
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  const userVotedOrNot = (totalvote) => {
    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    let status = false;
    const currentuserid = pasedValue.data._id;
    totalvote?.map((votedusers) => {
      if (votedusers === currentuserid) {
        status = true;
      }
    });
    return status;
  };

  const percentage = (totalvote, vote, status) => {
    if (userVotedOrNot(totalvote) || status === 0) {
      let VotePercentage = (vote / totalvote?.length) * 100;
      return Math.floor(VotePercentage) + "%";
    } else {
      return;
    }
  };

  const isSelectedByUser = (totalvote) => {
    if (userVotedOrNot(totalvote)) {
      return "changecolor";
    } else {
      return;
    }
  };

  const ifUserSelectedChangeColor = (
    totalvote,
    pollesTotalVotes,
    votes,
    status
  ) => {
    if (userVotedOrNot(totalvote)) {
      return `linear-gradient(to right, #d5f3d5  ${percentage(
        pollesTotalVotes,
        votes,
        status
      )} ,white 0%`;
    } else {
      return `linear-gradient(to right, #C8C8C8 ${percentage(
        pollesTotalVotes,
        votes,
        status
      )} ,white 0%`;
    }
  };
  const pollRedir = () => {
    navigate(-1);
  };

  return (
    <div className={styles["pollBody"]}>
      {pollData?.map((pollDataValue) => {
        return (
          <div className={styles["wrapperdiv"]} key={pollDataValue.Topic}>
            <div className={styles["wrapper"]}>
              <div className={styles["btnPoll"]}>
                <ArrowBackIosIcon onClick={pollRedir} />
              </div>
              <h1>
                <span
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    color: "gray",
                    fontFamily: "fantasy",
                  }}
                >
                  Q:
                </span>{" "}
                {pollDataValue.Topic}
              </h1>
              <div
                style={{
                  marginTop: "-11px",
                  marginBottom: "1px",
                  color: "GrayText",
                  fontSize: 12,
                }}
              >
                Start Date :
                {moment(pollDataValue?.StartDate, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                )}
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  color: "GrayText",
                  fontSize: 12,
                }}
              >
                End Date :
                {moment(pollDataValue?.EndDate, "YYYY-MM-DD").format(
                  "DD-MM-YYYY"
                )}
                {pollDataValue?.Status !== 1 && (
                  <p style={{ color: "red" }}>Poll expired</p>
                )}
              </div>

              <div className={styles["pollArea"]}>
                {pollDataValue?.Options.map((option) => (
                  <label
                    key={option._id}
                    htmlFor={option._id}
                    className={`${styles["option"]} `}
                    onClick={handleOptionClick}
                  >
                    <div
                      className={`${styles["row"]} ${
                        selectedOption === option._id &&
                        pollDataValue?.Status === 1
                          ? !userVotedOrNot(pollDataValue?.totalVotes)
                            ? styles["changecolor"]
                            : ""
                          : ""
                      }    ${styles[`${isSelectedByUser(option.vote)}`]}  `}
                      style={{
                        background: ` ${ifUserSelectedChangeColor(
                          option.vote,
                          pollDataValue?.totalVotes,
                          option.votes,
                          pollDataValue?.Status
                        )}`,
                      }}
                    >
                      <div className={styles["column"]}>
                        <span className={styles["circle"]}></span>
                        <span className={styles["text"]}>{option.text}</span>
                      </div>
                      <div>
                        <span className={styles["percent"]}>
                          {percentage(
                            pollDataValue?.totalVotes,
                            option.votes,
                            pollDataValue?.Status
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={styles["progress"]}
                      style={{ "--w": option.percentage }}
                    ></div>
                  </label>
                ))}
                <div>
                  <div className={styles["btn3div"]}>
                    {!userVotedOrNot(pollDataValue?.totalVotes) &&
                      pollDataValue?.Status === 1 && (
                        <TouchAppOutlinedIcon
                          titleAccess="submit"
                          type="button"
                          className={styles["btnPoll1"]}
                          onClick={() => Onvote(pollDataValue._id)}
                        >
                          Submit
                        </TouchAppOutlinedIcon>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewPoll;
