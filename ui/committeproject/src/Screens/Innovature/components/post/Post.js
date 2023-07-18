import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { Avatar, MuiThemeProvider } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublicIcon from "@mui/icons-material/Public";
import SendIcon from "@mui/icons-material/Send";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Popover from "@mui/material/Popover";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS file
import { BiExpand } from "react-icons/bi";
import { BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { IoIosShareAlt } from "react-icons/io";
import { MdDelete, MdReport } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import truncate from "truncate-html";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import Configuration from "../../../../Configuration";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import Dates from "../SharedPage/Dates";
import comment from "./comment.module.css";
import style from "./Post.module.css";
import "./swal.css";
import Carousel from "react-elastic-carousel";
import PostEditor from "./PostEditor";
import CommentComponent from "./CommentComponent";
import EmojiPickerComponent from "./EmojiPickerComponent";

// const pasedValue = localStorage();
// const userIdGlobal = pasedValue.data._id;

const postLikeUrl = api.POST_POST_LIKE;
const likePostUrl = api.POST_LIKE_POST;
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 500,
  height: "96%",
  bgcolor: "background.paper",

  p: 1,
};

function Post({ post, reload, reload1 }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const [UserId, setUserId] = useState();
  const [postUserId, setPostUserId] = useState(post.UserId);

  const [PostedName] = useState(post.PostedUser);
  const postId = post._id;
  const [commentCount, setCommentCount] = useState();
  const [commentData, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [like, setLike] = useState();
  const [isliked, setIsLiked] = useState();
  const [reportHandleOpen, setReportHandleOpen] = useState();
  const [nameErr, setNameerror] = useState("");
  const [Report, setReport] = useState([]);
  const [publicPrivateKey, setPublicPrivateKey] = useState(true);
  const detailed = "../Share/" + post._id + "/postShare";
  const SHARE_URL = Configuration.Api_devUrl;
  const link = SHARE_URL + "dashboardInno/Share/" + post._id + "/postShare";
  const firstThree = Array.isArray(commentData) ? commentData.slice(0, 3) : [];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenForPostEdit, setModalOpenForPostEdit] = useState(false);

  const [showError, setShowError] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const description = post.PostDescription;
  const textRef = useRef(null);
  const textAreaRef = useRef(null);
  const CHARACTER_LIMIT = 1000;
  const MAX_COMMENT_LENGTH = 1014;
  const COMMENT_ERROR_MESSAGE = "Comment is too long";
  const Navigate = useNavigate();
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const isVideoFile = videoFileExtensions.test(post.PostImage);
  const handleOpenEmojiPicker = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl2(null);
  };

  const divRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLines = 5;

  useEffect(() => {
    const calculateLineCount = () => {
      if (divRef.current) {
        const originalMaxHeight = divRef.current.style.maxHeight;
        divRef.current.style.maxHeight = "none";

        const lineHeight = parseInt(
          window
            .getComputedStyle(divRef.current)
            .getPropertyValue("line-height")
        );
        const fullHeight = divRef.current.clientHeight;
        const calculatedLineCount = Math.round(fullHeight / lineHeight);
        setLineCount(calculatedLineCount);

        divRef.current.style.maxHeight = originalMaxHeight;
      }
    };

    calculateLineCount(); // Call the function immediately

    // Call the function again after the content has been rendered (in the next frame)
    requestAnimationFrame(calculateLineCount);

    window.addEventListener("resize", calculateLineCount);

    return () => {
      window.removeEventListener("resize", calculateLineCount);
    };
  }, []);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  function handleReportOpen(ids) {
    setReport("");
    setReportHandleOpen(true);
    handleCloseHoverModal();
    localStorage.setItem("postId", ids);
  }

  const handleClickForMakePublic = makePublic(
    post,
    setAnchorEl,
    reload,
    setModalOpen
  );

  const reloadComment = commentReload(post, setComment);
  const reloadComment2 = () => {
    const url = api.GET_LIST_COMMENT + post._id;
    axiosPrivate
      .get(url)
      .then((res) => {
        setComment(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setLike(post?.LikeCount ?? 0);
    setCommentCount(post?.CommentCount ?? 0);
  }, [post]);

  useEffect(() => {
    setLike(post?.LikeCount || 0);
    setCommentCount(post?.CommentCount || 0);

    if (post.Tags === "1") {
      setPublicPrivateKey(true);
    } else {
      setPublicPrivateKey(false);
    }

    function handleCopy(event) {
      const selection = window.getSelection();
      if (selection.toString() !== "") {
        event.preventDefault();
        const text = selection.toString();
        event.clipboardData.setData("text/plain", text);
      }
    }

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, [post]);

  const showReadMoreButton = lineCount >= maxLines;

  useEffect(() => {
    reloadComment();
    const pasedValue = localStorage();
    setUserId(pasedValue.data._id);
    setPostUserId(post.UserId);
    setIsLiked(post.Like?.includes(pasedValue.data._id));
  }, [post.Like]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      ToasterSuccessGlobal("Link copied to clipboard!", 5435, ["success"]);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleOpen = () => {
    setModalOpen(true);
    textAreaRef.current.focus();
  };
  const handleClose = () => setModalOpen(false);

  const handleOpenEditPost = () => {
    setModalOpenForPostEdit(true);
  };

  const handleCloseEditPost = () => {
    setModalOpenForPostEdit(false);
    reload1();
  };

  const likeHandler = handleLike(UserId, postId, isliked, setLike, setIsLiked);

  const handleReportClose = () => {
    setReport("");
    setNameerror(null);
    setReportHandleOpen(false);
  };

  const handleClickHoverModal = (event) => {
    setPostUserId(post.UserId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHoverModal = () => {
    setAnchorEl(null);
  };

  const postDelete = deletePost(
    setUserId,
    setPostUserId,
    post,
    setAnchorEl,
    reload,
    setModalOpen
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleComment = commentHandler(
    MAX_COMMENT_LENGTH,
    setCommentInput,
    setDisabled,
    showError,
    setShowError,
    COMMENT_ERROR_MESSAGE
  );

  const handleSubmit = submitHander(
    setDisabled,
    commentInput,
    post,
    setCommentCount,
    setCommentInput,
    reloadComment,
    handleClose,
    reload
  );

  const onEditChanges = onChangeEdit(setReport, setNameerror);

  const ReportSubmit = (e) => {
    if (!Report) {
      setNameerror("Feedback is required");
      return;
    }
    if (Report?.length >= 31 || Report?.length <= 3) {
      setNameerror("Please enter the characters between 3 and 30");
      return;
    }
    if (Report?.trim()?.length === 0) {
      setNameerror("Feedback is required");
      return;
    } else {
      setNameerror("");
    }

    if (nameErr !== null) {
      return;
    }

    let data = {
      PostId: post._id,
      Message: Report,
    };
    axiosPrivate
      .post(api.REPORT_POST, data)
      .then((response) => {
        ToasterSuccessGlobal(" Issue reported successfully!", 25, ["success"]);
        handleReportClose();
        setNameerror("");
        setReport("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onEmojiClick = clickEmoji(
    commentInput,
    showError,
    setShowError,
    setDisabled,
    setCommentInput
  );
  const navigateToUser = (id) => {
    Navigate(`../${id}`);
    window.location.reload(); // Reload the page
  };

  let images = null;
  if (Array.isArray(post.PostImage) && post.PostImage.length > 0) {
    images = post.PostImage.map((img) => {
      return videoFileExtensions.test(img) ? (
        <video className={style.pos} controls>
          <source src={img} type="video/ogg" key={img._postId} />
        </video>
      ) : (
        <img className={style.pos} src={img} alt="" key={img._postId} />
      );
    });
  }

  return (
    <div className={style.post}>
      <div className={style.posttopParent}>
        <div className={style.posttop}>
          {post?.userlist?.map((value) => (
            <>
              <Avatar
                onClick={() => navigateToUser(value._id)}
                src={
                  post?.PostedUser === "Recreation Committee"
                    ? "/assets/committee-removed.png"
                    : value.UserImage
                }
                alt={value.UserName}
                className={style.postavatar}
              />
              <div key={post._id} className={style.posttopInfo}>
                <h3>
                  {post?.PostedUser === "Recreation Committee"
                    ? post?.PostedUser
                    : value.UserName}
                </h3>
                <div className={style.Date}>
                  <Dates props={post} />
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={style.deletePost}>
          <Button aria-describedby={id} onClick={handleClickHoverModal}>
            <BsThreeDots color="black" size={20} />
          </Button>
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseHoverModal}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ marginLeft: "-37px" }}
      >
        {UserId === postUserId && PostedName !== "Recreation Committee" ? (
          <>
            <IconButton onClick={postDelete} variant="contained" color="error">
              <MdDelete />
            </IconButton>
            <IconButton onClick={handleOpenEditPost} variant="contained">
              <FiEdit />
            </IconButton>
            <NavLink exact to={detailed}>
              <BiExpand size={25} />
            </NavLink>
            {publicPrivateKey ? (
              <></>
            ) : (
              <IconButton
                onClick={handleClickForMakePublic}
                variant="contained"
                color="primary"
              >
                <PublicIcon />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <NavLink exact to={detailed}>
              <BiExpand size={25} />
            </NavLink>
          </>
        )}
        {UserId !== postUserId && PostedName !== "Recreation Committee" && (
          <IconButton
            onClick={() => handleReportOpen(post?._id)}
            variant="contained"
            color="error"
          >
            <MdReport />
          </IconButton>
        )}
      </Popover>

      <Modal open={reportHandleOpen} onClose={handleReportClose}>
        <Box
          sx={{
            borderRadius: "20px",
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            onClick={handleReportClose}
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
            <CloseIcon />
          </span>
          <div className={style.headText}>Report</div>
          <form id="">
            <FormControl fullwidth sx={{ m: 2 }}>
              <textarea
                rows="4"
                cols="39"
                placeholder="Feedback"
                style={{ border: "solid", overflow: "auto", resize: "none" }}
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
                name="Report"
                label="Feedback"
                onChange={(e) => onEditChanges(e)}
              />
            </FormControl>
            {nameErr != null ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "20px",
                  marginTop: "-7px",
                  fontSize: "12px",
                }}
              >
                {nameErr}
              </p>
            ) : (
              ""
            )}
            <Button
              sx={{ m: 2, width: "17%", height: 35, marginLeft: "75%" }}
              type="button"
              variant="contained"
              size="small"
              style={{ backgroundColor: "#144399" }}
              onClick={(e) => ReportSubmit(e)}
            >
              Feedback
            </Button>
          </form>
        </Box>
      </Modal>

      <div className={style.postbottom}>
        <div className={style.descriptiontext}>
          <div
            ref={divRef}
            style={{
              maxHeight: isTruncated ? `${maxLines * 1.2}em` : "none",
              overflow: "hidden",
            }}
          >
            <>
              <div
                ref={textRef}
                className={style.descriptiontext}
                dangerouslySetInnerHTML={{
                  __html: post.PostDescription,
                }}
              ></div>
            </>
          </div>
          {showReadMoreButton && (
            <p onClick={toggleTruncate} className={style.seeMore}>
              {isTruncated ? "See more..." : "See less..."}
            </p>
          )}
        </div>
      </div>
      <div className={style.postimage}>
        {isVideoFile && post?.PostImage?.length === 1 && (
          <video className={style.pos} controls>
            <source src={post.PostImage} type="video/ogg" />
          </video>
        )}
      </div>
      {post?.PostImage?.length > 1 ? (
        <div className={style.postimage}>
          <div>
            <Carousel renderArrow={() => <></>}>{images}</Carousel>
          </div>
        </div>
      ) : (
        <img className={style.pos} src={post?.PostImage} alt="" />
      )}
      <div className={style.postoptions}>
        <div className={style.postoption}>
          {isliked ? (
            <>
              <FcLike
                style={{ cursor: "grab" }}
                onClick={likeHandler}
                size={23}
              />
            </>
          ) : (
            <>
              <FavoriteBorderIcon
                onClick={likeHandler}
                sx={{ cursor: "grab", color: "gray" }}
              />
            </>
          )}

          <div className={style.likeButton}>{like === 0 ? "" : like}</div>
        </div>

        <div className={style.postoption}>
          <ChatBubbleOutlineIcon
            onClick={handleOpen}
            sx={{ cursor: "grab", color: "Gray" }}
          />

          <div className={style.likeButton}>
            {commentCount === 0 ? "" : commentData.length}
          </div>
        </div>

        <div
          style={{ cursor: "grab" }}
          className={style.postoption}
        >
          <IoIosShareAlt
            onClick={copyLink}
            size={27}
            style={{ color: "black" }}
          />
        </div>
      </div>
      <div>
        {(() => {
          switch (commentCount) {
            case 0:
              return null;
            case 1:
              return (
                <p onClick={handleOpen} className={comment.viewall}>
                  {" "}
                  View {commentCount} comment
                </p>
              );
            case 2:
              return (
                <p onClick={handleOpen} className={comment.viewall}>
                  {" "}
                  View {commentCount} comments
                </p>
              );
            case 3:
              return (
                <p onClick={handleOpen} className={comment.viewall}>
                  View {commentCount} comments
                </p>
              );
            default:
              return (
                <p onClick={handleOpen} className={comment.viewall}>
                  {" "}
                  View all {commentCount} comments...
                </p>
              );
          }
        })()}
      </div>
      <div className={style.topComments}>
        {firstThree?.map((value) => (
          <div key={value._id} className={comment.top}>
            <div className={comment.topUser}>
              {value?.userslist?.map((valueC) => (
                <>
                  <div>
                    <Avatar
                      src={valueC?.UserImage}
                      alt={valueC?.UserName}
                      style={{ width: "25px", height: "25px" }}
                    ></Avatar>
                  </div>
                  <div key={post._id} className={comment.posttopInfo}>
                    <p>{valueC?.UserName}</p>
                  </div>
                  <div className={comment.topDate}>
                    <Dates props={value} />
                  </div>
                </>
              ))}
            </div>
            <pre
              className={comment.topComment}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {value?.Comment && value?.Comment.length > 100
                ? value?.Comment.slice(0, 100)
                : value?.Comment}
              {value?.Comment && value?.Comment.length > 100 && (
                <>
                  {" "}
                  <i
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={handleOpen}
                  >
                    ...more
                  </i>{" "}
                </>
              )}
            </pre>
          </div>
        ))}
      </div>
      <div>
        <PostEditor
      
          publicPrivateKey={publicPrivateKey}
          postImageForEdit={post.PostImage}
          postIdForEdit={postId}
          PostDescription={description}
          modalOpenForPostEdit={modalOpenForPostEdit}
          handleCloseEditPost={handleCloseEditPost}
        />
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            <div className={comment.scroll}>
              <div className={style.posttopParent}>
                <div className={style.posttop}>
                  {post?.userlist?.map((value) => (
                    <>
                      <Avatar
                        src={
                          post?.PostedUser === "Recreation Committee"
                            ? "/assets/committee-removed.png"
                            : value.UserImage
                        }
                        alt={value.UserName}
                        className={style.postavatar}
                      />
                      <div key={post._id} className={style.posttopInfo}>
                        <h3>
                          {post?.PostedUser === "Recreation Committee"
                            ? post?.PostedUser
                            : value.UserName}
                        </h3>
                        <div className={style.Date}>
                          <Dates props={post} />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className={style.deletePost}>
                  <>
                    <Button
                      aria-describedby={id}
                      onClick={handleClickHoverModal}
                    >
                      <BsThreeDots color="black" size={20} />
                    </Button>
                  </>
                </div>
              </div>
              <div></div>
              <div className={style.postbottom}>
                <div
                  className={style.descriptiontext}
                  dangerouslySetInnerHTML={{ __html: post.PostDescription }}
                ></div>
              </div>
              <div className={style.postimage}>
                {isVideoFile && post?.PostImage?.length === 1 && (
                  <video className={style.pos} controls>
                    <source src={post.PostImage} type="video/ogg" />
                  </video>
                )}
              </div>
              {post?.PostImage?.length > 1 ? (
                <div className={style.postimage}>
                  <div>
                    <Carousel renderArrow={() => <></>}>{images}</Carousel>
                  </div>
                </div>
              ) : (
                <img className={style.pos} src={post?.PostImage} alt="" />
              )}
              <div className={style.postoptions}>
                <div className={style.postoption}>
                  {isliked ? (
                    <FcLike onClick={likeHandler} size={23} />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={likeHandler}
                      sx={{ color: "gray" }}
                    />
                  )}
                  <div className={style.likeButton}>
                    {like === 0 ? "" : like}
                  </div>
                </div>
                <div className={style.postoption}>
                  <IoIosShareAlt
                    onClick={copyLink}
                    size={25}
                    sx={{ color: "blue" }}
                  />
                </div>
              </div>
              {commentSenderFunction(
                textAreaRef,
                CHARACTER_LIMIT,
                commentInput,
                handleComment,
                handleOpenEmojiPicker,
                anchorEl2,
                handleCloseEmojiPicker,
                onEmojiClick,
                handleSubmit,
                disabled
              )}
              {Array.isArray(commentData) &&
                commentData.map((value) => (
                  <>
                    <CommentComponent
                      key={value?._id}
                      value={value}
                      id={id}
                      postId={postId}
                      reloadComment={reloadComment2}
                    />
                  </>
                ))}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Post;

function commentSenderFunction(
  textAreaRef,
  CHARACTER_LIMIT,
  commentInput,
  handleComment,
  handleOpenEmojiPicker,
  anchorEl2,
  handleCloseEmojiPicker,
  onEmojiClick,
  handleSubmit,
  disabled
) {
  return (
    <div className={comment.sendComment}>
      <MuiThemeProvider>
        <TextField
          ref={textAreaRef}
          style={{
            marginLeft: 11,
            width: "92%",
            borderRadius: "14px",
          }}
          inputProps={{
            maxlength: CHARACTER_LIMIT,
          }}
          multiline
          InputProps={{
            inputComponent: TextareaAutosize,
            rows: 1,
          }}
          variant="outlined"
          placeholder="Write comments......."
          helperText={`${commentInput.length}/${CHARACTER_LIMIT}`}
          value={commentInput}
          onChange={handleComment}
        />
      </MuiThemeProvider>
      <EmojiPickerComponent onEmojiClickPass={onEmojiClick} />
      <IconButton
        aria-label="delete"
        size="small"
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={disabled}
      >
        <SendIcon fontSize="small" style={{ marginTop: "10px" }} />
      </IconButton>
    </div>
  );
}

function commentReload(post, setComment) {
  return () => {
    const url = api.GET_LIST_COMMENT + post._id;
    axiosPrivate
      .get(url)
      .then((res) => {
        setComment(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

function commentHandler(
  MAX_COMMENT_LENGTH,
  setCommentInput,
  setDisabled,
  showError,
  setShowError,
  COMMENT_ERROR_MESSAGE
) {
  return (event) => {
    const inputLength = event.target.value?.length;
    if (inputLength < MAX_COMMENT_LENGTH) {
      setCommentInput(event.target.value);
    }
    if (inputLength === 0) {
      setDisabled(true);
      setCommentInput("");
    } else if (inputLength > MAX_COMMENT_LENGTH) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
        ToasterSuccessGlobal(COMMENT_ERROR_MESSAGE, 40967, ["error"]);
      }
      setDisabled(true);
    } else {
      setCommentInput(event.target.value);
      setDisabled(false);
    }
  };
}

function submitHander(
  setDisabled,
  commentInput,
  post,
  setCommentCount,
  setCommentInput,
  reloadComment,
  handleClose,
  reload
) {
  return async (event) => {
    event.preventDefault();
    setDisabled(true);

    if (!commentInput || commentInput.trim().length === 0) {
      ToasterSuccessGlobal("Comment cannot be blank", 4325, ["error"]);
      setDisabled(false);
      return;
    }

    if (commentInput.length > 1000) {
      ToasterSuccessGlobal("Comment is too large", 64545, ["error"]);
      setDisabled(false);
      return;
    }

    try {
      const { _id } = post;
      const url = api.POST_ADD_COMMENT;
      const formData = { PostId: _id, Comment: commentInput };
      await axiosPrivate.post(url, formData);
      setCommentCount((prevCount) => prevCount + 1);
      setCommentInput("");
      reloadComment();
      ToasterSuccessGlobal("Comment posted successfully", 375490, ["success"]);
    } catch (error) {
      if (error.response && error.response.data) {
        const { errorCode } = error.response.data;
        if (errorCode === 804) {
          ToasterSuccessGlobal("The post does not exist", 3754, ["error"]);
        }
      }
      ToasterSuccessGlobal("Commenting failed!", 3754, ["error"]);
      handleClose();
      reload();
    }

    setDisabled(false);
  };
}

function onChangeEdit(setReport, setNameerror) {
  return (e) => {
    e.preventDefault();

    const report = e.target.value.trim();
    setReport(report);

    if (!report) {
      setNameerror("Feedback is required");
    } else if (report.length < 3 || report.length > 30) {
      setNameerror("Please enter between 3 and 30 characters");
    } else {
      setNameerror(null);
    }
  };
}

function clickEmoji(
  commentInput,
  showError,
  setShowError,
  setDisabled,
  setCommentInput
) {
  return (emoji) => {
    const inputLength = commentInput.length + emoji.length;

    if (inputLength > 1000) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
        ToasterSuccessGlobal("Comment is too long", 40967);
      }
      setDisabled(true);
      return;
    }

    setCommentInput(commentInput + emoji);
    setDisabled(false);
  };
}

function makePublic(post, setAnchorEl, reload, setModalOpen) {
  return () => {
    const url = api.POST_PRIVATE_TO_PUBLIC + post._id;
    confirmAlert({
      title: "Confirm publish to private",
      message: "Are you sure you want to make this post public?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setAnchorEl(null);
            try {
              await axiosPrivate.put(url);
              ToasterSuccessGlobal("Post made public successfully", 12, [
                "success",
              ]);
              setAnchorEl(null);
              reload(post._id);
              setModalOpen(false);
              setAnchorEl(null);
            } catch (err) {
              reload();
              ToasterSuccessGlobal("Oops! Something went wrong", 12, ["error"]);
              console.error("Error: " + err);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            setAnchorEl(null);
          },
        },
      ],
    });
  };
}

function handleLike(UserId, postId, isLiked, setLike, setIsLiked) {
  return () => {
    const formData = { UserId, PostId: postId };
    const url = isLiked ? likePostUrl : postLikeUrl;

    axiosPrivate
      .post(url, formData)
      .then(() => {
        setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

function deletePost(
  setUserId,
  setPostUserId,
  post,
  setAnchorEl,
  reload,
  setModalOpen
) {
  const confirmDeletion = () => {
    const pasedValue = localStorage();
    setUserId(pasedValue.data._id);
    setPostUserId(post.UserId);
    const url = api.DELETE_POST + post._id;

    let formData = { UserId: pasedValue.data._id };

    axiosPrivate
      .delete(url, { data: formData })
      .then((res) => {
        ToasterSuccessGlobal("Post Deleted Successfully", 984, ["error"]);
        setAnchorEl(null);
        reload(post._id);
        setModalOpen(false);
        setAnchorEl(null);
      })
      .catch((err) => {
        reload();
        ToasterSuccessGlobal("Oops!something went wrong", 12, ["error"]);
      });
  };

  return () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: confirmDeletion,
        },
        {
          label: "No",
          onClick: () => {
            setAnchorEl(null);
          },
        },
      ],
    });
  };
}

function localStorage() {
  const storedValue = window.localStorage.getItem("Profile");
  return JSON.parse(storedValue);
}
