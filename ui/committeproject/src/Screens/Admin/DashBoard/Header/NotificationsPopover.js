import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Read,
  rReportedPostNoty,
} from "../../../../api/ServiceFile/ApiService";
import { getNotif } from "../../../../../src/actions/notifSlice";
import Iconify from "../../../../components/iconify";
import { createTheme, ThemeProvider } from "@mui/material/styles";


// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const style = {
    color: "black",
    minWidth: "100%",
    minHeight: "45px",
    paddingLeft: "20px",
    paddingRight: "10px",
    paddingTop: "10px",
    cursor: "pointer",
  };

  const unReadStyle = {
    ...style,
    backgroundColor: "#c2dbff",
  };

  const readStyle = {
    ...style,
    backgroundColor: "#F1F1F1",
  };

  const [notifications, setNotifications] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notificationCount, setNotificationCount] = useState(null);
  const detailed = "RepotedPost/";
  const remainingUrl = "/ReportedPost";
  const detail = "PendingList/";
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    notification();
  };

  const handleClose = () => {
    setOpen(false);
    setPage(1);
    notification();
  };

  const notification = () => {
    rReportedPostNoty(page)
      .then((response) => {
        setNotifications(response?.data[1]);
        if (response?.data[0] && response?.data[0][0]?.count > 0) {
          setNotificationCount(
            response?.data[0] && response?.data[0][0]?.count
          );
        } else {
          setNotificationCount(0);
        }
        setPage(page + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setInterval(() => {
    notification();
  }, 300000);

  const getevent = (e) => {
    if (
      e.target.scrollTop + 10 >=
      e.target.scrollHeight - e.target.clientHeight
    ) {
      {
        notification();
      }
    }
  };

  const markAsRead = (id) => {
    Read(id)
      .then((response) => {
        dispatch(getNotif({ data: Math.random(100) }));
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    notification();
  }, []);

  const NavLinkTo = (type, PostId) => {
    let to;
    if (type === 0) {
      to = detailed + PostId + remainingUrl;
    } else if (type === 1) {
      to = detail;
    }
    return to;
  };

  const ReadOrUnread = (ReadValue) => {
    let styleForRead;
    if (ReadValue === 1) {
      styleForRead = unReadStyle;
    } else {
      styleForRead = readStyle;
    }
    return styleForRead;
  };

  const CommitteeLogo = (PostedUser, UserImage) => {
    let imageSrc;

    if (PostedUser === "Recreation Committee") {
      imageSrc = "/assets/committee-removed.png";
    } else {
      imageSrc = UserImage;
    }
    return imageSrc;
  };

  const PendingPoint = (type, userName) => {
    let message;

    if (type == 0) {
      if (userName) {
        message = userName + " reported a post";
      } else {
        message = "Reported post was deleted";
      }
    } else {
      message = "point verification pending from committee";
    }
    return message;
  };

  const DeletedPostMessage = (userName) => {
    let message = "Reported post was deleted";

    if (userName) {
      message = userName + " reported a post";
    }
    return message;
  };
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#ffffff',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <IconButton
          color={open ? "primary" : "secondary"}
          onClick={handleOpen}
          sx={{ width: 40, height: 40 }}
          data-testid="notification_btn"
        >
          <Badge badgeContent={notificationCount} color="error">
            <Iconify icon="eva:bell-fill" />
          </Badge>
        </IconButton>
      </ThemeProvider>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            right: "90px",
            left: "auto !important",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {notificationCount > 0
                ? "  You have " + notificationCount + " notification"
                : "No new notification"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <div
          style={{ maxHeight: "400px", overflowY: "scroll" }}
          onScroll={getevent}
        >
          {notifications?.length > 0
            ? notifications?.map((row) => {
                return (
                  <div
                    title={"feedback  : " + row.Message}
                    key={row?._id}
                    style={{ paddingLeft: "2px", paddingRight: "2px" }}
                  >
                    {" "}
                    {}
                    {row && row?.Postlist && row?.Postlist[0]?.PostedUser ? (
                      <NavLink
                        onClick={notification}
                        to={NavLinkTo(row?.type, row?.PostId)}
                      >
                        <div
                          style={ReadOrUnread(row?.Read)}
                          data-testId="read-Btn"
                          onClick={() => markAsRead(row._id)}
                        >
                          <p
                            style={{
                              marginBottom: "0rem",
                              display: "flex",
                              gap: "5px",
                              width: "350px",
                              color: "#585555",
                              fontFamily: "sans-serif",
                              fontSize: ".8rem",
                            }}
                          >
                            <Avatar
                              alt={
                                row &&
                                row?.Postlist &&
                                row?.Postlist[0]?.PostedUser
                              }
                              style={{ width: "23px", height: "23px" }}
                              src={CommitteeLogo(
                                row &&
                                  row?.Postlist &&
                                  row?.Postlist[0]?.PostedUser,
                                row?.userlist[0]?.UserImage
                              )}
                            />{" "}
                            {PendingPoint(
                              row?.type,
                              row && row?.userlist && row?.userlist[0]?.UserName
                            )}
                          </p>
                        </div>
                      </NavLink>
                    ) : (
                      <div style={ReadOrUnread(row?.Read)}>
                        <p
                          style={{
                            marginBottom: "0rem",
                            display: "flex",
                            gap: "5px",
                            color: "#585555",
                            fontFamily: "sans-serif",
                            fontSize: ".8rem",
                          }}
                        >
                          <Avatar
                            alt={
                              row &&
                              row?.Postlist &&
                              row?.Postlist[0]?.PostedUser
                            }
                            style={{ width: "23px", height: "23px" }}
                            src={CommitteeLogo(
                              row &&
                                row?.Postlist &&
                                row?.Postlist[0]?.PostedUser,
                              row?.userlist[0]?.UserImage
                            )}
                          />{" "}
                          {DeletedPostMessage(
                            row && row?.userlist && row?.userlist[0]?.UserName
                          )}
                        </p>
                      </div>
                    )}
                    <Divider sx={{ borderStyle: "dashed" }} />
                  </div>
                );
              })
            : ""}
        </div>
        <Divider />
      </Popover>
    </>
  );
}
