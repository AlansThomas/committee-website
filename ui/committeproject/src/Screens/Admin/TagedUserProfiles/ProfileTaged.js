import { Avatar, Button } from "@mui/material";
import moment from "moment";
import React,{ useEffect, useState } from "react";
import { FaTags } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCommettePost,
  getPostUserApi,
  getTaggedPostUser,
  userDetails,
} from "../../../api/ServiceFile/ApiServiceAlwin";
import MyPosts from "../AdminPost/AdminPost";
import profileStyles from "./ProfileTaged.module.css";

export default function ProfileTaged({ re }) {
  const [data, setData] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  const [tag, setTagged] = useState([]);
  const [posts1, setPosts1] = useState(true);
  const [errorData, setErrorData] = useState(null);
  let { variable } = useParams();
  const DataID = variable;

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (data?.committeeDetails) {
      CommitteePosts();
    } else {
      posts();
    }
  }, [data]);

  const reload = async () => {
    await userDetails(DataID)
      .then((response) => {
        setData(response.data);
        if (response?.data?.groupDetails) {
          setPosts1(false);
          tagged();
        }
      })
      .catch((error) => {
        if (error.response.data.errorCode === 801) {
          navigate("404");
        } else {
          setErrorData(error.response.data);
        }
      });
  };

  function posts() {
    setPosts1(true);
    getPostUserApi(DataID)
      .then((res) => {
        setMyPosts(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function tagged() {
    setPosts1(false);
    getTaggedPostUser(DataID)
      .then((res) => {
        setTagged(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function CommitteePosts() {
    setPosts1(true);
    getCommettePost()
      .then((res) => {
        setMyPosts(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getevent = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      {
        posts1 ? posts() : tagged();
      }
    }
  };
  const getevents = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      {
        posts1 ? CommitteePosts() : tagged();
      }
    }
  };
  let componentToRender;
  if (errorData) {
    componentToRender = getPostUser(getevent, data, errorData);
  } else if (data?.userDetails) {
    componentToRender = newFunction_1(
      getevent,
      posts,
      tagged,
      data,
      posts1,
      myPosts,
      tag
    );
  } else if (data?.committeeDetails) {
    componentToRender = newFunction_2(
      getevents,
      CommitteePosts,
      tagged,
      data,
      posts1,
      myPosts,
      tag
    );
  } else {
    componentToRender = newFunction_3(getevent, tagged, data, tag);
  }

  return <>{componentToRender}</>;
}

function newFunction_3(getevent, tagged, data, tag) {
  return (
    <div className={profileStyles.pro}>
      <div className={profileStyles.proWrapper} onScroll={getevent}>
        <div className={profileStyles.profile}>
          <div className={profileStyles.coverImage}>
            <img
              src="https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/admin-default-cover.jpg"
              alt="cover"
            />
          </div>
          <div className={profileStyles.settings}>
            <div className={profileStyles.posts}></div>
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
          </div>
          <div className={profileStyles.profileDetails}>
            <div className={profileStyles.pic}>
              <Avatar
                src={
                  data && data?.groupDetails && data?.groupDetails[0].GroupImage
                }
                style={{ width: "140px", height: "140px" }}
                alt={
                  data && data?.groupDetails && data?.groupDetails[0].GroupName
                }
              />
            </div>
            {data?.groupDetails ? (
              <div className={profileStyles.user}>
                <div className={profileStyles.username}>
                  <h3 style={{ color: "white", cursor: "default" }}>
                    {data &&
                      data?.groupDetails &&
                      data?.groupDetails[0].GroupName}
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
                <b>Group Members</b>
              </h3>
              <hr />
              <div className={profileStyles.MembersBox}>
                {data &&
                  data.groupDetails &&
                  data.groupDetails.slice(1).map((item, index) => {
                    return (
                      <>
                        <div className={profileStyles.aboutDetails}>
                          <Avatar
                            src={item.UserImage}
                            alt={item.UserName}
                            style={{ width: "25px", height: "25px" }}
                          ></Avatar>
                          <h6>{item.UserName}</h6>
                        </div>
                      </>
                    );
                  })}
              </div>
            </card>
          </div>
          {<MyPosts props={tag} reoad={tagged} />}
        </div>
      </div>
    </div>
  );
}

function newFunction_2(
  getevents,
  CommitteePosts,
  tagged,
  data,
  posts1,
  myPosts,
  tag
) {
  return (
    <div className={profileStyles.pro}>
      <div className={profileStyles.proWrapper} onScroll={getevents}>
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
                onClick={CommitteePosts}
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
          </div>
          <div className={profileStyles.profileDetails}>
            <div className={profileStyles.pic}>
              <Avatar
                src={
                  data &&
                  data?.committeeDetails &&
                  data?.committeeDetails[0]?.GroupImage
                }
                style={{ width: "140px", height: "140px" }}
                alt={
                  data &&
                  data?.committeeDetails &&
                  data?.committeeDetails[0].GroupName
                }
              />
            </div>
            {data?.committeeDetails ? (
              <div className={profileStyles.user}>
                <div className={profileStyles.username}>
                  <h3 style={{ color: "white", cursor: "default" }}>
                    {data &&
                      data?.committeeDetails &&
                      data?.committeeDetails[0].GroupName}
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
                <b>Members</b>
              </h3>
              <hr />
              {/* {data.} */}
              <div className={profileStyles.MembersBox}>
                {data &&
                  data.committeeDetails &&
                  data.committeeDetails.slice(1).map((item, index) => {
                    return (
                      <>
                        <div className={profileStyles.aboutDetails}>
                          <Avatar
                            src={item.UserImage}
                            alt={item.UserName}
                            style={{ width: "25px", height: "25px" }}
                          ></Avatar>
                          <h6>{item.UserName}</h6>
                        </div>
                      </>
                    );
                  })}
              </div>
            </card>
          </div>
          {
            <MyPosts
              props={posts1 ? myPosts : tag}
              reoad={posts1 ? CommitteePosts : tagged}
              status={posts1}
            />
          }
        </div>
      </div>
    </div>
  );
}

function newFunction_1(getevent, posts, tagged, data, posts1, myPosts, tag) {
  return (
    <div className={profileStyles.pro}>
      <div className={profileStyles.proWrapper} onScroll={getevent}>
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
          </div>
          <div className={profileStyles.profileDetails}>
            <div className={profileStyles.pic}>
              <Avatar
                src={data?.userDetails?.UserImage}
                style={{ width: "140px", height: "140px" }}
                alt={data?.userDetails?.UserName}
              />
            </div>
            {data?.userDetails ? (
              <div className={profileStyles.user}>
                <div className={profileStyles.username}>
                  <h3 style={{ color: "white", cursor: "default" }}>
                    {data?.userDetails?.UserName}
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
                <h6>{data?.userDetails?.Email}</h6>
              </div>
              <div className={profileStyles.aboutDetails}>
                <img src="/assets/birthday-cake.png" alt="cake" />
                <h6>{moment(data?.userDetails?.DOB).format("DD/MM/YYYY")}</h6>
              </div>
              <div className={profileStyles.aboutDetails}>
                <img src="/assets/human-resources.png" alt="role" />
                <h6>{data?.userDetails?.Designation}</h6>
              </div>
            </card>
          </div>
          {
            <MyPosts
              props={posts1 ? myPosts : tag}
              reoad={posts1 ? posts : tagged}
              status={posts1}
            />
          }
        </div>
      </div>
    </div>
  );
}

function getPostUser(getevent, data, errorData) {
  return (
    <div className={profileStyles.pro}>
      <div className={profileStyles.proWrapper} onScroll={getevent}>
        <div className={profileStyles.profile}>
          <div className={profileStyles.coverImage}>
            <img
              src="https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/admin-default-cover.jpg"
              alt="cover"
            />
          </div>
          <div className={profileStyles.settings}></div>
          <div className={profileStyles.profileDetails}>
            <div className={profileStyles.pic}>
              <Avatar
                src={data?.userDetails?.UserImage}
                style={{ width: "140px", height: "140px" }}
                alt={data?.userDetails?.UserName}
              />
            </div>
            <div className={profileStyles.user}>
              <div className={profileStyles.username}>
                <h3 style={{ color: "white", cursor: "default" }}>
                  {errorData}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
