import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Helmet } from "react-helmet-async";
import truncate from "truncate-html";
import Swal from "sweetalert2";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/AdminIntercepter";
import style from "./ViewpostAdmin.module.css";
import Dates from "../../../Innovature/components/SharedPage/Dates.js";
import Carousel from "react-elastic-carousel";
import "react-toastify/dist/ReactToastify.css";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal.jsx";

function ViewpostAdmin({ post, reload }) {
  const [seeMore, setSeeMore] = useState(false);
  const description = post.PostDescription;

  const truncatedContent = truncate(description, 600, {
    preserveTags: true,
  });
  const withoutTags = description?.replace(/(<([^>]+)>)/gi, "");
  const deslen = withoutTags?.replace(/&nbsp;/g, "1")?.length;
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const isVideoFile = videoFileExtensions.test(post.PostImage);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLines = 5;
  const divRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);
  const handleClick = () => {
    setSeeMore(!seeMore);
  };

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

  const deleteUserPost = () => {
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
        axiosPrivate
          .delete(api.DELETE_ALL_POST.concat(post._id))
          .then((responses) => {
            ToasterSuccessGlobal("Post deleted successfully", 15, ["success"]);
            reload(post._id);
          });
      }
    });
  };

  const seeMoreOrSeeLes = (seeMoreOrLess) => {
    let buttonText;

    if (seeMoreOrLess) {
      buttonText = "See Less...";
    } else {
      buttonText = "See More...";
    }

    return buttonText;
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
    <>
      <Helmet>
        <title> Admin | post </title>
      </Helmet>
      <div className={style.post}>
        <div className={style.posttopParent}>
          <div key={post._id} className={style.posttop}>
            {post?.userlist?.map((value) => (
              <React.Fragment key={value._id}>
                <Avatar
                  src={value.UserImage}
                  alt={value.UserName}
                  className={style.postavatar}
                />
                <div className={style.posttopInfo}>
                  <h3>{value.UserName}</h3>
                  <div className={style.Date}>
                    <Dates props={post} />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className={style.postoptions} title="Delete">
            <IconButton
              onClick={() => deleteUserPost()}
              color="error"
              className={style.deletePostIcon}
              data-testid="delete_btn"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div
          ref={divRef}
          style={{
            maxHeight: isTruncated ? `${maxLines * 1.1}em` : "none",
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
      </div>
    </>
  );
}

export default ViewpostAdmin;
