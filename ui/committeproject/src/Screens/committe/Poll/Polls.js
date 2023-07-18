import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import React,{ useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Iconify from "../../../components/iconify";
import employeeStyle from "./Poll.module.css";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import api from "../../../api/API_URL";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PollList from "../PollList/PollList";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";

export default function Polls() {
  const [userOpen, setUserOpens] = useState(false);
  const [val, setVal] = useState([]);
  const [question, SetQuestion] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [quesError, setQuesError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [optionError, setOptionError] = useState({});
  const [optionCount, setOptionCount] = useState(0);
  const [endDateValError, setEndDateValError] = useState(null);
  const [maxOptionCountFlag, setMaxOptionCountFlag] = useState(false);
  const pollListRef = useRef();

  function handleOpenUser() {
    setUserOpens(true);
    if (optionCount <= 4) {
      const col = [...val, [], []];
      setVal(col);
      setOptionCount(optionCount + 2);
    }
  }

  const handleCloseUser = () => {
    setUserOpens(false);
    SetQuestion("");
    setEndDate("");
    setStartDate("");
    setQuesError(null);
    setStartDateError(null);
    setEndDateValError(null);
    setEndDateError(null);
    setMaxOptionCountFlag(false);
    setOptionError({});
    setOptionCount(0);
    setVal([]);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleAddColumn = () => {
    if (optionCount <= 9) {
      const col = [...val, []];
      setVal(col);
      setOptionCount(optionCount + 1);
    }
    if (optionCount > 9) {
      ToasterGlobal("Only 10 options are allowed", 70,["warning"]);
    }
    if (optionCount > 8) {
      setMaxOptionCountFlag(true);
    }
  };

  const onInputOptionChange = (e, i) => {
    const inputData = [...val];
    inputData[i] = e.target.value;
    setVal(inputData);

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
    setOptionCount(optionCount - 1);
    
    setMaxOptionCountFlag(false);
    for (let j = i; j < deleteVal.length; j++) {
      if (error[j + 1]?.length > 0) {
        error[j] = error[j + 1];
        error[j + 1] = " ";
      }
    }
  };

  const handleSubmit = (e, i) => {
    e.preventDefault();
    let flag = 0;
    const body = {
      Topic: question,
      StartDate: startDate,
      EndDate: endDate,
      Options: val,
    };

    if (question.trim().length === 0) {
      setQuesError("Question is required");
      flag = 1;
    }

    if (endDate === null || endDate === "") {
      setEndDateError("End date is required");
      flag = 1;
    }
    if (startDate === null || startDate === "") {
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

    if (
      quesError !== null ||
      endDateError != null ||
      startDateError !== null ||
      endDateValError !== null
    ) {
      return;
    }
    if (flag === 1) {
      return;
    }

    axiosPrivate.post(api.POST_CREATE_POLL, body).then((response) => {
      if (response.data.errorCode === 809) {
        ToasterGlobal("Options must be unique", 501,["warning"]);

      } else if (response.data.errorCode === 802) {
        ToasterGlobal("Date should be in Correct format", 501,["warning"]);
      } else if (response.data.errorCode === 804) {
        ToasterGlobal("StartDate should not be before current date", 501,["warning"]);

      } else if (response.data.errorCode) {
        ToasterGlobal("Poll creation failed!", 504,["error"]);

        return;
      } else {
        ToasterGlobal("Poll Created Successfully", 49,["success"]);
        handleCloseUser();
        pollListRef.current.listPole();
      }
    });
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
      SetQuestion(e.target.value);
    }
  };

  const onEndDateChange = (e) => {
    const PollEndDate = e.target.value;
    
    
    if (PollEndDate === "") {
      setEndDateError("End date is required");
    } else if (startDate && moment(PollEndDate).isBefore(startDate)) {
      setEndDateValError("End date must be after start date");
      setEndDate(e.target.value);
      
      setEndDateError(null);
    } else {
      setEndDateError(null);
      
      setEndDateValError(null);
      setEndDate(e.target.value);
    }
  };

  const onStartDateChange = (e) => {
    const PollStartDate = e.target.value;
    
    
    if (PollStartDate === "") {
      setStartDateError("Start date is required");
    } else if (PollStartDate && moment(endDate).isBefore(PollStartDate)) {
      setStartDateError(null);
      setStartDate(e.target.value);
      setEndDateValError("End date is before start date");
    } else {
      setStartDateError(null);
      setEndDateValError(null);
      setStartDate(e.target.value);
    }
  };

  // poll //

  return (
    <>
      <Helmet>
        <title>Committee | Polls</title>
      </Helmet>

      <div style={{ width: "100%" }}>
        <PollList ref={pollListRef} />
      </div>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="start">
          <Button
            className={employeeStyle.btn_grad}
            onClick={() => handleOpenUser()}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Poll
          </Button>
        </Stack>
      </Box>
      <Modal open={userOpen} onClose={handleCloseUser} center>
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
              onClick={handleCloseUser}
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
              <CloseIcon className={employeeStyle.createPollCloseIcon} />
            </span>
            <h4>Create Poll</h4>
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
            {endDateValError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-7px",
                  marginBottom: "-7px",
                  marginLeft: "20px",
                  textAlign: "left",
                }}
              >
                {endDateValError}
              </p>
            ) : (
              ""
            )}

            {val.map((OptionNum, i) => {
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
                        value={OptionNum}
                        name="UserName"
                        onChange={(e) => onInputOptionChange(e, i)}
                        label="Enter option"
                      />
                    </FormControl>
                    {i > 1 ? (
                      <IconButton
                        type="button"
                        title="Remove option"
                        onClick={() => handleRemoveOption(i)}
                        className={employeeStyle.closeButton}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    ) : (
                      ""
                    )}
                    {i === val.length - 1 && maxOptionCountFlag === false && (
                      <div>
                        <IconButton
                          className={employeeStyle.AddOption}
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
                          className={employeeStyle.AddOptions}
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
                  {/* <p style={{ color: 'red' }}>{pointError?.[index]}</p> */}
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
                className={employeeStyle.submitPollButton}
                type="submit"
                variant="contained"
                size="small"
                style={{ backgroundColor: "#144399" }}
                onClick={(e, i) => handleSubmit(e, i)}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
