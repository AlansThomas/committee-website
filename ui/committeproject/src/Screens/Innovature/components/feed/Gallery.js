
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";

import React, { useEffect, useState } from "react";

import api from "../../../../api/API_URL";
import Slider from "./Slider";
const Gallery = () => {
  const [list, setList] = useState([]);
  const [listCount, setListCount] = useState([]);


  useEffect(() => {
    getWeekBirthday();


    
  }, []);
  const getWeekBirthday = () => {
    axiosPrivate
      .get(api.BIRTHDAY_CURRENT_WEEK)
      .then((res) => {
        const newList = res.data.map((item) => (
          {
          original: item
            ? item
            : "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg",
          thumbnail: item
            ? item
            : "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg",
            
        }));
        setListCount(newList);
     
        if (newList.length === 0) {
          setList([
            {
              original:
                "https://media.tenor.com/meBqx8zr8R0AAAAC/sad-crying.gif",
              thumbnail:
                "https://media.tenor.com/meBqx8zr8R0AAAAC/sad-crying.gif",
            },
          ]);
        
        } else {
          setList(newList);
        }
      })
  };
  // text-align: center;
  // font-size: 19px;
  // line-height: 20px;
  // letter-spacing: 0.2em;
  // font-weight: 600;
  // margin-top: 14px;
  // font-weight: 300;
  return (
    <div>
      {listCount.length === 0 ? (
        <>
           <p style={{textAlign:'center',fontSize:'19px',lineHeight: '20px',letterSpacing:' 0.09em',fontWeight:'300',marginTop:'14px',paddingBottom:'15px'}}> No Glimpses this week</p>
        </>
      ) : (
        <>
           <p style={{textAlign:'center',fontSize:'19px',lineHeight: '20px',letterSpacing:' 0.2em',fontWeight:'300',marginTop:'14px',paddingBottom:'15px'}}>Events,Birthdays&Glimpses</p>
        </>
      )}

      <Slider images={list} />
    </div>
  );
};

export default Gallery;
