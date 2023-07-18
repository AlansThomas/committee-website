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
import ToasterGlobal from "../../../../TosterGlobal/ToasterGlobal";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import birthdayStyles from "../../BirthDays/birthDays.module.css";
import "./Swal.css";

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

function Glimpses() {
  const inputFileRef = useRef(null);
  const [birthdatas, setBirthDatas] = useState([]);
  const [cardCondition, setCardCondition] = useState(false);

  const [open, setOpen] = useState(false);
  const [card, setCard] = useState([]);
  const [file, setfile] = useState([]);
  const [bcardError, setBcardError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const selectTitle = card
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
    setfile(false);
    console.log("file", file, "/////////////////", card, "card");
    sessionStorage.setItem("id", id);
    if (id !== "ImageADD") {
      console.log("🚀 ~ file: Glimpses.js:70 ~ handleOpen ~ id:", id);

      setCardCondition(true);
      const desiredGlimpse = birthdatas.find((glimpse) => glimpse._id === id);
      setCard(desiredGlimpse.GlimpsesPath);
    } else {
      setCard([]);
      setCardCondition(false);
    }

    setOpen(true);
  };
  const handleClose = () => {
    BirthdayCurrentMonth();
    setOpen(false);
    setCard([]);
    setfile("");
    resetFileState();
    setBcardError("");
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
    let id = sessionStorage.getItem("id");
    if (id !== "ImageADD") {
      switch (true) {
        case bcardError?.length:
          return;
        case file.length === 0:
          ToasterGlobal("Please select a file", 8312, ["error"]);
          return;
        default:
          const formData = new FormData();
          formData.append("image", file);
          formData.append("glimpseId", id);

          axiosPrivate
            .put("Notification/editGlimpses/", formData)
            .then((res) => {
              BirthdayCurrentMonth();
              handleClose();
              resetFileState();
              ToasterGlobal("Glimps uploaded", 101, ["success"]);
            })
            .catch((err) => {
              ToasterGlobal("File upload failed", 103, ["error"]);
            });
      }
    } else {
      switch (true) {
        case bcardError?.length:
          return;
        case file.length === 0:
          ToasterGlobal("Please select a file", 8312, ["error"]);
          return;
        default:
          const formData = new FormData();
          formData.append("image", file);

          axiosPrivate
            .post("Notification/addGlimpses/", formData)
            .then((res) => {
              BirthdayCurrentMonth();
              handleClose();
              resetFileState();
              ToasterGlobal("Glimps uploaded", 101, ["success"]);
            })
            .catch((err) => {
              ToasterGlobal("File upload failed", 103, ["error"]);
            });
      }
    }
  };

  const handleDelete = (id) => {
    sessionStorage.setItem("id", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: "swal-zindex", // Set a custom class name for the container
      },
    }).then((response) => {
      if (response.isConfirmed) {
        let id2 = sessionStorage.getItem("id");

        const body = {
          glimpseId: id2,
        };

        axiosPrivate
          .put("Notification/glimpseDelete/", body)
          .then((res) => {
            BirthdayCurrentMonth();
            handleClose();
            ToasterGlobal("Glimps deleted", 102, ["error"]);
          })
          .catch((err) => {
            ToasterGlobal("Oops! Something went wrong", 102, ["error"]);
          });
      }
    });
  };

  const BirthdayCurrentMonth = () => {
    const url = api.GLIMPSES_GET;
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

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <div className={birthdayStyles.headingText} style={{ color: "#173F5F" }}>
        Glimpses
      </div>
      <div className={birthdayStyles.scrollList}>
        <List>
            <TableBody
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "92% !important" }}
                className={birthdayStyles.button}
                title={"Upload glimps"}
                onClick={() => {
                  handleOpen("ImageADD");
                }}
              >
                <UploadIcon />
              </Button>
              {birthdatas?.map((values) => (
                <ListItem key={values?.id}>
                  <div style={{ width: "86%" }}>
                    <img src={values.GlimpsesPath} alt="" />
                  </div>
                  <Button
                    variant="outlined"
                    style={{ width: "5% !important" }}
                    className={birthdayStyles.button}
                    title={"Change glimpses card"}
                    onClick={() => {
                      handleOpen(values?._id);
                    }}
                  ><EditIcon /></Button>
                  <Button
                    style={{ width: "5% !important" }}
                    variant="outlined"
                    className={birthdayStyles.button}
                    onClick={() => {
                      handleDelete(values?._id);
                    }}
                  ><DeleteIcon /></Button>
                </ListItem>
              ))}
            </TableBody>

        </List>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={birthdayStyles.modal}>
          <h3>
            Upload Glimpses
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </h3>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cardCondition ? (
              <Box
                component="img"
                sx={{
                  padding: "10px",
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="Glimps"
                src={previewUrl ? previewUrl : card}
              />
            ) : (
              <>
                <span>"Upload Glimps "</span>
                <input
                  ref={inputFileRef}
                  title={selectTitle}
                  onChange={handleChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  style={{ marginTop: "25px", width: "235px" }}
                />
              </>
            )}
            {!cardCondition ? (
              <div
                style={{
                  maxWidth: "250px",
                  maxHeight: "200px",
                  marginTop: "10px",
                }}
              >
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
              {cardCondition && (
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

export default Glimpses;
