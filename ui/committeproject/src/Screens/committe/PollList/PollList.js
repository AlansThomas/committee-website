import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import pollStyle from "./PollList.module.css";
import api from "../../../api/API_URL";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import { LeafPoll } from "react-leaf-polls";
import Button from "@mui/material/Button";
import { BsThreeDots } from "react-icons/bs";
import "react-leaf-polls/dist/index.css";
import TableBody from "@mui/material/TableBody";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import {
  Stack,
  Box,
  Popover,
  IconButton,
  Modal,
  FormControl,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import moment from "moment";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import "./poll.css";

const PollList = forwardRef((props, ref) => {
  const customTheme = {
    textColor: "black",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "start",
  };

  const [data, setData] = useState([]);
  const [opens, setOpens] = useState(false);
  const [editDeleteId, seteditDeleteId] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [quesError, setQuesError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [optionError, setOptionError] = useState({});
  const [optionCount, setOptionCount] = useState(0);
  const [val, setVal] = useState([]);
  const [EditPatchValues, setEditpatchvalues] = useState({});
  const [editStartDate, setEditStartDate] = useState();
  console.log(editStartDate);
  const [editEndDate, setEditEndDate] = useState();
  console.log(editEndDate);
  const [maxOptionCountFlag, setMaxOptionCountFlag] = useState(false);

  const [editPoll, setEditPoll] = useState({
    Question: "",
    StartDate: "",
    EndDate: "",
    Options: [],
  });

  useEffect(() => {
    listPole();
  }, []);

  function listPole() {
    axiosPrivate
      .get(api.GET_POLL_LIST)
      .then((response) => {
        const newData = response.data?.map((polldata) => {
          const optionData = polldata?.Options?.map((options, index) => {
            return {
              ...options,
              id: index,
            };
          });
          return {
            ...polldata,
            Options: optionData,
          };
        });
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        listPole,
      };
    },
    []
  );

  const [Sdate, setSdate] = useState(null);
  const [Cdate, setCdate] = useState(null);

  const handleOpen = (event, id, start, end) => {
    setSdate(moment(start).format("yyyy-MM-DD"));
    setCdate(moment().format("yyyy-MM-DD"));
    seteditDeleteId(id);
    setOpens(event.currentTarget);
  };

  const handleClose = () => {
    setOpens(false);
  };

  //delete poll

  const deletePoll = (id) => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        axiosPrivate
          .delete(api.DELETE_POLL.concat(id))
          .then((deleteResponse) => {
            console.log(deleteResponse);
            ToasterGlobal("Poll Deleted Successfully", 812, ["success"]);
            loadPageDelete(id);
          });
      }
    });
  };

  const loadPageDelete = (id) => {
    setData(data.filter((post) => post._id !== id));
  };

  // edit poll

  const handleEditModal = () => {
    handleClose();
    axiosPrivate
      .get(api.GET_SINGLE_POLL.concat(editDeleteId))
      .then((response) => {
        editPoll.Question = response?.data?.Topic;
        editPoll.Options = response?.data?.Options;
        let col = [];
        for (let n = 0; n < response.data.Options?.length; n++) {
          col.push(...val, response?.data?.Options[n].text);
        }
        setVal(col);
        setOptionCount(optionCount + response?.data?.Options?.length);
        setStartDate(moment(response?.data?.StartDate).format("yyyy-MM-DD"));
        setEndDate(moment(response?.data?.EndDate).format("yyyy-MM-DD"));
        axiosPrivate
          .get(api.GET_SINGLE_POLL.concat(editDeleteId))
          .then((responses) => {
            setEditStartDate(
              moment(responses?.data?.StartDate).format("yyyy-MM-DD")
            );
            setEditEndDate(
              moment(responses?.data?.EndDate).format("yyyy-MM-DD")
            );
          });
        setEditStartDate(
          moment(response?.data?.StartDate).format("yyyy-MM-DD")
        );
        setEditEndDate(moment(response?.data?.EndDate).format("yyyy-MM-DD"));
        const editData = response?.data;
        setEditpatchvalues({
          ...editData,
          StartDate: editData?.StartDate
            ? moment(editData.StartDate).format("YYYY-MM-DD")
            : "",
          EndDate: editData?.EndDate
            ? moment(editData.EndDate).format("YYYY-MM-DD")
            : "",
        });

        setEditModalOpen(true);
      });
  };

  const editModalClose = () => {
    setEditModalOpen(false);
    setEndDate("");
    setStartDate("");
    setQuesError(null);
    setStartDateError(null);
    setEndDateError(null);
    setMaxOptionCountFlag(false);
    setEditStartDate(null);
    setEditPoll({
      Question: "",
      StartDate: "",
      EndDate: "",
      Options: [],
    });
    setEditEndDate(null);
    setEditpatchvalues({});
    setOptionError({});
    setOptionCount(0);
    setVal([]);
  };

  const onQuestionChange = (e) => {
    const Ques = e.target.value;
    if (Ques === null || Ques === " ") {
      setQuesError("Please enter the question");
    } else if (!Ques.trim()) {
      setQuesError("Please enter the question");
    } else if (Ques.length > 100) {
      setQuesError("Maximum character length is 100");
    } else {
      setQuesError(null);
      setEditPoll({ ...editPoll, [e.target.name]: e.target.value });
    }
  };

  const onEndDateChange = (e) => {
    const PollEndDate = e.target.value;
    if (PollEndDate === "") {
      setEndDateError("End date is required");
    } else if (startDate && moment(PollEndDate).isBefore(startDate)) {
      setEndDateError("End date must be after start date");
    } else {
      setEndDateError(null);
      setEndDate(e.target.value);
      setEditPoll({ ...editPoll, [e.target.name]: e.target.value });
    }
  };

  const onStartDateChange = (e) => {
    const PollStartDate = e.target.value;
    if (PollStartDate === "") {
      setStartDateError("Start date is required");
    } else {
      setStartDateError(null);
      setStartDate(e.target.value);
    }
    if (PollStartDate && moment(endDate).isBefore(PollStartDate)) {
      setEndDateError("End date is before start date");
    } else {
      setEndDateError(null);
      setEditPoll({ ...editPoll, [e.target.name]: e.target.value });
    }
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const onInputOptionChange = (e, i) => {
    const inputData = [...val];
    inputData[i] = e.target.value;
    setVal(inputData);
    EditPatchValues.Options = inputData;
    if (inputData[i] === null || inputData[i] === " ") {
      setOptionError({
        ...optionError,
        [`${i}`]: "Enter a valid option",
      });
    } else if (!inputData[i].trim()) {
      setOptionError({
        ...optionError,
        [`${i}`]: "Please Enter a valid option",
      });
    } else if (inputData[i].length > 50) {
      setOptionError({
        ...optionError,
        [`${i}`]: "Maximum character length is 50",
      });
    } else {
      const error = optionError;
      delete error[i];
      setOptionError(error);
      setVal(inputData);
    }
  };

  const handleRemoveOption = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);

    const error = optionError;
    delete error[i];
    setOptionError(error);
    setMaxOptionCountFlag(false);
    setOptionCount(optionCount - 1);

    for (let j = i; j < deleteVal.length; j++) {
      if (error[j + 1]?.length > 0) {
        error[j] = error[j + 1];
        error[j + 1] = " ";
      }
    }
  };

  const handleAddColumn = () => {
    if (optionCount <= 9) {
      const col = [...val, []];
      setVal(col);
      setOptionCount(optionCount + 1);
    }
    if (optionCount > 9) {
      ToasterGlobal("Only 10 options are allowed", 71, ["warning"]);
    }
    if (optionCount > 8) {
      setMaxOptionCountFlag(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = 0;
    editPoll.EndDate = endDate;
    editPoll.StartDate = startDate;
    const body = {
      Topic: editPoll.Question,
      StartDate: editPoll.StartDate,
      EndDate: editPoll.EndDate,
      Options: val,
    };

    if (editPoll.Question.trim().length === 0) {
      setQuesError("Question is required");
      flag = 1;
    }

    if (endDate.EndDate === null || endDate === "") {
      setEndDateError("End date is required");
      flag = 1;
    }
    if (editPoll.StartDate === null || startDate === "") {
      setStartDateError("Start date is required");
      flag = 1;
    }

    for (let index = 0; index < val.length; index++) {
      let options = val[index];
      if (options.length === 0) {
        setOptionError((prevOptionError) => {
          const newOptionError = { ...prevOptionError };
          newOptionError[index] = "Option is required";
          return newOptionError;
        });
        flag = 1;
      }
    }

    if (Object.keys(optionError)?.length !== 0) {
      return;
    }

    if (quesError !== null || endDateError != null || startDateError !== null) {
      return;
    }
    if (flag === 1) {
      return;
    }
    axiosPrivate
      .put(api.PUT_EDIT_POLL.concat(editDeleteId), body)
      .then((response) => {
        if (response.data.errorCode === 809) {
          ToasterGlobal("Options must be unique", 502, ["warning"]);
        } else if (response.data.errorCode === 804) {
          ToasterGlobal("StartDate should not be before current date", 508, [
            "warning",
          ]);
        } else if (response.data.errorCode) {
          ToasterGlobal("Poll edit failed!", 504, ["error"]);

          return;
        } else {
          ToasterGlobal("Poll edited successfully", 150, ["success"]);

          listPole();
          editModalClose();
        }
      })
      .catch((error) => {
        let pollError = error.response.data;
        ToasterGlobal(pollError, 401, ["error"]);
      });
  };

  return (
    <>
      <Helmet>
        <title>Committee | Polls</title>
      </Helmet>
      <div className={pollStyle.pollList}>
        <div className={pollStyle.pollListView}>
          <div id="buttonHere">
            <Box>
              <Stack>
                {/* <Button
       
            className={pollStyle.btn_grad}
            onClick={() => handleOpenUser()}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Poll
          </Button> */}
              </Stack>
            </Box>
          </div>
          {data && data.length !== 0 ? (
            <TableBody id="tableHere">
              {data?.map((values) => {
                return (
                  <Card key={values?._id} className={pollStyle.poll}>
                    <Button
                      sx={{
                        marginLeft: "90%",
                        marginTop: "2%",
                      }}
                      onClick={(e) =>
                        handleOpen(
                          e,
                          values?._id,
                          values?.StartDate,
                          values.EndDate
                        )
                      }
                    >
                      <BsThreeDots color="black" size={20} />
                    </Button>
                    <Box
                      sx={{
                        position: "relative", 
                        cursor: "pointer",
                        // marginTop: "10px",
                      }}
                    >
                      <div className={pollStyle.polls}>
                        {/* <div style={{ marginBottom: "15px" }}> */}
                          <h1 style={{marginBottom:"30px"}}>
                            <span
                              style={{
                                fontSize: "1.2em",
                                fontWeight: "bold",
                                color: "gray",
                                fontFamily: "fantasy",
                              }}
                            >
                              Q:
                            </span>
                            {values?.Topic}
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
                            {moment(values?.StartDate, "YYYY-MM-DD").format(
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
                            {moment(values?.EndDate, "YYYY-MM-DD").format(
                              "DD-MM-YYYY"
                            )}
                            {data?.Status !== 1 &&
                              moment(values?.EndDate, "YYYY-MM-DD").format(
                                "DD-MM-YYYY"
                              ) <
                                moment(new Date(), "YYYY-MM-DD").format(
                                  "DD-MM-YYYY"
                                ) && (
                                <p style={{ color: "red" }}>Poll expired </p>
                              )}
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
                        {/* </div> */}
                        <LeafPoll
                          key={values?._id}
                          type={values?.type}
                          // question={values?.Topic}
                          // Options={values?.option}
                          // results={resData}
                          results={values?.Options}
                          theme={customTheme}
                          isVoted={true}
                        />
                      </div>
                    </Box>
                  </Card>
                );
              })}
            </TableBody>
          ) : (
            <img
              src="/assets/committee-removed.png"
              className={pollStyle.imageLogosList}
              alt="Img"
              width="300"
              height="300"
            />
          )}

          <div>
            {Sdate > Cdate ? (
              <Popover
                open={Boolean(opens)}
                anchorEl={opens}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    p: 0,
                    mt: 1.5,
                    ml: 1.85,
                    width: 88,
                    "& .MuiMenuItem-root": {
                      typography: "body2",
                      borderRadius: 0.75,
                    },
                  },
                }}
                style={{ marginLeft: "-30px" }}
              >
                <div style={{ display: "flex" }}>
                  <IconButton
                    variant="contained"
                    title="Delete"
                    onClick={() => deletePoll(editDeleteId)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    title="Edit"
                    onClick={handleEditModal}
                  >
                    <EditOutlinedIcon color="primary" />
                  </IconButton>
                </div>
              </Popover>
            ) : (
              <Popover
                open={Boolean(opens)}
                anchorEl={opens}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    p: 0,
                    mt: 1.5,
                    ml: -1,
                    width: 40,
                    "& .MuiMenuItem-root": {
                      typography: "body2",
                      borderRadius: 0.75,
                    },
                  },
                }}
              >
                <div style={{ display: "flex" }}>
                  <IconButton
                    variant="contained"
                    title="Delete"
                    onClick={() => deletePoll(editDeleteId)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </Popover>
            )}
            <Modal open={editModalOpen} onClose={editModalClose} center>
              <Box
                sx={{
                  position: "absolute",
                  top: "51%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  bgcolor: "background.paper",
                  maxHeight: "700px",
                  overflow: "scroll",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <div>
                  <span
                    onClick={editModalClose}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "50 %",
                      right: "0 %",
                      padding: "0px 0px",
                      marginLeft: "76%",
                      transform: "translate(0 %, -50 %)",
                    }}
                  >
                    <CloseIcon className={pollStyle.createPollCloseIcon} />
                  </span>
                  <h4>Edit Poll</h4>
                </div>
                <form sx={{ textAlign: "center" }}>
                  <FormControl fullwidth sx={{ m: 2 }}>
                    <TextField
                      type="text"
                      sx={{
                        width: { sm: 200, md: 200, lg: 480, xl: 400 },
                        "& .MuiInputBase-root": {
                          height: 54,
                        },
                      }}
                      autoComplete="off"
                      size="small"
                      id="exampleFormControlInput1"
                      name="Question"
                      label="Enter question"
                      defaultValue={EditPatchValues.Topic}
                      onChange={(e) => onQuestionChange(e)}
                    />
                  </FormControl>
                  {quesError != null ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "-7px",
                        marginBottom: "-7px",
                        textAlign: "left",
                        marginLeft: "20px",
                      }}
                    >
                      {quesError}
                    </p>
                  ) : (
                    ""
                  )}
                  <FormControl fullwidth sx={{ m: 2 }}>
                    <TextField
                      inputProps={{
                        min: moment().format("YYYY-MM-DD"),
                      }}
                      type="Date"
                      onKeyDown={onKeyDown}
                      sx={{
                        width: { sm: 200, md: 200, lg: 480, xl: 400 },
                        "& .MuiInputBase-root": {
                          height: 54,
                        },
                      }}
                      autoComplete="off"
                      size="small"
                      id="exampleFormControlInput1"
                      name="StartDate"
                      label="Start date"
                      defaultValue={EditPatchValues.StartDate}
                      onChange={(e) => onStartDateChange(e)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  {startDateError != null ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "-7px",
                        marginBottom: "-7px",
                        marginLeft: "20px",
                        textAlign: "left",
                      }}
                    >
                      {startDateError}
                    </p>
                  ) : (
                    ""
                  )}
                  <FormControl fullwidth sx={{ m: 2 }}>
                    <TextField
                      inputProps={{
                        min: moment().format("YYYY-MM-DD"),
                      }}
                      type="Date"
                      onKeyDown={onKeyDown}
                      sx={{
                        width: { sm: 200, md: 200, lg: 480, xl: 400 },
                        "& .MuiInputBase-root": {
                          height: 54,
                        },
                      }}
                      autoComplete="off"
                      size="small"
                      id="exampleFormControlInput1"
                      name="EndDate"
                      label="End date"
                      defaultValue={EditPatchValues.EndDate}
                      onChange={(e) => onEndDateChange(e)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  {endDateError != null ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "-7px",
                        marginBottom: "-7px",
                        marginLeft: "20px",
                        textAlign: "left",
                      }}
                    >
                      {endDateError}
                    </p>
                  ) : (
                    ""
                  )}
                  {val?.map((OptionNum, i) => {
                    return (
                      <>
                        <div style={{ display: "flex" }}>
                          <FormControl fullwidth sx={{ m: 2 }}>
                            <TextField
                              type="text"
                              sx={{
                                width: { sm: 200, md: 200, lg: 480, xl: 325 },
                                "& .MuiInputBase-root": {
                                  height: 54,
                                },
                              }}
                              autoComplete="off"
                              size="small"
                              id="exampleFormControlInput1"
                              name="UserName"
                              onChange={(e) => onInputOptionChange(e, i)}
                              value={OptionNum}
                              label="Enter option"
                            />
                          </FormControl>
                          {i > 1 ? (
                            <IconButton
                              type="button"
                              onClick={() => handleRemoveOption(i)}
                              title="Remove option"
                              className={pollStyle.closeButton}
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          ) : (
                            ""
                          )}
                          {i === val.length - 1 &&
                            maxOptionCountFlag === false && (
                              <div>
                                <IconButton
                                  className={pollStyle.AddOption}
                                  type="button"
                                  title="Add option"
                                  variant="contained"
                                  size="small"
                                  style={{ backgroundColor: "#144399" }}
                                  onClick={() => handleAddColumn()}
                                >
                                  <AddCircleOutlineIcon />
                                </IconButton>
                              </div>
                            )}
                          {i === val.length - 1 && maxOptionCountFlag === true && (
                            <div>
                              <IconButton
                                className={pollStyle.AddOptions}
                                type="button"
                                title="Reached the maximum limit for options"
                                variant="contained"
                                size="small"
                                style={{ backgroundColor: "#144399" }}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </div>
                          )}
                        </div>
                        {optionError != null ? (
                          <p
                            style={{
                              color: "red",
                              marginTop: "-7px",
                              marginBottom: "-7px",
                              marginLeft: "20px",
                              textAlign: "left",
                            }}
                          >
                            {optionError?.[i]}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                  <div>
                    <Button
                      sx={{
                        width: "24%",
                        height: 35,
                        marginLeft: "76%",
                        marginTop: "10px",
                      }}
                      className={pollStyle.submitPollButton}
                      type="submit"
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "#144399" }}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
});
export default PollList;
