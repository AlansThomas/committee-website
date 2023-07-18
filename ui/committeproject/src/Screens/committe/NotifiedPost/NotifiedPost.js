import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "../Home/SharedPage/Post.module.css";
import comment from "../Home/SharedPage/comment.module.css";
import { Avatar } from "@material-ui/core";
import { IoIosShareAlt, IoIosArrowBack } from "react-icons/io";
import Dates from "../../Innovature/components/SharedPage/Dates";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import Configuration from "../../../Configuration";
import api from "../../../api/API_URL";
import { useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";

const NotifiedPost = () => {
  const [post, setPost] = useState([]);
  let { variable } = useParams();
  const [UserId, setUserId] = React.useState();
  console.log(UserId);
  const [PostUserId, setPostUserId] = React.useState();
  console.log(PostUserId);
  const notify = useSelector((state) => state.notifications);
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
        setPostUserId(post.UserId);
      })
      .catch((err) => {
        setTimeout(() => {
          ToasterGlobal("This post is no longer available", 20652, ["info"]);

          setTimeout(() => {
            window.location.replace("/dashboardCommitte/Home");
          }, 2000);
        }, 1000);
      });
  };

  const [link] = useState(SHARE_URL + variable);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      ToasterGlobal("Link copied to clipboard!", 25652, ["success"]);
    } catch (err) {}
  };

  useEffect(() => {
    reloadPost();

    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setUserId(pasedValue.data._id);
    setPostUserId(post.UserId);
  }, []);

  useEffect(() => {
    reloadPost();
  }, [notify]);

  const feedRedir = () => {
    window.location.replace("/dashboardCommitte/Home");
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
      {Array.isArray(post) &&
        post.length > 0 &&
        post.map((value) => (
          <div key={value._id} className={style.post}>
            <div className={comment.scroll}>
              <div className={style.posttopParent}>
                <div className={style.posttop}>
                  <IoIosArrowBack onClick={feedRedir} size={23} />
                  {value?.userslist?.map((valueC) => (
                    <>
                      <Avatar
                        src={valueC.UserImage}
                        alt={valueC.UserName}
                        className={style.postavatar}
                      />
                      <div key={post._id} className={style.posttopInfo}>
                        <h3>{value?.PostedUser}</h3>
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
                      dangerouslySetInnerHTML={{
                        __html: value.PostDescription,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* <div className={style.postimage}>
                {/\.(mp4|mov|avi|wmv|flv|mkv|3gp)$/i.test(value?.PostImage) ? (
                  <video className={style.pos} controls>
                    <source src={value?.PostImage} type="video/ogg" />
                  </video>
                ) : (
                  <img className={style.pos} src={value?.PostImage} alt="" />
                )}{" "}
              </div> */}

              <div className={style.postimage}>
                {isVideoFile && post[0]?.PostImage?.length === 1 && (
                  <video className={style.pos} controls>
                    <source src={post[0]?.PostImage} type="video/ogg" />
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
              <div className={style.postoptions}>
                <div className={style.postoption}></div>
                <div className={style.postoption}></div>
                <div className={style.postoption}>
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

export default NotifiedPost;
