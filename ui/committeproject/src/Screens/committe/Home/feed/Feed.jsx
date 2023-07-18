import React, { useEffect, useState } from "react";
import Postss from "../../Home/post/Post";
import PostMessage from "../PstSender/MessageSender";
import feedStyle from "./feed.module.css";
import { axiosPrivate } from "../../../../api/Interceptor/commiteeIntercepters";
import api from "../../../../api/API_URL";
import BirthDays from "../../BirthDays/BirthDays";
import { Stack } from "@mui/material";
import Chart from "react-google-charts";
import "./feed.css";
import Glimpses from "./Glimpses";
import GotoTop from "../../../../components/scroll-to-top/GotoTop";

export default function Feed({ username }) {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollContition, setScrollContition] = useState(false);



  useEffect(() => {
    load();
    TotalScore();
  }, []);


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
  async function TotalScore() {
    await axiosPrivate.post(api.GET_TOTAL_SCORE).then((response) => {
      if (response) {

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

        });
      }
    });
  }
  const groupGraphOptionsInModal = {
    chartArea: {
      width: '60%', // set chart area width to 80% of the chart container width
    },
    hAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 13, // set maximum font size to 14 pixels
      },
      maxTextLines: 1,
    },
    vAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 13, // set maximum font size to 14 pixels
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

  const loadPage1 = (id) => {
    axiosPrivate
      .get(api.GET_POST)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadPageDelete = (id) => {
    setData(data.filter((post) => post._id !== id));
  };

  const load = () => {
    axiosPrivate
      .get(api.GET_POST_PAGINATED + `${page}`)
      .then((res) => {
        setData([...data, ...res?.data]);
        setPage(page + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getevent = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      setScrollContition(true)
    }
    if (e.target.scrollTop < 2000) {
      setScrollContition(false)

    } else {
      setScrollContition(true)

    }
  };

  const goToTop = () => {
    const outerDiv = document.querySelector(`.${feedStyle.feed}`);
    outerDiv.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={feedStyle.feed} onScroll={getevent} >
      <GotoTop scrollPosition={scrollContition} goToTop={goToTop} />
      <div className={feedStyle.feedWrapper} >
        <div className={feedStyle.graphStyle}>
          <Stack>
            {data.length !== 0 ? (
              //   <Chart
              //    className={feedStyle.groupGraphColor}
              //    chartType='BarChart'
              //    data={datas}
              //    options={groupGraphOptions}
              //    height={'60vh'}
              //    fill={"black"}
              //  />
              <Chart
                chartType="BarChart"
                data={datas}
                options={groupGraphOptionsInModal}
                height={"84vh"}
                fill={"black"}
              />
            ) : (
              <div style={{ marginLeft: "379px" }}>
                <img
                  src="/favicon/logo_comittee.png"
                  className={feedStyle.imageLogo}
                  alt="Img"
                  width="300"
                  height="300"
                />{" "}
              </div>
            )}
          </Stack>
        </div>
        <div class="mainFrameCommitte">
          <div >
            <PostMessage reload={loadPage1} />
            {data?.map((p) => (
              <Postss key={p._id} post={p} reload={loadPageDelete}  reload1={loadPage1} />
            ))}
          </div>
          <div className="rightNavList">
            <div className="rightNavStyle">
              <BirthDays />
              <Glimpses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}