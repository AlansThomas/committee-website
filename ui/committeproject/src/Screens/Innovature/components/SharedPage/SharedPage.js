import { Avatar, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { IoIosArrowBack, IoIosShareAlt } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import Configuration from "../../../../Configuration";
import comment from "./comment.module.css";
import Dates from "./Dates";
import style from "./Post.module.css";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";
import Popover from "@mui/material/Popover";
import CommentComponent from "../post/CommentComponent";
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

const SharedPage = () => {
  const [commentCount, setCommentCount] = useState("");
  const [commentData, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [post, setPost] = useState([]);
  let { variable } = useParams();
  const [UserId, setUserId] = useState();
  const [disabled, setDisabled] = useState(true);
  const [like, setLike] = useState(post.LikeCount);
  const [isliked, setIsLiked] = useState(false);
  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();
  const SHARE_URL = Configuration.Api_devUrl;
  const [anchorEl2, setAnchorEl2] = useState(null);
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const CHARACTER_LIMIT = 1000;

  const handleOpenEmojiPicker = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl2(null);
  };

  const onEmojiClick = (emoji) => {
    const inputLength = commentInput.length;
    if (inputLength === 0) {
      setDisabled(false);
      setCommentInput(emoji.native);
    } else if (inputLength > 998) {
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
          toastId: 40967,
        });
      }
      if (inputLength > 1000) {
        setDisabled(true);
      }
    } else {
      setCommentInput(commentInput + emoji.native);
      setDisabled(false);
    }
  };

  const [isVideoFile, setIsVideoFile] = useState(null);
  const [imageFromPost, setImageFromPost] = useState(null);

  const reloadPost = () => {
    const url = api.GET_SINGLE_POST_PRIVATE + variable;
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
        setAvailable(false);
        setPost([
          {
            _id: "63d276b320adfa8e9efb8c64",
            UserId: "63d22daf3e78c12f48dee6ea",
            PostImage:
              "https://i.pinimg.com/originals/a5/4b/f8/a54bf8e8bd76d92be03bbecae09c1b69.png",
            Tags: [],
            PostDescription: "",
            LikeCount: 0,
            CommentCount: 0,
            Like: [""],
            Dislike: [],
            Delete: 0,
            LikeStatus: false,
            createdAt: "4090-01-26T12:48:51.828Z",
            updatedAt: "2023-01-26T12:59:20.937Z",
            __v: 0,
            userslist: [
              {
                _id: "63d22daf3e78c12f48dee6ea",
                UserName: "who knows!!",
                Email: "",
                DOB: "",
                Type: 0,
                GroupRole: 0,
                Designation: "Software engineer",
                Delete: 1,
                GroupId: "0",
                CommitteeId: "0",
                CommitteeRole: "0",
                Password:
                  "$2a$10$c/a4zkPU1q97LJaQiKotWOzgCces.uNmZAyT4jyaAuHxQSnlH7cyq",
                Otp: "0",
                createdAt: "2023-01-26T07:37:19.344Z",
                updatedAt: "2023-01-26T13:04:49.665Z",
                __v: 0,
                UserImage:
                  "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fit=scale&fm=pjpg&h=350&w=700",
              },
            ],
          },
        ]);
        toast.error("invalid post!!!!!!!!!!!!!!!!!!!!!!!!!!", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 41,
        });
        setTimeout(() => {
          toast.info("redirecting to Homepage", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: 42,
          });
          setTimeout(() => {
            navigate("/dashboardInno/feed");
          }, 6000);
        }, 5000);
      });
  };

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
    const formData = { UserId: UserId, PostId: variable };
    const url = isliked ? api.POST_LIKE_POST : api.POST_POST_LIKE;

    axiosPrivate
      .post(url, formData)
      .then((response) => {
        reloadPost();

        const newLikeCount = isliked ? like - 1 : like + 1;
        setLike(newLikeCount);
        setIsLiked(!isliked);
      })
      .catch((err) => {
        console.error(err);
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
    const inputLength = event.target.value?.length;
    if (inputLength < 1014) {
      setCommentInput(event.target.value);
    }
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
          toastId: 40967,
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
    if (!commentInput || commentInput.trim().length === 0) {
      // Display an error message
      setDisabled(true);
      toast.error("Comment cannot be blank", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 4325,
      });
    } else {
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
    }
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
        <video className={style.pos} controls>
          <source src={img} type="video/ogg" key={img._postId} />
        </video>
      ) : (
        <img className={style.pos} src={img} alt="" key={img._postId} />
      );
    });
  }

  return (
    <div className={style.screen}>
      {post.map((value) => (
        <div key={value?._id} className={style.post}>
          <div className={comment.scroll}>
            <div className={style.posttopParent}>
              <div className={style.posttop}>
                {/* <NavLink to="feed"> */}
                <IoIosArrowBack onClick={feedRedir} size={23} />

                {/* </NavLink> */}
                {value?.userslist?.map((valueC) => (
                  <>
                    <Avatar
                      src={
                        value?.PostedUser === "Recreation Committee"
                          ? "/assets/committee-removed.png"
                          : valueC?.UserImage
                      }
                      alt={valueC?.UserName}
                      className={style.postavatar}
                    />
                    <div key={post._id} className={style.posttopInfo}>
                      {/* <h3>{valueC.UserName}</h3> */}
                      <h3>
                        {value?.PostedUser === "Recreation Committee"
                          ? value?.PostedUser
                          : valueC?.UserName}
                      </h3>

                      <div className={style.Date}>
                        <Dates props={value} />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className={style.postbottom}>
              <div className={style.descriptiontext}>
                <div className={style.postbottom}>
                  <div
                    className={style.descriptiontext}
                    dangerouslySetInnerHTML={{ __html: value?.PostDescription }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={style.postimage}>
              {isVideoFile && post[0]?.PostImage?.length === 1 && (
                <video className={style.pos} controls>
                  <source src={post[0].PostImage} type="video/ogg" />
                </video>
              )}
            </div>
            {post[0]?.PostImage?.length > 1 ? (
              <div className={style.postimage}>
                <div>
                  <Carousel renderArrow={() => <></>}>{images}</Carousel>
                </div>
              </div>
            ) : (
              <img className={style.pos} src={post[0]?.PostImage} alt="" />
            )}

            {available && (
              <>
                <div className={style.postoptions}>
                  <div className={style.postoption}>
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

                    <div className={style.likeButton}>
                      {value?.LikeCount === 0 ? "" : value?.LikeCount}
                    </div>
                  </div>

                  <div className={style.postoption}></div>

                  <div className={style.postoption}>
                    <IoIosShareAlt
                      onClick={copyLink}
                      size={27}
                      sx={{ color: "blue" }}
                    />
                  </div>
                </div>
                <div className={comment.sendComment}>
                  <MuiThemeProvider theme={theme}>
                    <div>
                      <IconButton
                        onClick={handleOpenEmojiPicker}
                        aria-label="emoji-toggle"
                      >
                        <BsEmojiSmile style={{ marginBottom: 8 }} />
                      </IconButton>
                      <Popover
                        open={Boolean(anchorEl2)}
                        anchorEl={anchorEl2}
                        onClose={handleCloseEmojiPicker}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <EmojiPicker
                          data={data}
                          onEmojiSelect={onEmojiClick}
                          noCountryFlags={true}
                          theme="dark"
                        />
                      </Popover>
                    </div>
                    <TextField
                      style={{
                        marginLeft: 1,
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
                {Array.isArray(commentData) &&
                  commentData.map((value) => (
                    <CommentComponent
                      share={true}
                      key={value?._id}
                      value={value}
                      postId={post[0]?._id}
                      reloadComment={reloadComment}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharedPage;
