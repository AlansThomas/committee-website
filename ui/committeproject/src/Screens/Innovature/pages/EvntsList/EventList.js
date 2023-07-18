import React, { useState, useEffect } from "react";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import feedStyles from "./feed.module.css";
import { Helmet } from "react-helmet-async";
import Post from "./Post";
import api from "../../../../api/API_URL";
import GotoTop from "../../../../components/scroll-to-top/GotoTop";

export default function EventList() {
  const [Posts, setPosts1] = useState([]);
  const [scrollContition, setScrollContition] = useState(false);

  useEffect(() => {
    axiosPrivate.get(api.GET_ALL_EVENT).then((res) => {
      setPosts1(res.data);
    });
  }, []);

  const getevent = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      setScrollContition(true);
    }
    if (e.target.scrollTop < 2000) {
      setScrollContition(false);
    } else {
      setScrollContition(true);
    }
  };
  const goToTop = () => {
    const outerDiv = document.querySelector(`.${feedStyles.feedEvent}`);
    outerDiv.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title> Events </title>
      </Helmet>
      <div className={feedStyles.feedEvent} onScroll={getevent}>
      <GotoTop scrollPosition={scrollContition} goToTop={goToTop} />
        <div className={feedStyles.feedWrapper}>
          {Posts.length > 0 ? (
            Posts.map((p) => <Post key={p.id} post={p} />)
          ) : (
            <div className={feedStyles.loading}>
              <img
                src="/assets/committee-removed.png"
                alt="Img"
                width="300"
                height="300"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
