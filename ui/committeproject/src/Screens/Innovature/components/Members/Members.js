import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import "./Member.css";
import {useNavigate} from "react-router-dom"

export default function Members({ group, refreshimage }) {
  const Navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 120,
    },
  }));
 const navigateToUser=(id)=>{
  Navigate(`${id}`)
  window.location.reload(); // Reload the page
 }


  const classes = useStyles();

  function groupRole(role) {
    if (role === 2) {
      return "Captain"
    }
    else if(role===1){
      return "Vice captain"
    }
    else {
      return "Member"
    }
  }

  return (
    <>
      <List sx={{ height: "100%" }}>
        {group?.map((post) => (
          <ListItem  key={post.id}   onClick={() => navigateToUser(post._id)} button>
            <ListItemAvatar>
              <Avatar alt={post.UserName} src={post.UserImage} />
            </ListItemAvatar>
            <ListItemText
              title={post.UserName}
              primary={
                <Typography className={classes.wrapper}>
                  {post.UserName}
                </Typography>
              }
              secondary={
                <Typography fontSize={10}>
                  <div>
                    {groupRole(post.GroupRole)}
                  </div>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
