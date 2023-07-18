import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS file
import { Topic } from "@mui/icons-material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";

function Polls({ pollData, reload }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (event) => {
    const clickedOption = event.currentTarget.getAttribute("for");

    if (selectedOption === clickedOption) {
      setSelectedOption("");
    } else {
      setSelectedOption(clickedOption);
    }
  };

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
    return true;
  }

  function votePoll(pollid) {
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
            axiosPrivate
              .post(api.POST_POLL_VOTING, body)
              .then((response) => {
                reload();
              })
              .catch((error) => {
                console.error(error);
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
      let percentageValue = (vote / totalvote?.length) * 100;
      return Math.floor(percentageValue) + "%";
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

  return (
    <div className={styles["pollBody"]}>
      <div className={styles["pollBodyDiv"]}>
        {pollData?.length > 0 ? (
          pollData?.map((pollDataVal) => {
            return (
              <div className={styles["wrapperdiv"]} key={Topic}>
                <div className={styles["wrapper"]}>
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
                    {pollDataVal.Topic}
                  </h1>
                  <div
                    style={{
                      marginBottom: "15px",
                      color: "GrayText",
                      fontSize: 12,
                    }}
                  >
                    {pollDataVal?.Status !== 1 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        Poll expired
                      </p>
                    )}
                    {pollDataVal?.Status === 1
                      ? `End date: ${moment(
                          pollDataVal?.EndDate,
                          "YYYY-MM-DD"
                        ).format("DD-MM-YYYY")}`
                      : `Expired on: ${moment(
                          pollDataVal?.EndDate,
                          "YYYY-MM-DD"
                        ).format("DD-MM-YYYY")}`}
                  </div>
                  {/* <div
                    style={{
                      marginBottom: "15px",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      color: "gray",
                      fontFamily: "fantasy",
                    }}
                  >
                    Options :
                  </div> */}
                  <div className={styles["pollArea"]}>
                    {pollDataVal?.Options.map((option) => (
                      <label
                        key={option._id}
                        htmlFor={option._id}
                        className={`${styles["option"]} `}
                        onClick={handleOptionClick}
                      >
                        <div
                          className={`${styles["row"]} ${
                            selectedOption === option._id &&
                            pollDataVal?.Status === 1
                              ? !userVotedOrNot(pollDataVal?.totalVotes)
                                ? styles["changecolor"]
                                : ""
                              : ""
                          }    ${
                            styles[`${isSelectedByUser(option?.vote)}`]
                          }  `}
                          style={{
                            background: ` ${ifUserSelectedChangeColor(
                              option.vote,
                              pollDataVal?.totalVotes,
                              option.votes,
                              pollDataVal?.Status
                            )}`,
                          }}
                        >
                          <div className={styles["column"]}>
                            <span className={styles["circle"]}></span>
                            <span
                              className={styles["text"]}
                              style={{ wordBreak: "break-all" }}
                            >
                              {option.text}
                            </span>
                          </div>
                          <div>
                            <span className={styles["percent"]}>
                              {percentage(
                                pollDataVal?.totalVotes,
                                option.votes,
                                pollDataVal.Status
                              ) != "NaN%"
                                ? percentage(
                                    pollDataVal?.totalVotes,
                                    option.votes,
                                    pollDataVal.Status
                                  )
                                : "0%"}
                            </span>
                          </div>
                        </div>
                        <div
                          className={styles["progress"]}
                          style={{ "--w": option.percentage }}
                        ></div>
                        {/* <input type="radio" id={option._id} name="poll" /> */}
                      </label>
                    ))}
                    <div>
                      <div className={styles["btn3div"]}>
                        {!userVotedOrNot(pollDataVal?.totalVotes) &&
                          pollDataVal?.Status === 1 && (
                            <TouchAppOutlinedIcon
                              titleAccess="submit"
                              type="button"
                              className={styles["btn3"]}
                              onClick={() => votePoll(pollDataVal._id)}
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
          })
        ) : (
          <img
            src="/assets/committee-removed.png"
            className={styles["imageLogosList"]}
            alt="Img"
            width="300"
            height="300"
          />
        )}
      </div>
    </div>
  );
}

export default Polls;
