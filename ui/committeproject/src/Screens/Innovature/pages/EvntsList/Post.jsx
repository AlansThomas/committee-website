import React from "react";

import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { AiFillFilePdf, AiFillFilePpt, AiFillFileWord } from "react-icons/ai";
import Dates from "../../components/SharedPage/Dates";
import style from "./Event.module.css";

import { Avatar } from "@material-ui/core";

export default function Post({ post }) {
  const fileExtension = post.File.split(".")[3];

  let icon;
  switch (fileExtension) {
    case "pdf":
      icon = (
        <div className={style.postIcon}>
          <a href={post.File} download>
            <AiFillFilePdf className={style.svgicons} />
          </a>
        </div>
      );
      break;
    case "doc":
    case "docx":
      icon = (
        <div className={style.postIcon}>
          <a href={post.File} download>
            <AiFillFileWord className={style.svgicons} />
          </a>
        </div>
      );
      break;
    case "ppt":
    case "pptx":
      icon = (
        <div className={style.postIcon}>
          <a href={post.File} download>
            <AiFillFilePpt className={style.svgicons} />
          </a>
        </div>
      );
      break;
    case "jpg":
    case "png":
    case "jpeg":
      icon = (
        <div className={style.postimage}>
          <a href={post.File} download>
            <img className={style.pos} src={post.File} alt="" />
          </a>
        </div>
      );
      break;
    case "mp4":
      icon = (
        <div className={style.postimage}>
          <a href={post.File} download>
            <video className={style.pos} controls>
              <source src={post.File} type="video/ogg" />
            </video>
          </a>
        </div>
      );
      break;
    default:
      icon = (
        <div className={style.postIcon}>
          <a href={post.File} download>
            <InsertDriveFileRoundedIcon className={style.svgicons} />
          </a>
        </div>
      );
  }

  return (
    <div className={style.post}>
      <div className={style.posttop}>
        <Avatar
          src="/assets/committee-removed.png"
          className={style.postavatar}
        />

        <div key={post._id} className={style.posttopInfo}>
          <h3>Committee</h3>
          <p>
            <Dates props={post} />
          </p>
        </div>
      </div>

      <div className={style.postbottom}>
        <h5>{post.EventName}</h5>
        <div
          className={style.descriptiontext}
          dangerouslySetInnerHTML={{
            __html: post.EventDescription,
          }}
        >
        </div>
      </div>

      {icon}
    </div>
  );
}
