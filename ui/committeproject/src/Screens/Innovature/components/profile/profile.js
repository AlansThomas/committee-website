import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Button, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { FaTags } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { toast } from "react-toastify";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import GotoTop from "../../../../components/scroll-to-top/GotoTop";
import MyPosts from "../myPosts/myPosts";
import profileStyles from "./profile.module.css";

function validatePassword(password) {
  switch (true) {
    case password === "":
      return "Please enter a password";
    case password.length < 8:
      return "Password minimum length is 8";
    case password.length > 16:
      return "Password maximum length is 16";
    default:
      return null;
  }
}

export default function Profile({ re }) {
  const profile = JSON.parse(localStorage.getItem("Profile"));
  const id = profile.data._id;
  const [open, setOpen] = useState(false);
  const [passErr, setPassError] = useState(null);
  const [newPassErr, setNewPassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);
  const [data, setData] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [Username, setUsername] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  const [tag, setTagged] = useState([]);
  const [myPrivatePost, setMyPrivatePost] = useState([]);
  const [posts1, setPosts1] = useState(true);
  const postsToShow = posts1 ? myPosts : tag;
  const postsToReload = posts1 ? posts : tagged;
  const [myPrivatePostCondition, setMyPrivatePostCondition] = useState(false);
  const [scrollContition, setScrollContition] = useState(false);
  const [openEyeClick, setopenEyeClick] = useState(false);
  const [openEyeNewPass, setopenEyeNewPass] = useState(false);
  const [openEyeNewConPass, setopenEyeNewConPass] = useState(false);

  // const [eyes, setScrollPosition] = useState(0);
  const init = useRef();

  const showToast = (type, message, toastId) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastId: toastId,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPassError(null);
    setNewPassError(null);
    setConfirmPassError(null);
    setChangePass({
      Email: "",
      oldpassword: "",
      Password: "",
    });
  };

  const [changePss, setChangePass] = useState({
    Email: "",
    oldpassword: "",
    Password: "",
  });
  init.current = changePss;

  const openeye = () => {
    setopenEyeClick(!openEyeClick);
  };
  const openeyenewpass = () => {
    setopenEyeNewPass(!openEyeNewPass);
  };
  const openeyenewconpass = () => {
    setopenEyeNewConPass(!openEyeNewConPass);
  };

  const handleOldPasswordChange = (value) => {
    if (value === "") {
      setPassError("please enter old password");
    } else {
      setPassError(null);
      setChangePass({ ...changePss, oldpassword: value });
    }
  };

  const handlePasswordChange = (value) => {
    const passwordError = validatePassword(value);
    if (passwordError) {
      setNewPassError(passwordError);
    } else {
      setNewPassError(null);
      setChangePass({ ...changePss, Password: value });
    }
  };

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChangePass({ ...changePss, [name]: value });

    switch (name) {
      case "oldpassword":
        handleOldPasswordChange(value);
        break;
      case "Password":
        handlePasswordChange(value);
        break;
      default:
        break;
    }
  };

  const ConfirmPasswordChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setConfirmPassError("please enter password");
    } else {
      setConfirmPassError(null);
      setConfirmPass(e.target.value);
    }
  };
  const [refreshcount, setRefreshcount] = useState(0);

  const profileImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;
    const fileType = file.type;
    const fileName = file.name;

    let error = null;
    switch (true) {
      case !["image/jpg", "image/jpeg", "image/png"].includes(fileType):
        error = "Files only support jpg,jpeg,png format only";
        break;
      case fileSize >= 5:
        error = "Image size must be less than 5 MB";
        break;
      case fileName.length >= 100:
        error = "file name length should less than 100";
        break;
      default:
        const formData = new FormData();
        formData.append("image", file);

        axiosPrivate
          .put(api.PUT_UPDATE_PROFILE_PIC + id, formData)
          .then(() => {
            reload();
            postsToReload();
            setRefreshcount(refreshcount + 1);
            re(refreshcount + 1);
            showToast("success", "profile pic updated", 100);
          })
          .catch(() => {
            showToast("error", "Oops Something went wrong", 102);
          });
        return;
    }

    showToast("error", error, 101);
  };

  let flag = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (true) {
      case changePss.oldpassword.trim().length === 0:
        setPassError("please enter old password");
        flag = 1;
        break;
      case changePss.Password.trim().length === 0:
        setNewPassError("please enter new password");
        flag = 1;
        break;
      case changePss.Password.trim().length < 8:
        setNewPassError("Password minimum length is 8");
        flag = 1;
        break;
      case changePss.Password.trim().length > 16:
        setNewPassError("Password maximum length is 16");
        flag = 1;
        break;
      case confirmPass.trim().length === 0:
        setConfirmPassError("Confirm your new password");
        flag = 1;
        break;
      case changePss.Password !== confirmPass:
        setConfirmPassError("Passwords do not match");
        flag = 1;
        break;
      case flag === 1:
        return "error";
      default:
        changePss.Email = localStorage.getItem("LoggedInEmail");
        axiosPrivate
          .post(api.POST_CHANGE_PASSWORD, changePss)
          .then((response) => {
            showToast("success", "Your password has been Updated!", 106);
            handleClose();
          })
          .catch((error) => {
            showToast("error", error?.response?.data?.errMsg, 105);
          });
        break;
    }
  };

  useEffect(() => {
    posts();
    reload();
  }, []);

  const reload = async () => {
    await axiosPrivate.get(api.GET_CURRENT_USER_DETAILS).then((response) => {
      setData(response.data);
      setUsername(response.data.UserName);
    });
  };

  let updateflag = 0;
  const usernameLength = (event) => {
    let username = event.target.value;
    let nameCheck = new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/).test(username);
    let message = "";
    switch (true) {
      case username.length > 35:
        message = "Please enter a name between 1 and 35!";
        updateflag = 1;
        break;
      case username === "":
        message = "Name required!";
        updateflag = 1;
        setUsername("");
        break;
      case !nameCheck:
        message = "Enter valid Name!";
        updateflag = 1;
        break;
      default:
        setUsername(username);
        break;
    }
    if (message) {
      showToast("error", message, 109);
    }
  };

  const updateUserDetails = (e) => {
    e.preventDefault();
    let usName = e.target.value;
    if (usName.length < 36) {
      updateflag = 0;
    }
    setIsDisabled(true);
    if (updateflag == 1) {
      reload();
    } else {
      let UserName = { UserName: usName };
      axiosPrivate
        .put(api.PUT_UPDATE_USER + id, UserName)
        .then((response) => {
          reload();
          setRefreshcount(refreshcount + 1);
          re(refreshcount + 1);
          postsToReload();
        })
        .catch((error) => {
          reload();
        });
    }
  };

  function InputEnabled() {
    setIsDisabled(false);
  }

  function posts() {
    setMyPrivatePostCondition(false);

    setPosts1(true);
    axiosPrivate.get(api.GET_POST_CURRENT_USER).then((res) => {
      setMyPosts(res?.data);
    });
  }

  function tagged() {
    setMyPrivatePostCondition(false);

    setPosts1(false);
    axiosPrivate.get(api.Get_POST_TAGGED).then((res) => {
      setTagged(res?.data);
    });
  }
  function privatePost() {
    setMyPrivatePostCondition(true);
    axiosPrivate.get(api.GET_POST_NOT_PAGINATED_PRIVATE).then((res) => {
      setMyPrivatePost(res?.data);
    });
  }

  const getevent = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      setScrollContition(true);
    }
    if (e.target.scrollTop < 2000) {
      setScrollContition(false);
    } else {
      setScrollContition(true);
    }
  };

  const goToTop = () => {
    const outerDiv = document.querySelector(`.${profileStyles.proWrapper}`);
    outerDiv.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={profileStyles.pro}>
      <div className={profileStyles.proWrapper} onScroll={getevent}>
        <GotoTop scrollPosition={scrollContition} goToTop={goToTop} />
        <div className={profileStyles.profile}>
          <div className={profileStyles.coverImage}>
            <img
              src="https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/admin-default-cover.jpg"
              alt="cover"
            />
          </div>
          <div className={profileStyles.settings}>
            <div className={profileStyles.posts}>
              <Button
                variant="outlined"
                className={profileStyles.button}
                startIcon={<IoMdPhotos />}
                onClick={posts}
              >
                Posts
              </Button>
            </div>
            <div className={profileStyles.tagged}>
              <Button
                variant="outlined"
                className={profileStyles.button}
                startIcon={<FaTags />}
                onClick={tagged}
              >
                {" "}
                Tagged Posts
              </Button>
            </div>
            <div className={profileStyles.tagged}>
              <Button
                variant="outlined"
                className={profileStyles.button}
                startIcon={<FaTags />}
                onClick={privatePost}
              >
                {" "}
                Private
              </Button>
            </div>
          </div>
          <div className={profileStyles.profileDetails}>
            <div className={profileStyles.pic}>
              <Avatar
                src={data?.UserImage}
                style={{ width: "140px", height: "140px" }}
                alt={data?.UserName}
              />
              <Tooltip title="Upload new profile picture" placement="right">
                <div className={profileStyles.camera}>
                  <label for="upload">
                    <img src="/assets/camera.png" alt="cameraIcon" />
                  </label>
                  <input
                    type="file"
                    id="upload"
                    accept="image/png, image/jpeg, image/jpg"
                    hidden
                    onChange={(e) => {
                      profileImageChange(e);
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            {data.UserName ? (
              <div className={profileStyles.user}>
                <Tooltip
                  title="Click and edit username"
                  placement="bottom-start"
                >
                  <label className={profileStyles.usernameEdit} htmlFor="name">
                    <img
                      src="/assets/pencil.png"
                      alt="edit"
                      onClick={InputEnabled}
                    />
                  </label>
                </Tooltip>
                <div className={profileStyles.username}>
                  <h3>
                    {" "}
                    <input
                      id="name"
                      type="text"
                      name="username"
                      value={Username}
                      maxLength="36"
                      disabled={isDisabled}
                      onChange={(event) => usernameLength(event)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          updateUserDetails(event);
                        }
                      }}
                      onBlurCapture={(e) => updateUserDetails(e)}
                    />
                  </h3>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={profileStyles.feeds}>
          <div className={profileStyles.about}>
            <card>
              <h3>
                <b>About</b>
              </h3>
              <hr />
              <div className={profileStyles.aboutDetails}>
                <img src="/assets/gmail.png" alt="gmailIcon" />
                <h6>{data?.Email}</h6>
              </div>
              <div className={profileStyles.aboutDetails}>
                <img src="/assets/birthday-cake.png" alt="cake" />
                <h6>{moment(data?.DOB).format("DD/MM/YYYY")}</h6>
              </div>
              <div className={profileStyles.aboutDetails}>
                <img src="/assets/human-resources.png" alt="role" />
                <h6>{data?.Designation}</h6>
              </div>
              <div
                className={profileStyles.aboutDetails}
                onClick={handleOpen}
                style={{ cursor: "pointer" }}
              >
                <Tooltip title="Change password">
                  <img src="/assets/reset-password.png" alt="password" />
                </Tooltip>
                <h6>Change Password</h6>
              </div>
            </card>
          </div>
          {myPrivatePostCondition ? (
            <MyPosts props={myPrivatePost} reload={privatePost} status={true} />
          ) : (
            <MyPosts
              props={postsToShow}
              reload={postsToReload}
              status={posts1}
            />
          )}
        </div>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={profileStyles.modal}>
            <h3>
              Reset Password{" "}
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </h3>
            <div className={profileStyles.modalContent}>
              {openEyeClick ? (
                <div className={profileStyles.openeye} onClick={openeye}></div>
              ) : (
                <div
                  className={profileStyles.openeyeclose}
                  onClick={openeye}
                ></div>
              )}
              <input
                type={openEyeClick ? "text" : "password"}
                placeholder="Enter current password"
                name="oldpassword"
                onBlur={(e) => onInputChange(e)}
                autoComplete="new-password"
              />

              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "left",
                  marginLeft: "3vw",
                }}
              >
                {" "}
                {passErr}
              </div>
              {openEyeNewPass ? (
                <div
                  className={profileStyles.openeye}
                  onClick={openeyenewpass}
                ></div>
              ) : (
                <div
                  className={profileStyles.openeyeclose}
                  onClick={openeyenewpass}
                ></div>
              )}
              <input
                type={openEyeNewPass ? "text" : "password"}
                placeholder="Enter new password"
                name="Password"
                onChange={(e) => onInputChange(e)}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "left",
                  marginLeft: "3vw",
                }}
              >
                {newPassErr}
              </div>
              {openEyeNewConPass ? (
                <div
                  className={profileStyles.openeye}
                  onClick={openeyenewconpass}
                ></div>
              ) : (
                <div
                  className={profileStyles.openeyeclose}
                  onClick={openeyenewconpass}
                ></div>
              )}
              <input
                type={openEyeNewConPass ? "text" : "password"}
                placeholder="confirm new password"
                name="confirmPass"
                onChange={(e) => ConfirmPasswordChange(e)}
              />
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  textAlign: "left",
                  marginLeft: "3vw",
                }}
              >
                {confirmPassError}
              </div>
              <button
                type="submit"
                className={profileStyles.subBtn}
                onClick={(e) => handleSubmit(e)}
              >
                Update
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
