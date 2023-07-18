import { Avatar } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import comment from "../../../Screens/Innovature/components/SharedPage/comment.module.css";
import Dates from "../../../Screens/Innovature/components/SharedPage/Dates";
import NotificationStyle from "./ReportedPost.module.css";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import {
  DeleteReportedPost,
  GetSinglePost,
} from "../../../api/ServiceFile/ApiServiceAlwin";
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

const ReportedPost = () => {
  const [post, setPost] = useState([]);
  let { variable } = useParams();
  const [postDeleteId, setPostDeleteId] = useState(null);
  const navigate = useNavigate();
  const notify = useSelector((state) => state.notifications);
  const [isVideoFile, setIsVideoFile] = useState(null);
  const [imageFromPost, setImageFromPost] = useState(null);
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;


  const reloadPost = () => {
    setPostDeleteId(variable);
    GetSinglePost(variable)
      .then((res) => {
        setPost(res.data);
        setIsVideoFile(videoFileExtensions.test(res.data[0].PostImage));
        setImageFromPost(res.data[0].PostImage);
      })
      .catch((err) => {
        setTimeout(() => {
          ToasterGlobal("This post is no longer available", 525, ["info"]);
          setTimeout(() => {
            window.location.replace("/dashboard/adminfeed");
          }, 2000);
        }, 1000);
      });
  };

  useEffect(() => {
    reloadPost();
  }, [notify]);

  const feedRedir = () => {
    navigate(-1);
  };

  // delete post

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
        DeleteReportedPost(postDeleteId).then((responses) => {
          setTimeout(() => {
            ToasterGlobal("Post Deleted Successfully", 8312, ["success"]);

            setTimeout(() => {
              feedRedir();
            }, 0);
          }, 1000);
        });
      }
    });
  };

  let images = null;
  if (Array.isArray(imageFromPost) && imageFromPost.length > 1) {
    images = imageFromPost.map((img) => {
      return videoFileExtensions.test(img) ? (
        <video className={NotificationStyle.pos} controls>
          <source src={img} type="video/ogg" key={img._postId} />
        </video>
      ) : (
        <img className={NotificationStyle.pos} src={img} alt="" key={img._postId} />
      );
    });
  }
  return (
    <div className={NotificationStyle.screen} data-testid="reportedPost-page">
      {post.map((value) => (
        <div key={value._id} className={NotificationStyle.post}>
          <div className={comment.scroll}>
            <div className={NotificationStyle.posttopParent}>
              <div className={NotificationStyle.posttop}>
                <IconButton onClick={feedRedir} data-testId="redir-btn">
                  <IoIosArrowBack size={23} />
                </IconButton>
                {value?.userslist?.map((valueC) => (
                  <>
                    <Avatar
                      src={
                        value?.PostedUser === "Recreation Committee"
                          ? "/assets/committee-removed.png"
                          : valueC.UserImage
                      }
                      alt={valueC.UserName}
                      className={NotificationStyle.postavatar}
                    />
                    <div
                      key={post._id}
                      className={NotificationStyle.posttopInfo}
                    >
                      <h3>
                        {value?.PostedUser === "Recreation Committee"
                          ? value?.PostedUser
                          : valueC.UserName}
                      </h3>

                      <div className={NotificationStyle.Date}>
                        <Dates props={value} />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className={NotificationStyle.postoptions} title="Delete">
                <IconButton
                  onClick={() => deleteUserPost()}
                  color="error"
                  className={NotificationStyle.deletePostIcon}
                  data-testid="report_btn"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <div className={NotificationStyle.postbottom}>
              <div className={NotificationStyle.descriptiontext}>
                <div className={NotificationStyle.postbottom}>
                  <div
                    className={NotificationStyle.descriptiontext}
                    dangerouslySetInnerHTML={{ __html: value.PostDescription }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={NotificationStyle.postimage}>
              <img
                className={NotificationStyle.pos}
                src={value.PostImage}
                alt=""
              />
            </div>

            <div className={NotificationStyle.postimage}>
              {isVideoFile && post[0]?.PostImage?.length === 1 && (
                <video className={NotificationStyle.pos} controls>
                  <source src={post[0]?.PostImage} type="video/ogg" />
                </video>
              )}
            </div>
            {post[0]?.PostImage?.length > 1 ? (
              <div className={NotificationStyle.postimage}>
                <div>
                  <Carousel renderArrow={() => <></>}>{images}</Carousel>
                </div>
              </div>
            ) : (
              <img className={NotificationStyle.pos} src={post[0]?.PostImage} alt="" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportedPost;
