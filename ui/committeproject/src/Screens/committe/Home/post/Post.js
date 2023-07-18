import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./Post.module.css";
import comment from "./Commend.module.css";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import ToasterGlobal from "../../../../TosterGlobal/ToasterGlobal";
import Button from "@mui/material/Button";
import { BsThreeDots } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { axiosPrivate } from "../../../../api/Interceptor/commiteeIntercepters";
import { BiExpand } from "react-icons/bi";
import Swal from "sweetalert2";
import Configuration from "../../../../Configuration";
import Carousel from "react-elastic-carousel";
import api from "../../../../api/API_URL";
import Dates from "../../../Innovature/components/SharedPage/Dates";
import truncate from "truncate-html";
import PostEditor from "../../../Innovature/components/post/PostEditor";
import { FiEdit } from "react-icons/fi";

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

const Post = ({ post, reload,reload1 }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [UserId, setUserId] = React.useState();
  const [postUserId, setPostUserId] = React.useState(post.UserId);
  const [thura, setThura] = React.useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const description = post.PostDescription;
  const [modalOpenForPostEdit, setModalOpenForPostEdit] = useState(false);

  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const isVideoFile = videoFileExtensions.test(post.PostImage);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLines = 5;

  const truncatedContent = truncate(description, 600, {
    preserveTags: true,
  });
  const withoutTags = description?.replace(/(<([^>]+)>)/gi, "");
  const deslen = withoutTags?.replace(/&nbsp;/g, "1")?.length;


  const handleOpenEditPost = () => {
    setModalOpenForPostEdit(true);
  };

  const handleCloseEditPost = () => {
    setModalOpenForPostEdit(false);
    reload1();
  };



  const handleClick = () => {
    setSeeMore(!seeMore);
  };

  const detailed = "../Home/Share/" + post._id + "/postShare";
  const divRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);

  const SHARE_URL = Configuration.Api_devUrl;

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

  const showReadMoreButton = lineCount >= maxLines;

  const [link] = useState(
    SHARE_URL + "dashboardCommitte/Home/Share/" + post._id + "/postShare"
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      ToasterGlobal("Link copied to clipboard!", 2146, ["success"]);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };
  useEffect(() => {
    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setUserId(pasedValue.data._id);
    setPostUserId(post.UserId);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const handleClose = () => setThura(false);

  const handleClickHoverModal = (event) => {
    setPostUserId(post.UserId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHoverModal = () => {
    setAnchorEl(null);
  };

  const postDelete = () => {
    handleCloseHoverModal();
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
        const storedValue = window.localStorage.getItem("Profile");
        const pasedValue = JSON.parse(storedValue);
        setUserId(pasedValue.data._id);
        setPostUserId(post.UserId);
        const url = api.DELETE_POST + post._id;

        let formData = { UserId: pasedValue.data._id };

        axiosPrivate
          .delete(url, { data: formData })
          .then((res) => {
            reload(post._id);
            setThura(false);
            setAnchorEl(null);
            ToasterGlobal("Post Deleted Successfully", 8012, ["success"]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseHoverModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {UserId === postUserId ? (
            <>
              <IconButton
                onClick={postDelete}
                variant="contained"
                color="error"
              >
                <MdDelete />
              </IconButton>
              <IconButton onClick={handleOpenEditPost} variant="contained">
              <FiEdit />
            </IconButton>
              <NavLink to={detailed}>
                <BiExpand size={25} />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={detailed}>
                <BiExpand size={25} />
              </NavLink>
            </>
          )}
        </Popover>
      </div>
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
          <IoIosShareAlt onClick={copyLink} size={27} sx={{ color: "blue" }} />
        </div>
        <div>
          <Modal
            open={thura}
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
                          src={value.UserImage}
                          alt={value.UserName}
                          className={style.postavatar}
                        />
                        <div key={post._id} className={style.posttopInfo}>
                          <h3>{value?.UserName}</h3>
                          <p>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-us",
                              options
                            )}
                          </p>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className={style.deletePost}>
                    {UserId === postUserId ? (
                      <>
                        <Button
                          aria-describedby={id}
                          onClick={handleClickHoverModal}
                        >
                          <BsThreeDots color="black" size={20} />
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
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
                    <IoIosShareAlt
                      onClick={copyLink}
                      size={25}
                      sx={{ color: "blue" }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          <PostEditor
          isCommitte={true}
          postImageForEdit={post.PostImage}
          postIdForEdit={post._id}
          PostDescription={description}
          modalOpenForPostEdit={modalOpenForPostEdit}
          handleCloseEditPost={handleCloseEditPost}
        />
        </div>
      </div>
    </div>
  );
};

export default Post;
