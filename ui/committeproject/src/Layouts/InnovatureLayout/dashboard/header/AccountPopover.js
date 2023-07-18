import React, { useState, useEffect } from "react";
// @mui
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// mocks_
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setkeydata } from "../../../../actions/ClearSearchData";
import "../../../../Screens/Innovature/components/topbar/topbar.css";
import { userDetails } from "../../../../api/ServiceFile/ApiServiceInno";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({ refreshimage }) {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkRole = localStorage.getItem("LoggedInUserType");

  function clearSearchData(clr) {
    dispatch(setkeydata({ data: clr }));
  }

  const switchToCommittee = async () => {
    try {
      localStorage.setItem("toggleId", 1);
      navigate("/dashboardCommitte/Home");
      localStorage.setItem("Logintype", 1);
    } catch (error) {
      console.error(error);
    }
  };

  const Profile = () => {
    handleClose();
    navigate("/dashboardInno/profile");
  };

  const [showDiv] = useState(checkRole == 1);

  //react-router-dom navigate

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    reload();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const reload = () => {
    userDetails().then((response) => {
      setData(response?.data);
    });
  };
  useEffect(() => {
    reload();
  }, [refreshimage]);

  return (
    <>
      <IconButton
        data-testId="Open-Btn"
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={data?.UserImage} alt={data?.UserName} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            right: "10px",
            left: "auto !important",
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {data?.UserName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {data?.Email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          sx={{ m: 1 }}
          data-testId="profile-Btn"
          onClick={() => {
            Profile();
            clearSearchData(false);
          }}
          title="View Profile"
        >
          <div> Profile</div>
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem data-testId="logout-Btn" onClick={logout} sx={{ m: 1 }}>
          <div> Logout</div>
        </MenuItem>
        {showDiv ? (
          <MenuItem
            data-testId="switch-Btn"
            onClick={switchToCommittee}
            sx={{ m: 1 }}
            title="Switch to Committee"
          >
            <span>Committee</span>
          </MenuItem>
        ) : null}
      </Popover>
    </>
  );
}
