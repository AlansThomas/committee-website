import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS file
import PostMessage from "../PstSender/MessageSender";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 500,
  height: "96%",
  bgcolor: "background.paper",

  p: 1,
};
const PostEditor = ({isCommitte,publicPrivateKey,postImageForEdit,postIdForEdit,PostDescription, modalOpenForPostEdit, handleCloseEditPost }) => {
  const reload =()=>{
    handleCloseEditPost()
  }
  return (
    <Modal
    
      open={modalOpenForPostEdit}
      onClose={handleCloseEditPost}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles}>
      <PostMessage isCommitte={isCommitte} publicPrivateKey={publicPrivateKey} postIdForEdit={postIdForEdit} postImageForEdit ={postImageForEdit} PostDescription={PostDescription} modalOpenForPostEdit2={true} reload={reload}/>
      </Box>
    </Modal>
  );
};

export default PostEditor;
