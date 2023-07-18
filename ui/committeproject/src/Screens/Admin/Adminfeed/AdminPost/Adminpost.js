import React,{ useEffect, useState } from "react";
import GotoTop from "../../../../components/scroll-to-top/GotoTop";
import { GetPosts } from "../../../../api/ServiceFile/ApiServiceAlwin";
import ViewpostAdmin from "../ViewPost/ViewpostAdmin";
import feedStyles from "./Adminpost.module.css";

export default function Adminpost() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollContition, setScrollContition] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const deletePost = () => {
    if (data.length < 5) {
      load();
    }
  };

  const loadPageDelete = (id) => {
    setData(data.filter((post) => post._id !== id));
    deletePost();
  };
  const load = () => {
    GetPosts(page).then((res) => {
        setData([...data, ...res?.data]);
        setPage(page + 1);
      })
  };
  const getevent = (e) => {
    if (
      e.target.scrollTop + 100 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      load();
      setScrollContition(true)
    }
    if (e.target.scrollTop < 2000) {
      setScrollContition(false)

    } else {
      setScrollContition(true)

    }
  };

  const goToTop = () => {
    const outerDiv = document.querySelector(`.${feedStyles.feed}`);
    outerDiv.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };


  return (
    <div className={feedStyles.feed} onScroll={getevent}>
      <GotoTop scrollPosition={scrollContition} goToTop={goToTop} />
      <div className={feedStyles.feedWrapper}>
        <div className={feedStyles.Scrollfeed} style={{paddingBottom:'60px'}}>
          {data?.map((p) => (
            <ViewpostAdmin key={p._id} post={p} reload={loadPageDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
