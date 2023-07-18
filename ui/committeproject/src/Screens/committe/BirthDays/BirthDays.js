import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import api from "../../../api/API_URL";
import { axiosPrivate } from "../../../api/Interceptor/intercepter";
import birthdayStyles from "./birthDays.module.css";

function validateFile(file1) {
  const errors = [];
  const fileName = file1.name;
  const size = file1.size / 1024 / 1024;
  switch (true) {
    case size >= 5:
      errors.push("Image size must be less than 5 MB");
      break;
    case fileName.length >= 100:
      errors.push("file name length should be less than 100");
      break;
    default:
      break;
  }
  return errors;
}

function BirthDays() {
  const inputFileRef = useRef(null);
  const [birthdatas, setBirthDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState([]);
  const [file, setfile] = useState("");
  const [bcardError, setBcardError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const selectTitle = card.BirthdayCard
    ? "Select Image to change birthday card"
    : "select image";

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 120,
      margin: "0",
    },
  }));

  const classes = useStyles();

  const handleOpen = (id) => {
    setOpen(true);
    sessionStorage.setItem("id", id);
  };
  const handleClose = () => {
    BirthdayCurrentMonth();
    setOpen(false);
    setCard([]);
    setfile("");
    setBcardError("");
  };

  const getDetails = () => {
    let id = sessionStorage.getItem("id");
    axiosPrivate
      .get("Users/getUserDetails/" + id)
      .then((res) => {
        setCard(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { files } = e.target;
    const image = files[0];
    if (!image) return;

    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const fileSelected = image.type;
    if (!allowedFileTypes.includes(fileSelected)) {
      resetFileState();
      setBcardError("Files only support jpg,jpeg,png format only");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      const allowedAspectRatioMin = 15 / 10;
      const allowedAspectRatioMax = 17 / 8;

      const fileErrors = validateFile(image);
      switch (true) {
        case fileErrors.length > 0:
          resetFileState();
          setBcardError(fileErrors[0]);
          return;
        case aspectRatio < allowedAspectRatioMin:
        case aspectRatio > allowedAspectRatioMax:
          resetFileState();
          setBcardError(
            "Please upload an image with approximately 16:9 aspect ratio"
          );
          return;
        default:
          setBcardError("");
          setfile(image);
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => {
            setPreviewUrl(reader.result);
          };
      }
    };
  };

  const resetFileState = () => {
    setPreviewUrl("");
    setfile("");
  };

  const cancel = () => {
    resetFileState();
    inputFileRef.current.value = "";
  };

  const handleUpdate = () => {
    switch (true) {
      case bcardError?.length:
        return;
      case file.length === 0:
        ToasterGlobal("Please select a file", 8312, ["error"]);
        return;
      default:
        let id = sessionStorage.getItem("id");
        const formData = new FormData();
        formData.append("image", file);
        axiosPrivate
          .put("Users/birthdayCardUpdate/" + id, formData)
          .then((res) => {
            getDetails();
            BirthdayCurrentMonth();
            handleClose();
            resetFileState();
            ToasterGlobal("Birthday card uploaded", 101, ["success"]);
          })
          .catch((err) => {
            ToasterGlobal("File upload failed", 103, ["error"]);
          });
    }
  };

  const handleDelete = () => {
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
        let id = sessionStorage.getItem("id");
        const formData = new FormData();
        formData.append("image", "");
        formData.append("Delete", 1);
        axiosPrivate
          .put("Users/birthdayCardUpdate/" + id, formData)
          .then((res) => {
            getDetails();
            BirthdayCurrentMonth();
            handleClose();
            ToasterGlobal("Birthday card deleted", 102, ["error"]);
          })
          .catch((err) => {
            ToasterGlobal("Oops!something went wrong", 102, ["error"]);
          });
      }
    });
  };

  const BirthdayCurrentMonth = () => {
    const url = api.BIRTHDAY_CURRENT_MONTH;
    axiosPrivate
      .get(url)
      .then((res) => {
        setBirthDatas(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    BirthdayCurrentMonth();
  }, []);

  function getDayMonth(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentYear = new Date().getFullYear();

    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];

    let year = date.getFullYear();
    let dayOfWeek;
    if (date < new Date(currentYear, date.getMonth(), date.getDate())) {
      year = currentYear;
      const newDay = new Date(`${date.getMonth()}/${date.getDate()}/${year}`);
      dayOfWeek = daysOfWeek[newDay.getDay()];
    } else {
      dayOfWeek = daysOfWeek[date.getDay()];
    }

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  }

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <div className={birthdayStyles.headingText} style={{ color: "#173F5F" }}>
        BIRTHDAYS THIS MONTH
      </div>
      <div className={birthdayStyles.scrollList}>
        <List>
          {birthdatas?.length !== 0 ? (
            <TableBody>
              {birthdatas?.map((values) => (
                <ListItem key={values?.id}>
                  <ListItemAvatar>
                    <Avatar alt={values?.UserName} src={values?.UserImage} />
                  </ListItemAvatar>
                  <Stack title={values?.UserName}>
                    <Typography className={classes.wrapper}>
                      {values?.UserName}
                    </Typography>

                    <Typography
                      className={classes.wrapper}
                      style={{ color: "green", fontSize: "12px" }}
                    >
                      {getDayMonth(values?.DOB)}
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={
                        values?.BirthdayCard ? <EditIcon /> : <UploadIcon />
                      }
                      className={birthdayStyles.button}
                      title={
                        values?.BirthdayCard
                          ? "Change birthday card"
                          : "Upload birthday card"
                      }
                      onClick={() => {
                        handleOpen(values?._id);
                        getDetails();
                      }}
                    >
                      {values?.BirthdayCard ? "Change" : "Upload"}
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                <img
                  src="/favicon/logo_comittee.png"
                  className={birthdayStyles.imageLogoBirthday}
                  alt="Img"
                  width="200"
                  height="200"
                />
              </TableCell>
            </TableRow>
          )}
        </List>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={birthdayStyles.modal}>
          <h3>
            Upload birthday card
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </h3>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!file && card.BirthdayCard ? (
              <Box
                component="img"
                sx={{
                  padding: "10px",
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="Birthday card"
                src={card.BirthdayCard}
              />
            ) : (
              <span>{"Upload birthday card for " + card?.UserName}</span>
            )}
            {file ? (
              <div
                style={{
                  maxWidth: "250px",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                  className={birthdayStyles.xButton}
                  onClick={cancel}
                  variant="contained"
                  color="error"
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
                {previewUrl && <img src={previewUrl} alt="" />}
              </div>
            ) : (
              <>
                <input
                  ref={inputFileRef}
                  title={selectTitle}
                  onChange={handleChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  style={{ marginTop: "25px", width: "235px" }}
                />
                <p
                  style={{
                    color: "red",
                    width: "235px",
                    marginTop: "5px",
                    marginBottom: "30px",
                  }}
                >
                  {bcardError}
                </p>
              </>
            )}
          </Box>
          {!bcardError && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                paddingBottom: "15px",
                paddingTop: "15%",
              }}
            >
              <Button
                variant="outlined"
                startIcon=<UploadIcon />
                component="span"
                onClick={handleUpdate}
              >
                Upload
              </Button>
              {!file && card.BirthdayCard && (
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Remove
                </Button>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default BirthDays;
