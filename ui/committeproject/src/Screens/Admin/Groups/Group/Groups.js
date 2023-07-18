import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom/dist";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  createGrp,
  deleteGrp,
  editGrpImage,
  EditGrpName,
  getGrp,
  listGrp,
} from "../../../../api/ServiceFile/ApiService";
import Iconify from "../../../../components/iconify";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import GroupsStyles from "./Groups.module.css";

// ----------------------------------------------------------------------
export default function Groups() {
  const [openAddGroup, setOpensAddGroup] = useState(false);
  const [GroupName, setGroupName] = useState("");
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [EditPatchValue, setEditPatchValue] = useState([]);
  const [updatePicOpen, setUpdatePicOpen] = useState(false);
  const [editPicId, setEditPicId] = useState("");
  const [fileError, setFileError] = useState(null);
  const [NameError, setNameError] = useState(null);
  const [fileLength, setFileLength] = useState(0);
  const [grNameError, setGrNameError] = useState(null);
  const [editUser, setEditUser] = useState({
    GroupName: "",
  });
  const fileEditTypeRef = useRef();
  const groupNameRef = useRef();
  const groupNameEditRf = useRef();

  useEffect(() => {
    listGroups();
  }, []);
  // add group modal open //
  const handleOpen = () => {
    setOpensAddGroup(true);
  };
  const handleClose = () => {
    setNameError(null);
    setFileError(null);
    setOpensAddGroup(false);
    setFileLength(0);
    setFile("");
    setGroupName("");
  };
  const onInputFIleChange = (e) => {
    setFile("");
    setFileLength(0);
    const fileSelected = e.target.files[0].type;
    let file_size = e.target.files[0].size / 1024 / 1024;
    if (file_size > 5) {
      setFileError("File size must be less than 5mb");
    } else if (e.target.files[0].name.length > 100) {
      setFileError("File name length should less than 100");
    } else if (
      fileSelected === "image/jpg" ||
      fileSelected === "image/jpeg" ||
      fileSelected === "image/png"
    ) {
      setFileError(null);
      setFile(e.target.files[0]);
      setFileLength(e.target.files.length);
    } else {
      setFileError("Files only support jpg,jpeg,png format only");
    }
  };

  const onInputNameChange = (e) => {
    const grName = e.target.value;
    if (grName === null || grName === " ") {
      setNameError("Please enter a valid Group name");
    } else if (!grName.trim()) {
      setNameError("Please enter a valid Group name");
    } else if (grName.length > 30) {
      setNameError("Maximum character length is 30");
    } else {
      setNameError(null);
      setGroupName(e.target.value);
    }
  };
  // image style //
  const StyledProductImg = styled("img")({
    top: 0,
    width: "100%",
    height: "200px",
    objectFit: "fill",
    position: "absolute",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (GroupName.trim().length === 0) {
      setNameError("Group name is required");
      groupNameRef.current.focus();
    }
    if (fileError?.length > 0) {
      return;
    } else {
      if (fileLength === 0) {
        setFileError("Group image is required");
      }
    }
    if (NameError !== null || fileError != null) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("GroupName", GroupName);
    formData.append("GroupType", 0);

    createGrp(formData)
      .then((response) => {
        if (response.data.errors) {
          ToasterSuccessGlobal("This group already exist", 46, ["error"]);
        } else {
          ToasterSuccessGlobal("Group Created Successfully", 47, ["success"]);
          listGroups();
          handleClose();
        }
      })
      .catch((error) => {
        if (error.response.data.Message) {
          ToasterSuccessGlobal("This Group already exist!", 48, ["error"]);
        }
      });
  };

  const listGroups = () => {
    listGrp().then((response) => {
      setData(response.data);
    });
  };
  const deleteUser = (id) => {
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
        deleteGrp(id).then((responses) => {
          ToasterSuccessGlobal("Group deleted successfully", 16, ["success"]);
          listGroups();
        });
      }
    });
  };
  // gt id for list group members //
  function getId(id) {
    sessionStorage.setItem("Gid", id);
  }
  function handleEditOpen(id) {
    sessionStorage.setItem("id", id);
    getGrp(id).then((response) => {
      const editData = response.data;
      setEditPatchValue(editData);
      setEditOpen(true);
      editUser.GroupName=response.data.GroupName;
    });
  }
  const handleEditClose = () => {
    setEditOpen(false);
    setGrNameError(null);
  };

  const onEditChange = (e) => {
    e.preventDefault();
    const grName = e.target.value;
    if (grName.length > 30) {
      setGrNameError("Maximum character length is 30");
    } else if (grName.trim().length === 0) {
      setGrNameError("Group name is required");
    } else if (!grName.trim()) {
      setGrNameError("Please enter a valid Group name");
    } else {
      setGrNameError(null);
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };

  const EditSubmit = (e) => {
    e.preventDefault();
    const id = sessionStorage.getItem("id");
    if (grNameError != null) {
      groupNameEditRf.current.focus();
      return;
    }
    EditGrpName(id, editUser)
      .then((response) => {
        ToasterSuccessGlobal("Group Name Edited successfully!", 49, [
          "success",
        ]);

        listGroups();
        handleEditClose();
      })
      .catch((error) => {
        ToasterSuccessGlobal("This Group Already exist!", 1232, ["error"]);
      });
  };
  // edit group profile //
  function handleUpdatePicOpen(id) {
    setEditPicId(id);
    setUpdatePicOpen(true);
  }
  const handleUpdatePicClose = () => {
    setUpdatePicOpen(false);
    setFileError(null);
    setFileLength(0);
    setFile("");
  };

  function changePic(e) {
    if (fileError?.length > 0) {
      return;
    } else {
      if (fileLength === 0) {
        setFileError("This field is required");
        fileEditTypeRef.current.focus();
      }
      if (fileError != null || NameError != null)
        if (NameError != null) {
          return;
        }
      const formData = new FormData();
      formData.append("image", file);

      editGrpImage(editPicId, formData).then((response) => {
        ToasterSuccessGlobal("Group Image Changed!", 45, ["success"]);

        handleUpdatePicClose();
        listGroups();
      });
    }
  }
  return (
    <>
      <Helmet>
        <title>Admin | Groups</title>
      </Helmet>
      <Container
        sx={{ marginLeft: "-7.8%", marginBottom: "100px", marginTop: "70px" }}
      >
        <Stack
          data-testid="group-page"
          direction="row"
          spacing={1}
          alignItems="center"
          mt={-5}
          mb={5}
          justifyContent="end"
        >
          <Button
            data-testID="NewGrpModalOpen_btn"
            className={GroupsStyles.btn_group}
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Group
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {data.length > 0 ? (
            data.map((value) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={value._id}>
                  <Card style={{ height: "360px" }}>
                    {/* <Tooltip title="View group details" placement="top-start"> */}
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/dashboard/Groups/groupMember"
                      onClick={() => getId(value._id)}
                      title="View group details"
                    >
                      <Box
                        sx={{
                          pt: "220px",
                          position: "relative",
                          cursor: "pointer",
                        }}
                      >
                        <StyledProductImg
                          src={value.GroupImage}
                          alt="Group Icon"
                          className={GroupsStyles.groupImageHover}
                        />
                      </Box>
                    </Link>
                    {/* </Tooltip> */}
                    <CardContent
                      direction="row"
                      title="Edit name"
                      sx={{ width: "100%", height: "90px" }}
                    >
                      {/* <Tooltip title="Edit name" placement="top-start"> */}
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        data-testId="NmodalOpen_btn"
                        onClick={() => handleEditOpen(value._id)}
                        style={{ overflowWrap: "anywhere" }}
                      >
                        {value.GroupName}
                      </Typography>
                      {/* </Tooltip> */}
                    </CardContent>
                    <Stack direction="row" title="Delete" justifyContent="end">
                      {/* <Tooltip title="Delete"> */}
                      <IconButton
                        data-testId="delete_btn"
                        onClick={() => deleteUser(value._id)}
                        color="error"
                        className={GroupsStyles.groupDeleteIcon}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {/* </Tooltip> */}
                      {/* <Tooltip title="change group icon"> */}
                      <IconButton
                        data-testId="ImodalOpen_btn"
                        onClick={() => handleUpdatePicOpen(value._id)}
                        title="Change group icon"
                      >
                        <WallpaperIcon className={GroupsStyles.groupEditIcon} />
                      </IconButton>
                      {/* </Tooltip> */}
                    </Stack>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <img
              src="/favicon/logo_comittee.png"
              className={GroupsStyles.employeePageLoading}
              alt="committee_logo"
              width="300"
              height="300"
            />
          )}
        </Grid>
      </Container>
      {/* Add Group Modal======================================================= */}
      <Modal
        open={openAddGroup}
        onClose={handleClose}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event);
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            data-testId="NewGrpModalClose_btn"
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "78%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon className={GroupsStyles.addGroupCloseIcon} />
          </span>
          <form id="regForm">
            <h5>Add Group</h5>
            <FormControl sx={{ m: 2, width: "93%" }}>
              <TextField
                ref={groupNameRef}
                sx={{ height: "20%" }}
                type="text"
                inputProps={{ "data-testid": "addGroup-name" }}
                autoComplete="off"
                size="medium"
                id="exampleFormControlInput1"
                name="GroupName"
                onChange={(e) => onInputNameChange(e)}
                label="Group name"
              />
            </FormControl>
            {NameError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  textAlign: "left",
                  marginLeft: "20px",
                }}
              >
                {NameError}
              </p>
            ) : (
              ""
            )}
            <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
              <TextField
                type="file"
                accept="image/png,image/jpg,image/jpeg "
                sx={{ height: "20%" }}
                autoComplete="off"
                size="medium"
                inputProps={{ "data-testid": "addGroup-profile" }}
                id="exampleFormControlInput1"
                name="GroupImage"
                onChange={(e) => onInputFIleChange(e)}
                label="Group Image"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            {fileError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  textAlign: "left",
                  marginLeft: "20px",
                }}
              >
                {fileError}
              </p>
            ) : (
              ""
            )}
            <div>
              <Button
                sx={{ m: 2, width: "17%", height: 35, marginLeft: "80%" }}
                type="submit"
                className={GroupsStyles.submitGroupButton}
                variant="contained"
                size="small"
                style={{ backgroundColor: "#144399" }}
                data-testId="newGrp-Btn"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            EditSubmit(event);
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            data-testId="NmodalClose_btn"
            onClick={handleEditClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "78%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon className={GroupsStyles.addGroupCloseIcon} />
          </span>
          <form id="regForm">
            <h5>Edit Group Name</h5>
            <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
              <TextField
                ref={groupNameEditRf}
                type="text"
                sx={{ height: "20%" }}
                autoComplete="off"
                size="medium"
                id="exampleFormControlInput1"
                defaultValue={EditPatchValue.GroupName}
                inputProps={{ "data-testid": "edit-grname-change" }}
                name="GroupName"
                data-testId="edit-grpName"
                onChange={(e) => onEditChange(e)}
                label="GroupName"
              />
            </FormControl>
            {grNameError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  textAlign: "left",
                  marginLeft: "20px",
                }}
              >
                {grNameError}
              </p>
            ) : (
              ""
            )}
            <div>
              <Button
                sx={{ m: 2, width: "17%", height: 35, marginLeft: "80%" }}
                type="submit"
                className={GroupsStyles.submitGroupButton}
                variant="contained"
                size="small"
                data-testId="nameEdit-btn"
                style={{ backgroundColor: "#144399" }}
                onClick={EditSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={updatePicOpen}
        onClose={handleUpdatePicClose}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            changePic(event);
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            data-testId="ImodalClose_btn"
            onClick={handleUpdatePicClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "78%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon className={GroupsStyles.addGroupCloseIcon} />
          </span>
          <form id="regForm">
            <h5>Change Group Icon</h5>
            <div>
              <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
                <TextField
                  ref={fileEditTypeRef}
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  sx={{ height: "20%" }}
                  autoComplete="off"
                  size="medium"
                  id="exampleFormControlInput1"
                  name="GroupImage"
                  inputProps={{ "data-testid": "img-upload-field-change" }}
                  data-testId="img-upload-field"
                  onChange={(e) => onInputFIleChange(e)}
                  label="Group Image"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              {fileError != null ? (
                <p
                  style={{
                    color: "red",
                    marginTop: "-6px",
                    marginBottom: "-6px",
                    textAlign: "left",
                    marginLeft: "20px",
                  }}
                >
                  {fileError}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <Button
                sx={{ m: 2, width: "17%", height: 35, marginLeft: "80%" }}
                type="button"
                variant="contained"
                className={GroupsStyles.submitGroupButton}
                size="small"
                style={{ backgroundColor: "#144399" }}
                data-testId="img-submit-btn"
                onClick={(e) => changePic(e)}
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
