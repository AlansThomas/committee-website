import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import comment from "./comment.module.css";
import { Avatar } from "@material-ui/core";
import { IoIosShareAlt, IoIosArrowBack } from "react-icons/io";
import ToasterGlobal from "../../../../TosterGlobal/ToasterGlobal";
import Dates from "../../../Innovature/components/SharedPage/Dates";
import { axiosPrivate } from "../../../../api/Interceptor/commiteeIntercepters";
import Configuration from "../../../../Configuration";
import api from "../../../../api/API_URL";
import Carousel from "react-elastic-carousel";

const SharedPage = () => {
  const [post, setPost] = useState([]);
  let { variable } = useParams();
  const [UserId, setUserId] = React.useState();
  console.log(UserId);
  const [PostUserId, setPostUserId] = React.useState();
  console.log(PostUserId);
  const navigate = useNavigate();
  const SHARE_URL = Configuration.Api_devUrl;
  const videoFileExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i;
  const [isVideoFile, setIsVideoFile] = useState(null);
  const [imageFromPost, setImageFromPost] = useState(null);

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
        setPostUserId(post.UserId);
      })
      .catch((err) => {
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
        ToasterGlobal("invalid post!!!!!!!!!!!!!!!!!!!!!!!!!!", 51, ["error"]);

        setTimeout(() => {
          ToasterGlobal("redirecting to Homepage", 52, ["info"]);

          setTimeout(() => {
            navigate("/dashboardCommitte/Home");
          }, 6000);
        }, 5000);
      });
  };

  const [link] = useState(
    SHARE_URL + "dashboardCommitte/Home/Share/" + variable + "/postShare"
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      ToasterGlobal("Link copied to clipboard!", 25652, ["success"]);
    } catch (err) {}
  };

  let images = null;
  if (Array.isArray(imageFromPost) && imageFromPost.length > 0) {
    images = imageFromPost.map((img) => {
      return videoFileExtensions.test(img) ? (
        <video className={styles.pos} controls>
          <source src={img} type="video/ogg" key={img._postId} />
        </video>
      ) : (
        <img className={styles.pos} src={img} alt="" key={img._postId} />
      );
    });
  }

  useEffect(() => {
    reloadPost();

    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setUserId(pasedValue.data._id);
    setPostUserId(post.UserId);
  }, []);

  const feedRedir = () => {
    window.location.replace("/dashboardCommitte/Home");
  };
  return (
    <div className={styles.screen}>
      {post?.map((value) => (
        <div key={value._id} className={styles.post}>
          <div className={comment.scroll}>
            <div className={styles.posttopParent}>
              <div className={styles.posttop}>
                <IoIosArrowBack onClick={feedRedir} size={23} />
                {value?.userslist?.map((valueC) => (
                  <>
                    <Avatar
                      src={valueC?.UserImage}
                      alt={valueC?.UserName}
                      className={styles.postavatar}
                    />
                    <div key={post._id} className={styles.posttopInfo}>
                      <h3>{value?.PostedUser}</h3>
                      <div className={styles.Date}>
                        <Dates props={value} />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className={styles.postbottom}>
              <div className={styles.descriptiontext}>
                <div className={styles.postbottom}>
                  <div
                    className={styles.descriptiontext}
                    dangerouslySetInnerHTML={{ __html: value.PostDescription }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={styles.postimage}>
              {isVideoFile && post[0]?.PostImage?.length === 1 && (
                <video className={styles.pos} controls>
                  <source src={post[0]?.PostImage} type="video/ogg" />
                </video>
              )}
            </div>
            {post[0]?.PostImage?.length > 1 ? (
              <div className={styles.postimage}>
                <div>
                  <Carousel renderArrow={() => <></>}>{images}</Carousel>
                </div>
              </div>
            ) : (
              <img className={styles.pos} src={post[0]?.PostImage} alt="" />
            )}

            <div className={styles.postoptions}>
              <div className={styles.postoption}></div>
              <div className={styles.postoption}></div>
              <div className={styles.postoption}>
                <IoIosShareAlt
                  onClick={copyLink}
                  size={27}
                  sx={{ color: "blue" }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharedPage;
