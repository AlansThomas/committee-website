import React, { useEffect, useState } from "react";
import { Avatar, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { FcLike } from "react-icons/fc";
import { IoIosArrowBack, IoIosShareAlt } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import Configuration from "../../../../Configuration";
import comment from "../SharedPage/comment.module.css";
import Dates from "../SharedPage/Dates";
import ShareStyle from "../SharedPage/Post.module.css";
import Carousel from "react-elastic-carousel";

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

const NotificatifiedPost = () => {
  const [commentCount, setCommentCount] = useState("");
  const [commentData, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [post, setPost] = useState([]);
  let { variable } = useParams();
  const [UserId, setUserId] = useState();
  const [disabled, setDisabled] = useState(true);
  const [like, setLike] = useState(post.LikeCount);
  const [isliked, setIsLiked] = useState(false);
  const notify = useSelector((state) => state.notifications);
  const navigate = useNavigate();
  const SHARE_URL = Configuration.Api_devUrl;
  const [isVideoFile, setIsVideoFile] = useState(null);
  const [imageFromPost, setImageFromPost] = useState(null);
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const reloadPost = () => {
    const url = api.GET_SINGLE_POST + variable;
    axiosPrivate
      .get(url)
      .then((res) => {
        setPost(res.data);
        setIsVideoFile(videoFileExtensions.test(res.data[0].PostImage));
        setImageFromPost(res.data[0].PostImage);
        const storedValue = window.localStorage.getItem("Profile");
        const pasedValue = JSON.parse(storedValue);
        setUserId(pasedValue.data._id);
        let index = res.data[0].Like.includes(pasedValue.data._id);
        setIsLiked(index);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.info("This post is no longer available", {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }, 1000);
      });
  };

  useEffect(() => {
    reloadPost();
    reloadComment();
  }, [notify]);

  const reloadComment = () => {
    const url = api.GET_SINGLE_POST_WITH_COMMENTS + variable;
    axiosPrivate.get(url).then((res) => {
      setComment(res?.data);
    });
  };
  const link = SHARE_URL + "dashboardInno/Share/" + variable + "/postShare";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 43,
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const likeHandler = () => {
    const url = isliked ? api.POST_LIKE_POST : api.POST_POST_LIKE;
    const formData = { UserId: UserId, PostId: variable };

    axiosPrivate
      .post(url, formData)
      .then((response) => {
        reloadPost();
        setLike(isliked ? like - 1 : like + 1);
        setIsLiked(!isliked);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    reloadComment();
    reloadPost();

    if (post.LikeCount == null) {
      setLike(0);
      return;
    }
    if (post.CommentCount == null) {
      setCommentCount(0);
      return;
    }
    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setUserId(pasedValue.data._id);
  }, []);

  const [showError, setShowError] = useState(false);
  const handleComment = (event) => {
    const inputLength = event.target.value.length;
    if (inputLength === 0) {
      setDisabled(true);
      setCommentInput("");
    } else if (inputLength > 1000) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
        toast.error("Comment is too long", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 44,
        });
      }
      setDisabled(true);
    } else {
      setCommentInput(event.target.value);
      setDisabled(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = api.POST_ADD_COMMENT;
    let formData = { PostId: variable, Comment: commentInput };

    axiosPrivate
      .post(url, formData)
      .then((res) => {
        setCommentCount(commentCount + 1);
        setCommentInput("");
        setDisabled(true);
        toast.success("Comment posted successfully", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 45,
        });
        reloadComment();
        reloadPost();
      })
      .catch((err) => {
        toast.error("comment failed!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 46,
        });
      });
  };

  const theme = createMuiTheme({
    props: {
      MuiTextField: {
        variant: "outlined",
      },
    },
  });
  const feedRedir = () => {
    navigate(-1);
  };

  let images = null;
  if (Array.isArray(imageFromPost) && imageFromPost.length > 1) {
    images = imageFromPost.map((img) => {
      return videoFileExtensions.test(img) ? (
        <video className={ShareStyle.pos} controls>
          <source src={img} type="video/ogg" key={img._postId} />
        </video>
      ) : (
        <img
          className={ShareStyle.pos}
          src={img}
          alt=""
          key={img._postId}
        />
      );
    });
  }

  return (
    <div className={ShareStyle.screen}>
      {post.map((value) => (
        <div key={value._id} className={ShareStyle.post}>
          <div className={comment.scroll}>
            <div className={ShareStyle.posttopParent}>
              <div className={ShareStyle.posttop}>
                {/* <NavLink to="feed"> */}
                <IoIosArrowBack onClick={feedRedir} size={23} />

                {/* </NavLink> */}
                {value?.userslist?.map((valueC) => (
                  <>
                    <Avatar
                      src={
                        value?.PostedUser === "Recreation Committee"
                          ? "/assets/committee-removed.png"
                          : valueC.UserImage
                      }
                      alt={valueC.UserName}
                      className={ShareStyle.postavatar}
                    />
                    <div key={post._id} className={ShareStyle.posttopInfo}>
                      {/* <h3>{valueC.UserName}</h3> */}
                      <h3>
                        {value?.PostedUser === "Recreation Committee"
                          ? value?.PostedUser
                          : valueC.UserName}
                      </h3>

                      <div className={ShareStyle.Date}>
                        <Dates props={value} />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className={ShareStyle.postbottom}>
              <div className={ShareStyle.descriptiontext}>
                <div className={ShareStyle.postbottom}>
                  <div
                    className={ShareStyle.descriptiontext}
                    dangerouslySetInnerHTML={{ __html: value.PostDescription }}
                  ></div>
                </div>
              </div>
            </div>
            {/* <div className={ShareStyle.postimage}>
              {/\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i.test(value?.PostImage) ? (
                <video className={ShareStyle.pos} controls>
                  <source src={value?.PostImage} type="video/ogg" />
                </video>
              ) : (
                <img className={ShareStyle.pos} src={value?.PostImage} alt="" />
              )}{" "}
            </div> */}
            <div className={ShareStyle.postimage}>
              {isVideoFile && post[0]?.PostImage?.length === 1 && (
                <video className={ShareStyle.pos} controls>
                  <source src={post[0]?.PostImage} type="video/ogg" />
                </video>
              )}
            </div>
            {post[0]?.PostImage?.length > 1 ? (
              <div className={ShareStyle.postimage}>
                <div>
                  <Carousel renderArrow={() => <></>}>{images}</Carousel>
                </div>
              </div>
            ) : (
              <img
                className={ShareStyle.pos}
                src={post[0]?.PostImage}
                alt=""
              />
            )}
            <div className={ShareStyle.postoptions}>
              <div className={ShareStyle.postoption}>
                {isliked ? (
                  <>
                    <FcLike onClick={likeHandler} size={23} />
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon
                      onClick={likeHandler}
                      sx={{ color: "gray" }}
                    />
                  </>
                )}

                <div className={ShareStyle.likeButton}>
                  {value.LikeCount === 0 ? "" : value.LikeCount}
                </div>
              </div>

              <div className={ShareStyle.postoption}></div>

              <div className={ShareStyle.postoption}>
                <IoIosShareAlt
                  onClick={copyLink}
                  size={27}
                  sx={{ color: "blue" }}
                />
              </div>
            </div>
            <div className={comment.sendComment}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  ShareStyle={{
                    marginLeft: 11,
                    width: "94%",
                    borderRadius: "14px",
                  }}
                  multiline
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    rows: 1,
                  }}
                  variant="outlined"
                  placeholder="Write comments......."
                  value={commentInput}
                  onChange={handleComment}
                />
              </MuiThemeProvider>
              <IconButton
                aria-label="delete"
                size="small"
                className="submit-button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={disabled}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </div>
            {commentData?.map((val) => (
              <div key={val._id} className={comment.main}>
                <div className={comment.avatar}>
                  <div className={ShareStyle.posttop}>
                    {val?.UserList?.map((valueC) => (
                      <>
                        <Avatar
                          src={valueC.UserImage}
                          alt={valueC.UserName}
                          className={ShareStyle.postavatar}
                        />
                        <div key={post._id} className={ShareStyle.posttopInfo}>
                          <h3>{valueC.UserName}</h3>
                          <div className={ShareStyle.Date}>
                            <Dates props={val} />
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className={comment.comment}>{val.Comment}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificatifiedPost;
