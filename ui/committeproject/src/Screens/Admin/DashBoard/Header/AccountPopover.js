import React, { useState } from "react";
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
import account from "../../../../_mock/account";

import { useNavigate } from "react-router-dom";

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <IconButton
        data-testid="profile-btn"
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
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
            {localStorage.getItem("loggedInUser")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {localStorage.getItem("LoggedInEmail")}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem data-testId="logout-Btn" onClick={logout} sx={{ m: 1 }}>
          <div> Logout</div>
        </MenuItem>
      </Popover>
    </>
  );
}
