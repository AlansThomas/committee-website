import footerCss from "./footer.module.css";
import React from "react";

export default function footer() {
  return (
    <div className={footerCss.topbarContainer}>
      <div className={footerCss.topbarLeft}>
        <span className={footerCss.logo}>Recreation </span>
      </div>
      <div className={footerCss.topbarCenter}></div>
      <div className={footerCss.topbarRight}>
        <div className={footerCss.topbarLinks}></div>
        <div className={footerCss.topbarIcons}></div>
      </div>
    </div>
  );
}
