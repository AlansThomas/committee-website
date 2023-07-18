import clas from "./Header.module.css";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import React from "react";
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";

export default function Headers() {
  return (
    <div className={clas.topbarContainer}>
      <div className={clas.topbarLeft}>
        <Link to="/dashboardCommitte">
          <Stack direction="row" spacing={1}>
            <img
              src="/assets/committee-removed.png"
              alt="committeeLogo"
              width="35"
              height="35"
            />
            <span className={clas.logo}>Recreation</span>
          </Stack>
        </Link>
      </div>
      <div className={clas.topbarCenter}></div>
      <div className={clas.topbarRight}>
        <div className={clas.topbarLinks}></div>
        <div className={clas.topbarIcons}>
          <div className={clas.topbarIconItem}>
            <NotificationsPopover />
          </div>
        </div>

        <div className={clas.topbarIcons}>
          <div className={clas.topbarIconItem}>
            <AccountPopover />
          </div>
        </div>
      </div>
    </div>
  );
}
