import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { setNoPost } from "../../../../actions/NoDataPostReducer";
import { setPostList } from "../../../../actions/publicPostSlice";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import PostMessage from "../PstSender/MessageSender";
import NoPost from "../post/NoPost";
import Post from "../post/Post";
import Gallary from "./Gallery";
import Recentpoll from "./Recentpoll";
import TopThree from "./TopThree";
import "./dd.css";
import feedStyles from "./feed.module.css";
import GotoTop from "../../../../components/scroll-to-top/GotoTop";
import { AdminImageGet } from "../../../../api/ServiceFile/ApiServiceInno";
import { useNavigate } from "react-router-dom";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  minWidth: 500,
  height: "95vh",
  bgcolor: "background.paper",
  p: 1,
  paddingLeft: "2%",
};

export default function Feed() {
  const dispatch = useDispatch();
  const colors = [
    "#4285f4",
    "#db4437",
    "#f4b400",
    "#0f9d58",
    "#9c27b0",
    "#00bcd4",
    "#ff5722",
    "#8bc34a",
    "#795548",
    "#607d8b",
    "#f44336",
    "#e91e63",
    "#9e9e9e",
    "#3f51b5",
    "#4caf50",
    "#ffc107",
    "#cddc39",
    "#2196f3",
    "#673ab7",
    "#ffeb3b",
  ];
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 120,
    },
  }));
  const classes = useStyles();
  let searchTimeout = null;
  const [grpPoint, setgrpPoint] = useState("");
  const [data, setData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [pollData, setPollData] = useState([""]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [page, setPage] = useState(1);
  const [groupShow, setGroupShow] = useState([]);

  const [datas, setDatas] = useState([]);
  const [arrayElementCount, setArrayElementCount] = useState(0);

  const count = useSelector((state) => state.counter);
  const noPost = useSelector((state) => state.noDataPostKeyGet);

  const [modalOpen, setModalOpen] = useState(false);
  const [searchContition, setSearchContition] = useState(false);
  const [scrollContition, setScrollContition] = useState(false);

  const [noPostCondition, setNoPostCondition] = useState();
  const Navigate = useNavigate();

  function listPole() {
    axiosPrivate.get(api.GET_RECENT_POLL).then((response) => {
      setPollData(response.data);
    });
  }
  dispatch(setPostList(["eeccrcrc"]));

  useEffect(() => {
    listImage();
    listPole();
    dispatch(setNoPost(true));
    load();
    topThree();
    TotalScore();
  }, []);

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  useEffect(() => {
    setNoPostCondition(noPost?.setnoDataPostKey);
  }, [noPost]);

  useEffect(() => {
    if (count?.ownerDetails?.length > 0) {
      setSearchContition(true);
      setData(count?.ownerDetails);
    }
    if (count?.ownerDetails?.length < 1) {
      setData([]);
      setSearchContition(false);

      axiosPrivate
        .get(api.GET_POST)
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [count]);

  async function TotalScore() {
    await axiosPrivate.post(api.GET_TOTAL_SCORE).then((response) => {
      if (response) {
        setGroupShow(response.data);
        const body = response.data;
        axiosPrivate.post(api.GET_TOTAL_SCORE, body).then((resp) => {
          const eventData = resp.data?.map((column, index) => [
            column?.grouplist[0]?.GroupName,
            column?.count,
            `color: ${colors[index]}`,
          ]);
          eventData.unshift([
            "Group Standing",
            "Event Points",
            { role: "style" },
          ]);
          setDatas(eventData);
          setLegend(
            <table>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={color}>
                    <td style={{ backgroundColor: color }}></td>
                    <td>{eventData[index + 1][0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        });
      }
    });
  }

  const groupGraphOptions = {
    chartArea: {
      width: "40%", // set chart area width to 40% of the chart container width
    },
    hAxis: {
      maxTextWidth: 20, // set maximum width to 20 pixels
      textStyle: {
        fontSize: 10, // set maximum font size to 10 pixels
      },
      maxTextLines: 1,
    },
    vAxis: {
      maxTextWidth: 20, // set maximum width to 20 pixels
      textStyle: {
        fontSize: 10, // set maximum font size to 10 pixels
      },
      maxTextLines: 1,
    },
    title: "Quarter year Point Chart",
    is3D: true,
    legend: "none",
    tooltip: {
      isHtml: true,
      backgroundColor: "white",
      textStyle: {
        color: "black",
      },
    },
    colors: colors,
  };
  const groupGraphOptionsInModal = {
    chartArea: {
      width: "60%", // set chart area width to 80% of the chart container width
    },
    hAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 14, // set maximum font size to 14 pixels
      },
      maxTextLines: 1,
    },
    vAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 14, // set maximum font size to 14 pixels
      },
      maxTextLines: 1,
    },
    title: "Quarter year Point Chart",
    is3D: true,
    legend: "none",
    tooltip: {
      isHtml: true,
      backgroundColor: "white",
      textStyle: {
        color: "black",
      },
    },
    colors: colors,
  };

  const topThree = () => {
    axiosPrivate
      .get("PublishToInno/GetTopThreeGroups")
      .then((res) => {
        setgrpPoint(res.data);
        topGrpPoints(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const PointTable = () => {
    Navigate("/dashboardInno/eventPoints/gropStandings");
  };

  const topGrpPoints = (top) => {
    const list = [[], [], []];
    top.forEach((element) => {
      if (element.Position === 1) {
        list[0].push(element);
        setFirst(list[0]);
      } else if (element.Position === 2) {
        list[1].push(element);

        setSecond(list[1]);
      } else if (element.Position === 3) {
        list[2].push(element);
        setThird(list[2]);
      }
    });
  };

  const loadPage1 = () => {
    if (searchContition === false) {
      axiosPrivate
        .get(api.GET_POST)
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const loadPageDelete = (id) => {
    setArrayElementCount(arrayElementCount + 1);
    if (arrayElementCount === 7) {
      loadPage1();
      setArrayElementCount(0);
    }
    setData(data.filter((post) => post._id !== id));
  };
  const load = () => {
    if (searchContition === false) {
      axiosPrivate
        .get(api.GET_POST_PAGINATED + `${page}`)
        .then((res) => {
          {
            res && setData([...data, ...res.data]);
          }
          setPage(page + 1);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getevent = (e) => {

    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      setScrollContition(true)
      load();
    }
    if (e.target.scrollTop < 2000) {
      setScrollContition(false)

    } else {
      setScrollContition(true)

    }
  };

  const goToTop = () => {
    const outerDiv = document.querySelector(`.${feedStyles.feedWrapper}`);
    outerDiv.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };


  const [ImagesGallery, setImagesGallery] = useState(null);

  const listImage = () => {
    AdminImageGet().then((response) => {
      setImagesGallery(response.data);

    });
  };


  return (
    <div className={feedStyles.feed} data-testid="feed_id">
      <div className={feedStyles.feedWrapper} onScroll={getevent}>
        <GotoTop scrollPosition={scrollContition} goToTop={goToTop} />
        <div className={feedStyles.Img}>
          <div></div>
          <div>
            <div class={feedStyles.gallery}>
              {ImagesGallery?.length > 0 ? (
                ImagesGallery.map((value) => {
                  return <img alt="error" src={value?.ImagePath} />;
                })
              ) : (
                <img src="https://www.coverbash.com/wp-content/covers/winter-forest-facebook-cover.jpg" />)}
            </div>
          </div>
          <div></div>
        </div>
        <div className={feedStyles.mainFrame}>
          <div>
            <PostMessage reload={loadPage1} />
            {noPostCondition ? (
              <>
                {data.map((post) => (
                  <Post
                    key={post._id}
                    post={post}
                    reload={loadPageDelete}
                    reload1={loadPage1}
                  />
                ))}
              </>
            ) : (
              <>
                <NoPost />
              </>
            )}
          </div>

          <div className={feedStyles.rightNavChild}>
            <div className={feedStyles.rightNavChildofChild}>
              <div>
                <Gallary />
              </div>
              <div className={feedStyles.RecentPoll}>
                <hr></hr>
                <>
                  {pollData != "" ? (
                    <div>
                      <div className={feedStyles.animatepoll}>
                        {" "}
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "19px",
                            lineHeight: "20px",
                            letterSpacing: " 0.09em",
                            fontWeight: "300",
                            marginTop: "14px",
                            paddingBottom: "14px",

                          }}
                        >
                          Latest Polls
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
                <Recentpoll />
              </div>
            </div>
          </div>

          <div className={feedStyles.rightNavParent}>
            <div className={feedStyles.rightNav}>
              {1 > 0 ? (
                <div className={feedStyles.topThree}>
                  {grpPoint.length > 0 ? (
                    <p className={feedStyles.topThreeGroups}>
                      Top three groups
                    </p>
                  ) : (
                    ""
                  )}
                  <div title="click to view point table" onClick={PointTable} style={{ paddingTop: '8px' }}>
                    <TopThree
                      first={first}
                      second={second}
                      third={third}
                      classes={classes}
                    />
                  </div>
                  {groupShow.length > 0 ? (
                    <>
                      <div className={feedStyles.topThreeGraph}>
                        <div className={feedStyles.Chart} onClick={handleOpen}>
                          {chartGlobal(datas, groupGraphOptions, "64vh", {
                            marginTop: -48,
                            marginLeft: 10,
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className={feedStyles.topThreeGraph}>
                        <img src="/assets/NoData.jpg" alt="" />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className={feedStyles.topThree}>
                    <p className={feedStyles.topThreeGroups}>
                      Groups Standings
                    </p>
                    <img src="/assets/NoData.jpg" alt="" />
                  </div>
                </>
              )}
            </div>

            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styles}>
                <Fragment>
                  {chartGlobal(datas, groupGraphOptionsInModal, "90vh")}
                  <div className="legend">{legend}</div>
                </Fragment>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

function chartGlobal(datas, groupGraphOptions, maxHeight, margine) {
  return (
    <Chart
      chartType="BarChart"
      data={datas}
      options={groupGraphOptions}
      height={maxHeight}
      style={margine}
      fill={"black"}
    />
  );
}
