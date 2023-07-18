import classes from "./header.module.css";
import AccountPopover from "./AccountPopover";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import React from "react";
import NotificationsPopover from './NotificationsPopover'
export default function header() {
  return (
    <div className={classes.topbarContainer} data-testid="admin-header">
      <div className={classes.topbarLeft}>
        <Link to="/dashboard/app">
          <Stack direction="row" spacing={1}>
            <img
              src="/assets/committee-removed.png"
              alt="committeeLogo"
              width="35"
              height="35"
            />
            <span className={classes.logo}>Recreation</span>
          </Stack>
        </Link>
      </div>
      <div className={classes.topbarCenter}></div>
      <div className={classes.topbarRight}>
        <div className={classes.topbarLinks}></div>
        <div className={classes.topbarIcons}>
          <div className={classes.topbarIconItems}>
            <NotificationsPopover />
          </div>
        </div>
        <div className={classes.topbarIcons}>
          <div className={classes.topbarIconItem}>
            <AccountPopover />
          </div>
        </div>
      </div>
    </div>
  );
}
