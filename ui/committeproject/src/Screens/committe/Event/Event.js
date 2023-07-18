import CloseIcon from "@mui/icons-material/Close";
import { Box, MenuItem, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { throttle } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/API_URL";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import textStyle from "./Event.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { listQuatersCommitte } from "../../../api/ServiceFile/ApiServiceComitte";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 300,
  },
}));

const Event = ({ handleCloseModal, openModal, reload }) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [quaterId, setuaterId] = useState("");

  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [values, setValue] = useState(null);
  const [nameErr, setNameerror] = useState("");
  const [descErr, setDescerror] = useState("");
  const [startdateErr, setStartDateerror] = useState("");
  const [QuarterError, setQuarterError] = useState("");
  const [fileError, setFileError] = useState(" ");
  const [filelength, setfilelength] = useState(0);
  const [enddateErr, setendDateerror] = useState(" ");
  const [endDateValError, setEndDateValError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [year, setYear] = useState(2023);
  const [quterList, setQuterList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const storedValue = localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setValue(pasedValue.data._id);
    fetchQuaterList();
  }, []);

  const fetchQuaterList = async () => {
    let body = {
      year: year,
    };
    await listQuatersCommitte(body).then((response) => {
      setQuterList(response.data);
      console.log(response.data);
      // console.log(response.data.);
    });
  };

  // const [QtrStartDate, setQtrStartDate] = useState(null);
  // const [QtrEndDate, setQtrEndDate] = useState(null);
  const handleQuaterChange = (event) => {
    event.preventDefault();
    let quaterId = event.target.value._id;

    if (quaterId.length === 0) {
      setQuarterError("Please select quarter");
    } else {
      setQuarterError(null);
    }
    // setQtrStartDate(moment(event.target.value.StartDate).format("YYYY-MM-DD"));
    // setQtrEndDate(moment(event.target.value.EndDate).format("YYYY-MM-DD"));

    // if (moment(endDate).isAfter(event.target.value.EndDate)) {
    //   setEndDateValError("Event must be on the selected quarter");
    //   setendDateerror(null);
    //   setEndDate(event.target.value);
    // } else {
    //   // End date is valid, clear error message
    //   setendDateerror(null);
    //   setEndDateValError(null);
    //   setEndDate(event.target.value);
    // }

    setuaterId(quaterId);
  };

  async function handleSubmits(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("File", file);
    formData.append("EventName", name);
    formData.append("EventDescription", description);
    formData.append("StartDate", startDate);
    formData.append("EndDate", endDate);
    formData.append("UserId", values);
    formData.append("quarterId", quaterId);

    let error = false;
    if (quaterId.length === 0) {
      setQuarterError("Please select quarter");
    }
    if (name.trim().length === 0) {
      setNameerror("Name is required");
      error = true;
    }
    if (description.trim().length === 0) {
      setDescerror("description is required");
      error = true;
    }
    if (startDate === "") {
      setStartDateerror("Start Date is required");
      error = true;
    }
    if (endDate === "") {
      setendDateerror("End Date is required");
      error = true;
    }
    if (filelength === 0) {
      setFileError("file is required");
      error = true;
    }
    if (
      nameErr !== null ||
      descErr != null ||
      startdateErr !== null ||
      endDateValError !== null ||
      enddateErr !== null ||
      fileError != null ||
      QuarterError !== null
    ) {
      return;
    }

    if (error) {
      return;
    }
    console.log("submit", formData);
    try {
      setDisabled(true);
      await axiosPrivate
        .post(api.POST_CREATE_EVENT, formData)
        .then((res) => {
          reload();
          if (res.data.name !== "ValidationError") {
            ToasterGlobal("Event added successfully!", 1, ["success"]);

            handleCloseModal();
          } else {
            ToasterGlobal("Unsuccessful, Not Unique EventName", 3, ["warning"]);
          }
        })
        .catch((err) => {
          ToasterGlobal(err.response.data.errMsg, 4, ["warning"]);
        });
    } catch (eror) {
      console.log(eror);
    }
  }

  const onInputGameNameChange = (e) => {
    setDisabled(false);
    e.preventDefault();
    let eventName = e.target.value;
    let nameCheck = new RegExp(/^[0-9a-zA-Z. g]+$/).test(eventName);

    if (eventName === "") {
      setNameerror("Event name is required");
    } else if (!eventName.trim()) {
      setNameerror("Please Enter valid EventName");
    } else if (!nameCheck) {
      setNameerror("Please enter valid name");
    } else if (eventName.length >= 30 || eventName.length <= 1) {
      setNameerror("Please enter the charaters between 1 and 30");
    } else {
      setNameerror(null);
      setName(e.target.value);
    }
  };

  const onStartDateChange = (e) => {
    setDisabled(false);
    e.preventDefault();
    let newStartDate = e.target.value;

    if (newStartDate === "") {
      setStartDateerror("StartDate is required");
      setStartDate(newStartDate);
    } else {
      setStartDateerror(null);
      setStartDate(newStartDate);
    }

    if (newStartDate && moment(endDate).isBefore(newStartDate)) {
      setEndDateValError("End date is before start date");
      setStartDate(newStartDate);
    } else {
      // End date is valid, clear error message
      setStartDateerror(null);
      setEndDateValError(null);
      setStartDate(newStartDate);
    }
  };

  const onEndDateChange = (event) => {
    setDisabled(false);
    let newEndDate = event.target.value;
    if (newEndDate == "") {
      setendDateerror("End date is required");
    } else if (startDate && moment(newEndDate).isBefore(startDate)) {
      setEndDateValError("End date must be after start date");
      setendDateerror(null);
      setEndDate(event.target.value);
    } else {
      // End date is valid, clear error message
      setendDateerror(null);
      setEndDateValError(null);
      setEndDate(event.target.value);
    }
  };

  function handleChange(event) {
    setDisabled(false);
    const fileType = event.target.files[0].type;
    const fileSize = event.target.files[0].size / 1024 / 1024;
    if (
      fileType === "application/pdf" ||
      fileType === "application/ppt" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg" ||
      fileType === "video/mp4"
    ) {
      if (fileSize > 5) {
        setFileError("file size should be less than 5MB");
      } else {
        setFile(event.target.files[0]);
        setfilelength(event.target.files.length);
        setFileError(null);
      }
    } else {
      setFileError("Files only support pdf,ppt,pptx image and video format");
    }
  }

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  // editor

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isFirstRun, setIsFirstRun] = useState(true);

  const onEditorStateChange = useCallback(
    throttle((editorState) => {
      if (isFirstRun) {
        setIsFirstRun(false);
      }
      setEditorState(editorState);
      setDisabled(false);
      const contentState = convertToRaw(editorState.getCurrentContent());
      const html = draftToHtml(contentState);
      console.log("ssssssssssssssss", html.length);
      const withoutTags = html
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;/g, " ");
      if (html === "") {
        setDescerror("Description is required");
      } else if (!html.trim()) {
        setDescerror("Please Enter valid Description");
      } else if (
        withoutTags.length >= 250 ||
        (withoutTags.length <= 1 && !isFirstRun)
      ) {
        setDescerror("Please enter the characters  between 1 and 250");
      } else {
        setDescerror(null);
        setDescription(html);
      }
    }, 500)
  );

  console.log(description, "description");

  return (
    <Modal open={openModal} onClose={handleCloseModal} center>
      <Box
        sx={{
          position: "absolute",
          top: "51%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          borderRadius: "20px",
          boxShadow: 24,
          maxHeight: "700px",
          overflowY: "auto",
          overflowX: "hidden",
          p: 4,
        }}
      >
        <div className={textStyle.modalClose}>
          <span
            onClick={handleCloseModal}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "85%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon style={{ marginTop: "14px", color: "white" }} />
          </span>
          <div className={textStyle.texttype}>
            <h5 style={{ padding: "13px", color: "white" }}>
              <b>Create Event</b>
            </h5>
          </div>
        </div>
        <form sx={{ textAlign: "center", m: 2 }} style={{marginRight:"-76px"}}>
          <FormControl fullWidth sx={{ m: 2, width: "84%" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ height: "28px" }}
            >
              Quarter Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Quarter Name"
              onChange={handleQuaterChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {quterList.length !== 0 ? (
                quterList.map((event) => {
                  if (moment().isBefore(event.EndDate)) {
                    return (
                      <MenuItem key={event.id} value={event}>
                        {event.QuaterName}
                      </MenuItem>
                    );
                  }
                  return null;
                })
              ) : (
                <div>No data available</div>
              )}
            </Select>
          </FormControl>
          {QuarterError && (
            <p
              style={{
                color: "red",
                marginLeft: "20px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              {QuarterError}
            </p>
          )}
          <FormControl fullwidth sx={{ m: 2, width: "83.5%" }}>
            <TextField
              type="text"
              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="EventName"
              onChange={(e) => onInputGameNameChange(e)}
              label=" Event Name"
            />
          </FormControl>
          {nameErr && (
            <p
              style={{
                color: "red",
                marginLeft: "20px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              {nameErr}
            </p>
          )}
          <div style={{ marginLeft: "11px"}}>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              placeholder="Enter Description"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "emoji",

                  "history",
                ],
                link: {
                  options: ["link"],
                },
                inline: {
                  inDropdown: true,
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "monospace",
                    "superscript",
                    "subscript",
                  ],
                },
                blockType: {
                  inDropdown: true,
                  options: [
                    "Normal",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "Blockquote",
                  ],
                },
                fontSize: {
                  inDropdown: true,
                  options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                history: { inDropdown: false },
              }}
            />
          </div>
          {descErr != null ? (
            <p
              style={{
                color: "red",
                marginLeft: "21px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              {descErr}
            </p>
          ) : (
            ""
          )}
          <FormControl fullwidth sx={{ m: 2, width: "83.5%" }}>
            <TextField
              type="Date"
              onKeyDown={onKeyDown}
              InputProps={{
                inputProps: { min: moment(new Date()).format("yyyy-MM-DD") },
              }}
              // InputProps={{ inputProps: { min: startDDate } }}

              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="Date"
              onChange={(e) => onStartDateChange(e)}
              label="StartDate"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          {startdateErr != null ? (
            <p
              style={{
                color: "red",
                marginLeft: "20px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              {startdateErr}
            </p>
          ) : (
            ""
          )}
          <FormControl fullwidth sx={{ m: 2, width: "83.5%" }}>
            <TextField
              type="Date"
              onKeyDown={onKeyDown}
              InputProps={{
                inputProps: { min: moment(new Date()).format("yyyy-MM-DD") },
              }}
              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="Date"
              onChange={(e) => onEndDateChange(e)}
              label="EndDate"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          {enddateErr != null ? (
            <p
              style={{
                color: "red",
                marginLeft: "20px",
                fontSize: "12px",
                marginTop: "-7px",
              }}
            >
              {enddateErr}
            </p>
          ) : (
            ""
          )}
          {endDateValError != null ? (
            <p
              style={{
                color: "red",
                marginLeft: "20px",
                marginTop: "-7px",
                fontSize: "12px",
              }}
            >
              {endDateValError}
            </p>
          ) : (
            ""
          )}
          <input
            type="file"
            name="File"
            id="fileInput"
            onChange={handleChange}
            style={{ marginLeft: "15px", maxWidth: "300px" }}
          />
          {fileError != null ? (
            <p style={{ color: "red", marginLeft: "20px", fontSize: "12px" }}>
              {fileError}
            </p>
          ) : (
            ""
          )}
          <Button
            className={textStyle.sumitbtns}
            sx={{ m: 2, width: "20%", height: 35 }}
            center
            type="button"
            variant="contained"
            size="small"
            style={{ backgroundColor: "#144399" }}
            onClick={handleSubmits}
            disabled={disabled}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Event;
