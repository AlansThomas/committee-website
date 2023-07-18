import EmojiPicker from '@emoji-mart/react';
import data from "@emoji-mart/data";
import { Popover } from '@material-ui/core';
import React, { useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs';
import IconButton from "@mui/material/IconButton";



const EmojiPickerComponent = ({onEmojiClickPass}) => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleOpenEmojiPicker = (event) => {
        setAnchorEl2(event.currentTarget);
      };
    
      const handleCloseEmojiPicker = () => {
        setAnchorEl2(null);
      };
    
const onEmojiClick =(emoji)=>{
onEmojiClickPass(emoji.native)
}

    return <div>
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
        noCountryFlags={true} />
    </Popover>
  </div>
}

export default EmojiPickerComponent