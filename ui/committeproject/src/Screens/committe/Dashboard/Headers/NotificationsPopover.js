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
import { getNotif } from "../../../../actions/notifSlice";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
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
  const detailed = "Home/NotifiedPost/";
  const remainingUrl = "/NotifiedPost";
  const detail = "EventPoint/";
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    notificationPost();
  };

  const handleClose = () => {
    setOpen(false);
    setPage(1);
    notificationPost();
  };

  const notificationPost = () => {
    setPage(2);
    axiosPrivate
      .get("Notification/findAllNotifyCommittee/" + 1)
      .then((response) => {
        setNotifications(response?.data[1]);
        if (response?.data[0] && response?.data[0][0]?.count > 0) {
          setNotificationCount(
            response?.data[0] && response?.data[0][0]?.count
          );
        } else {
          setNotificationCount(0);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const notification = () => {
    axiosPrivate
      .get("Notification/findAllNotifyCommittee/" + page)
      .then((response) => {
        setNotifications([...notifications, ...response?.data[1]]);
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
    axiosPrivate
      .put("Notification/readPost/" + id)
      .then((response) => {
        dispatch(getNotif({ data: Math.random(100) }));
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setInterval(() => {
    notificationPost();
  }, 300000);

  useEffect(() => {
    notificationPost();
  }, []);

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
                    key={row?._id}
                    style={{ paddingLeft: "2px", paddingRight: "2px" }}
                  >
                    {row.Message === "Admin published new points " ? (
                      <div
                        style={row?.Read === 0 ? unReadStyle : readStyle}
                        onClick={() => markAsRead(row._id)}
                      >
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
                            src={
                              row &&
                              row?.Postlist &&
                              row?.Postlist[0]?.PostedUser ===
                                "Recreation Committee"
                                ? "/assets/committee-removed.png"
                                : row?.userlist[0]?.UserImage
                            }
                          />{" "}
                          {row && row?.Postlist && row?.Postlist[0]?.PostedUser}{" "}
                          {row?.Message}
                        </p>
                      </div>
                    ) : (
                      <NavLink
                        onClick={notification}
                        to={
                          row?.PostId
                            ? detailed + row?.PostId + remainingUrl
                            : row?._id && detail
                        }
                      >
                        <div
                          style={row?.Read === 0 ? unReadStyle : readStyle}
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
                              src={
                                row &&
                                row?.Postlist &&
                                row?.Postlist[0]?.PostedUser ===
                                  "Recreation Committee"
                                  ? "/assets/committee-removed.png"
                                  : row?.userlist[0]?.UserImage
                              }
                            />{" "}
                            {row &&
                              row?.Postlist &&
                              row?.Postlist[0]?.PostedUser}{" "}
                            {row?.Message}
                          </p>
                        </div>
                      </NavLink>
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
