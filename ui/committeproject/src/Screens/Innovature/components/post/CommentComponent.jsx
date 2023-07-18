import React, { useEffect, useState } from "react";
import { Avatar, TextField, TextareaAutosize } from "@material-ui/core";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS file
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Dates from "../SharedPage/Dates";
import style from "./Post.module.css";
import comment from "./comment.module.css";
import "./swal.css";
import SendIcon from "@mui/icons-material/Send";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import API_URL from "../../../../api/API_URL";
import EmojiPickerComponent from "./EmojiPickerComponent";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import { confirmAlert } from "react-confirm-alert";

function CommentComponent({ share, value, id, postId, reloadComment }) {
  const pasedValue = localStorage();
  const userIdGlobal = pasedValue.data._id;
  const [optionForEditComment, setOptionForEditComment] = useState(false);
  const [Comment, setComment] = useState(value?.Comment);
  const MAX_COMMENT_LENGTH = 1014;
  const [disabled, setDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handleOpenEditComment = () => {
    setAnchorEl3(null);
    setOptionForEditComment(!optionForEditComment);
  };

  const flag = userIdGlobal === value?.UserId;

  const handleClickHoverModal3DotOpen = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleCloseComment3Dot = () => {
    setAnchorEl3(null);
  };
  const handleCommentEdit = (event) => {
    const inputLength = event.target.value?.length;
    if (inputLength < MAX_COMMENT_LENGTH) {
      setComment(event.target.value);
    }
    if (inputLength === 0) {
      setDisabled(true);
      setComment("");
    } else if (inputLength > MAX_COMMENT_LENGTH) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
        ToasterSuccessGlobal("Comment is too long", 40967, ["error"]);
      }
      setDisabled(true);
    } else {
      setComment(event.target.value);
      setDisabled(false);
    }
  };

  const onEmojiClick = (emoji) => {
    const inputLength = Comment.length + emoji.length;

    if (inputLength > 1000) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
        ToasterSuccessGlobal("Comment is too long", 40967, ["error"]);

      }
      setDisabled(true);
      return;
    }

    setComment(Comment + emoji);
    setDisabled(false);
  };

  const handleSubmit = () => {
    const url = API_URL.POST_EDIT_COMMENT;
    const formData = { CommentId: value?._id, Comment: Comment };
    axiosPrivate.put(url, formData).then(() => {
      reloadComment();
      setAnchorEl3(null);
      setOptionForEditComment(false);
      ToasterSuccessGlobal("Comment Edited Successfully!", 5435, ["success"]);

    }).catch((error) => {
      console.error(error);
    })
  };

  const DeleteComment = () => {
    const deleteapi = () => {
      const url = API_URL.POST_DELETE_COMMENT;
      const formData = { CommentId: value?._id, PostId: postId };
      axiosPrivate.put(url, formData).then(() => {
        reloadComment();
        setAnchorEl3(null);
        ToasterSuccessGlobal("Comment Deleted Successfully", 40967, ["success"]);

      }).catch((error) => {
        console.error(error);
      })
    };

    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: deleteapi,
        },
        {
          label: "No",
          onClick: () => {
            setAnchorEl3(null);
          },
        },
      ],
    });
  };

  return (
    <div key={value?._id} className={comment.main}>
      <div className={comment.avatar}>
        <div className={style.posttop}>
          {value?.userslist?.map((valueC) => (
            <>
              <Avatar
                src={valueC?.UserImage}
                alt={valueC?.UserName}
                className={style.postavatar}
              />
              <div key={value?._id} className={style.posttopInfo}>
                <h3>{valueC?.UserName}</h3>

                <div className={style.Date}>
                  <Dates props={value} />
                </div>
              </div>
            </>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {flag && (
            <Button onClick={handleClickHoverModal3DotOpen}>
              <BsThreeDots color="black" size={20} />
            </Button>
          )}
        </div>
        <Popover
          id={value?._id}
          open={Boolean(anchorEl3)}
          anchorEl={anchorEl3}
          onClose={handleCloseComment3Dot}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          style={{ marginLeft: "-37px" }}
        >
          <>
            <IconButton
              onClick={DeleteComment}
              variant="contained"
              color="error"
            >
              <MdDelete />
            </IconButton>
            <IconButton onClick={handleOpenEditComment} variant="contained">
              <FiEdit />
            </IconButton>
          </>
        </Popover>
      </div>
      {optionForEditComment ? (
        <div className={comment.sendComment}>
          {" "}
          <div
            style={
              share
                ? {
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "94%",
                }
                : { display: "flex", flexDirection: "row", width: "94%" }
            }
          >
            <TextField
              id={value?._id}
              style={{
                marginLeft: 11,
                width: "92%",
                borderRadius: "14px",
              }}
              multiline
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 1,
              }}
              variant="outlined"
              placeholder="Write comments......."
              value={Comment}
              onChange={handleCommentEdit}
            // helperText={`${commentInput.length}/${CHARACTER_LIMIT}`}
            // inputProps={{
            //   maxlength: CHARACTER_LIMIT,
            // }}
            />
            <EmojiPickerComponent onEmojiClickPass={onEmojiClick} />
          </div>
          <IconButton
            aria-label="delete"
            size="small"
            className="submit-button"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={disabled}
          >
            <SendIcon fontSize="small" style={{ marginTop: "10px" }} />
          </IconButton>
        </div>
      ) : (
        <pre className={comment.comment} style={{ whiteSpace: "pre-wrap" }}>
          {value?.Comment}
        </pre>
      )}
    </div>
  );
}

export default CommentComponent;
function localStorage() {
  const storedValue = window.localStorage.getItem("Profile");
  return JSON.parse(storedValue);
}
{
  /* <div className={comment.sendComment}>
<MuiThemeProvider>
  <TextField
    ref={textAreaRef}
    style={{
      marginLeft: 11,
      width: "92%",
      borderRadius: "14px",
    }}
    inputProps={{
      maxlength: CHARACTER_LIMIT,
    }}
    multiline
    InputProps={{
      inputComponent: TextareaAutosize,
      rows: 1,
    }}
    variant="outlined"
    placeholder="Write comments......."
    helperText={`${commentInput.length}/${CHARACTER_LIMIT}`}
    value={commentInput}
    onChange={handleComment}
  />
</MuiThemeProvider>
<div>
  <IconButton onClick={handleOpenEmojiPicker} aria-label="emoji-toggle">
    <BsEmojiSmile style={{ marginBottom: 8 }} />
  </IconButton>
  <Popover
    open={Boolean(anchorEl2)}
    anchorEl={anchorEl2}
    onClose={handleCloseEmojiPicker}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    <EmojiPicker
      data={data}
      onEmojiSelect={onEmojiClick}
      noCountryFlags={true}
    />
  </Popover>
</div>
<IconButton
  aria-label="delete"
  size="small"
  className="submit-button"
  variant="contained"
  color="primary"
  onClick={handleSubmit}
  disabled={disabled}
>
  <SendIcon fontSize="small" style={{ marginTop: "10px" }} />
</IconButton>
</div> */
}
