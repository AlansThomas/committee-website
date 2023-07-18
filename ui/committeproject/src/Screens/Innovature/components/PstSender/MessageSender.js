import { Avatar, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { throttle, wrap } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaEraser } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { FcAddImage } from "react-icons/fc";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import "./MessageSender.css";
import "../../../committe/Home/PstSender/MessageSender.css";
// import notificationSound from "./Notification3.mp3";
import {
  postImage,
  postImageEdit,
  postImagePrivate,
  postImagePrivateEdit,
} from "../../../../api/ServiceFile/ApiServiceInno";
import { postImageEdit2 } from "../../../../api/ServiceFile/ApiServiceComitte";
import Stack from "@mui/material/Stack";

function MessageSender({
  isCommitte,
  publicPrivateKey,
  postIdForEdit,
  postImageForEdit,
  PostDescription,
  modalOpenForPostEdit2,
  reload,
}) {
  const MAX_IMAGE_SIZE = 50000000000001;
  const [data, setData] = useState("");
  const [mention, seMention] = useState();
  const [mentionPrivate, seMentionPrivate] = useState();
  const [file, setFile] = useState([]);
  const [isFileContain, setIsFileContain] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionCount, setDescriptionCount] = useState(10001);
  const [prevContentState, setPrevContentState] = useState(null);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [prevImageDeleteArray, setImageDeleteArray] = useState([]);
  const [ImageForEdit, setImageForEdit] = useState(postImageForEdit);

  const [disabled, setDisabled] = useState(true);
  const [disabledck, setDisabledck] = useState(
    modalOpenForPostEdit2 ? false : true
  );
  const [tagName, setTagName] = useState([]);
  const [unequeHasTag, setUnequeHasTag] = useState([]);
  const [publicPrivate, setPublicPrivate] = useState(
    modalOpenForPostEdit2 && publicPrivateKey === false ? false : true
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const domEditorRef = useRef(null);
  const editorRef = useRef(null);

  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(
      modalOpenForPostEdit2 ? `${PostDescription}` : "<p></p>"
    );
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  useEffect(() => {
    axiosPrivate.get(api.GET_CURRENT_USER_DETAILS).then((response) => {
      setData(response?.data);
    });
    axiosPrivate.get("users/findByNameRegexForMention").then((response) => {
      seMention(response?.data.searchList);
    });
    axiosPrivate
      .get("users/findByNameRegexForPrivateMention")
      .then((response) => {
        seMentionPrivate(response?.data.searchList);
      });
  }, []);

  const regex = /^.*\/([^\/]+\.mp4)$/;
  const isMp4 = regex.test(postImageForEdit);
  console.log(postImageForEdit, "postImageForEdit");

  function ckDisable() {
    setEditorState("");
    if (disabledck === false) {
      setDisabledck(true);
      return;
    }
    if (disabledck === true) {
      setDisabledck(false);
      return null;
    }
  }

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const clearEditor = () => {
    const emptyContentState = ContentState.createFromText("");

    setEditorState(EditorState.createWithContent(emptyContentState));
    setDescription("");
    setPreviewUrl([]);
    setDescriptionCount(10000);
    setFile([]);
    setEditorState("");
    setDisabled(true);
  };

  const onEditorStateChange = useCallback(
    throttle((editorState) => {
      setEditorState(editorState);

      const contentState = convertToRaw(editorState.getCurrentContent());
      const html = draftToHtml(contentState);

      if (prevContentState !== html) {
        handleMessage(html);
      }
    }, 500),
    [prevContentState]
  );

  function extractUserNames(text) {
    const regex =
      /<a.*?class="wysiwyg-mention".*?data-value="(.*?)".*?>@.*?<\/a>/g;
    const matches = text.match(regex) || [];

    return matches.map((match, index) => {
      const username = match.match(/data-value="(.*?)"/)[1];
      return {
        id: index,
        username,
      };
    });
  }
  function handlePastedText(text, html, editorState) {}

  function extractHashTags(text) {
    const regex = /#(\w+)/g;
    return (text.match(regex) || []).map((match, index) => ({
      id: index,
      HashTag: match.substr(1),
    }));
  }

  const handleMessage = (event) => {
    setDisabled(false);
    setPrevContentState(event);
    setDescription(event);
    const withoutTags = event
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&nbsp;/g, " ");

    setDescriptionCount(10001 - withoutTags.length);
    const usernames = extractUserNames(event).map((user) => user.username);
    const uniqueUsernames = Array.from(new Set(usernames));

    const hashTag = extractHashTags(event).map((hash) => hash.HashTag);
    setUnequeHasTag(Array.from(new Set(hashTag)));

    setTagName(uniqueUsernames);

    if (withoutTags.length < 2) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (withoutTags.length > 10001) {
      toast.error("Description is too long", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        toastId: 999,
      });
    }
  };

  function handleChange(event) {
    const fileContent = event.target.files[0];
    if (file.some((existingFile) => existingFile.name === fileContent.name)) {
      toast.error("The file has already been selected!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 831,
      });
    }

    if (fileContent.size < 1) {
      setIsFileContain(false);
    } else {
      setIsFileContain(true);
    }
    if (!fileContent) return;
    if (event.target.files[0].name.length > 100) {
      toast.error("The file name should be less than 100 characters!!!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 980,
      });
      return;
    }

    if (fileContent.size > 5000000000001) {
      setPreviewUrl([]);
      setDisabled(true);
      toast.error("The image size should be less than 5 MB", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 998,
      });
      return;
    }

    if (
      !fileContent.type.match(/^image\/(jpeg|jpg|png)$/) &&
      !fileContent.type.match(/^video\/(mp4|mov|avi|mkv)$/)
    ) {
      setFile([]);
      setPreviewUrl([]);
      setDisabled(true);
      toast.error("Please select an image or video file", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 997,
      });
      return;
    }

    setFile((current) => [...current, fileContent]);

    const reader = new FileReader();
    reader.readAsDataURL(fileContent);
    reader.onload = () => {
      setPreviewUrl([...previewUrl, reader.result]);
    };

    setDisabled(false);
  }
  const cancel = (index, pre) => {
    setDisabled(false);
    if (pre) {
      console.log(
        "🚀 ~ file: MessageSender.js:304 ~ cancel ~ imageDeleteArray:",
        prevImageDeleteArray
      );
      console.log("🚀 ~ file: MessageSender.js:301 ~ cancel ~ pre:", pre);

      const imageForPreview = ImageForEdit.filter((url) => url !== pre);
      console.log(
        "🚀 ~ file: MessageSender.js:303 ~ cancel ~ imageForPreviewLength:",
        imageForPreview.length
      );
      if (imageForPreview.length === 0) {
        setIsFileContain(false);
        setDisabled(true);
      } else {
        setIsFileContain(true);
        setDisabled(false);
      }
      console.log(
        "🚀 ~ file: MessageSender.js:305 ~ cancel ~ imageForPreview.length == 0:",
        imageForPreview.length == 0
      );
      setImageForEdit(imageForPreview);

      postImageForEdit.filter((url, index) => {
        console.log(
          "🚀 ~ file: MessageSender.js:314 ~ postImageForEdit.filter ~ index:",
          index
        );
        if (url === pre) {
          pre &&
            setImageDeleteArray((prevImageDeleteArray) => [
              ...prevImageDeleteArray,
              index,
            ]);

          return false; // Exclude the element from the filtered array
        }
        return true; // Include other elements in the filtered array
      });
    } else {
      setPreviewUrl((prevPreviewUrl) =>
        prevPreviewUrl.filter((img, indexOfImg) => index !== indexOfImg)
      );
      const temp = (prevFile) =>
        prevFile.filter((file, indexOfImg) => index !== indexOfImg);

      const filteredArray = temp(file);
      setFile(filteredArray);
      if (filteredArray.length === 0) {
        setIsFileContain(false);
        setDisabled(true);
      } else {
        setIsFileContain(true);
        setDisabled(false);
      }
    }
  };

  const postImageEditDivergentFunction = (formData) => {
    return isCommitte ? postImageEdit2(formData) : postImageEdit(formData);
  };

  const handleSubmit = async (event) => {
    // console.log("🚀 ~ file: submit.js:333 ~ cancel ~ imageForPreviewLength:", ImageForEdit.length)
    const withoutTags2 = description
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&nbsp;/g, " ");

    const onlySpacesAndPTags = /^((&nbsp;|\s|<p><\/p>)+)$/;

    setDisabled(true);

    event.preventDefault();
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("The image size should be less than 5 MB", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 996,
      });
    } else if (withoutTags2.length < 10002) {
      let text = description;

      if (!isFileContain) {
        if (onlySpacesAndPTags.test(withoutTags2)) {
          toast.error(
            "Only whitespace without image is not allowed in the description",
            {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              toastId: 997,
            }
          );
          return;
        }
      } else {
        if (onlySpacesAndPTags.test(withoutTags2)) {
          text = "<p></p>";
        }
      }
      const renderedText = text.replace(
        /(#\w+)/g,
        (match, p1) =>
          `<a href="${api.GET_UI_BASE_URL}dashboardInno/feed?query=${p1.slice(
            1
          )}">${p1}</a>`
      );
      const storedValue = window.localStorage.getItem("Profile");
      const pasedValue = JSON.parse(storedValue);

      const formData = new FormData();
      file.forEach((specFile) => {
        formData.append("PostImage", specFile);
      });
      formData.append("PostDescription", renderedText);
      formData.append("UserId", pasedValue.data._id);

      for (const entry of formData.entries()) {
      }

      {
        modalOpenForPostEdit2 && formData.append("postId", postIdForEdit);
        formData.append("imageStatus", 1);
      }

      // {
      //   modalOpenForPostEdit2 &&
      //     formData.append("imageDeleteArray", prevImageDeleteArray);
      // }

      for (let i = 0; i < prevImageDeleteArray.length; i++) {
        formData.append("imageDeleteArray", prevImageDeleteArray[i]);
      }

      for (let i = 0; i < tagName.length; i++) {
        formData.append("Tags[]", tagName[i]);
      }
      for (let i = 0; i < unequeHasTag.length; i++) {
        formData.append("HashTags[]", unequeHasTag[i]);
      }

      if (publicPrivate) {
        try {
          (await modalOpenForPostEdit2)
            ? postImageEditDivergentFunction(formData)
                .then(() => {
                  // const audio = new Audio(notificationSound);
                  // audio.play();
                  setDescription("");
                  setPreviewUrl([]);
                  setFile([]);
                  setIsFileContain(false);
                  reload();
                  setEditorState("");
                  setDisabled(true);
                  ckDisable();
                  clearEditor();
                  toast.success("Posted Modified successfully!", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: 995,
                  });
                })
                .catch((err) => {
                  toast.error(err.response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: 994,
                  });
                  setDisabled(false);
                  setFile([]);
                  setIsFileContain(false);
                })
            : postImage(formData)
                .then(() => {
                  // const audio = new Audio(notificationSound);
                  // audio.play();
                  setDescription("");
                  setPreviewUrl([]);
                  setFile([]);
                  setIsFileContain(false);
                  reload();
                  setEditorState("");
                  setDisabled(true);
                  ckDisable();
                  clearEditor();
                  toast.success("Posted successfully!", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: 995,
                  });
                })
                .catch((err) => {
                  toast.error(err.response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: 994,
                  });
                  setDisabled(false);
                  setFile([]);
                  setIsFileContain(false);
                });
        } catch (error) {}
      } else {
        (await modalOpenForPostEdit2)
          ? postImagePrivateEdit(formData)
              .then(() => {
                // const audio = new Audio(notificationSound);
                // audio.play();

                setDescription("");
                setPreviewUrl([]);
                setFile([]);
                setIsFileContain(false);
                reload();
                setEditorState("");
                setDisabled(true);
                ckDisable();
                clearEditor();
                toast.success("Posted successfully!", {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  toastId: 995,
                });
              })
              .catch((err) => {
                toast.error(err.response.data.message, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  toastId: 994,
                });
                setDisabled(false);
                setFile([]);
                setIsFileContain(false);
              })
          : postImagePrivate(formData)
              .then(() => {
                // const audio = new Audio(notificationSound);
                // audio.play();
                setDescription("");
                setPreviewUrl([]);
                setFile([]);
                setIsFileContain(false);
                reload();
                setEditorState("");
                setDisabled(true);
                ckDisable();
                clearEditor();
                toast.success("Posted successfully!", {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  toastId: 995,
                });
              })
              .catch((err) => {
                toast.error(err.response.data.message, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  toastId: 994,
                });
                setDisabled(false);
                setFile([]);
                setIsFileContain(false);
              });
      }
    } else {
      toast.error("Description is too large", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const theme = createMuiTheme({
    props: {
      MuiTextField: {
        variant: "outlined",
      },
    },
  });
  const switchPublic = () => {
    if (publicPrivate === false) {
      setPublicPrivate(true);

      return null;
    }
    if (publicPrivate === true) {
      setPublicPrivate(false);

      return null;
    }
  };
  useEffect(() => {
    if (domEditorRef.current) {
      domEditorRef.current.focusEditor();
    }
  }, [disabledck]);

  const handleFileInputClick = (event) => {
    event.target.value = null; // Reset the file input value
  };

  return (
    <div
      className={modalOpenForPostEdit2 ? "messageSenderEdit" : "messageSender"}
    >
      <div
        className={
          modalOpenForPostEdit2
            ? "messageSender_topModal"
            : disabledck
            ? "messageSender_top100px"
            : "messageSender_top"
        }
      >
        <Avatar src={data?.UserImage} alt={data?.UserName} />

        <MuiThemeProvider theme={theme}>
          {disabledck === true ? (
            <>
              <div
                className="inputUdo"
                onClick={() => setDisabledck(false)}
                onMouseDown={() => {
                  setDisabledck(true);

                  setTimeout(() => {
                    if (disabledck) {
                      setDisabledck(false);
                    }
                  }, 1);
                }}
                onTouchStart={() => {
                  setDisabledck(true);
                }}
                onMouseUp={() => {
                  setDisabledck(false);
                }}
                onTouchEnd={() => {
                  setDisabledck(false);
                }}
              >
                <InputEmoji
                  placeholder="What's on your mind Innovator"
                  value={description}
                  onChange={handleMessage}
                  height={25}
                />
              </div>
            </>
          ) : (
            <>
              <Editor
                ref={domEditorRef}
                editorState={editorState}
                wrapperClassName={
                  modalOpenForPostEdit2 ? "wrapperClassName" : "demo-wrapper"
                }
                editorClassName={
                  modalOpenForPostEdit2 ? "editorClassName" : "demo-editor"
                }
                onEditorStateChange={onEditorStateChange}
                handlePastedText={handlePastedText}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "emoji",
                    // "embeded",
                    "history",
                  ],
                  link: {
                    options: ["link"],
                  },
                  inline: {
                    inDropdown: true,
                    options: [
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "monospace",
                      "superscript",
                      "subscript",
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                    ],
                  },
                  fontSize: {
                    inDropdown: true,
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                  },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  history: { inDropdown: false },
                }}
                mention={{
                  separator: " ",
                  trigger: "@",
                  suggestions: publicPrivate ? mention : mentionPrivate,
                }}
                hashtag={{}}
              />
            </>
          )}
        </MuiThemeProvider>

        {file?.length <= 4 && (
          <FormControl sx={{ m: -0.6 }}>
            <div class="upload-btn-wrapperA">
              <FcAddImage className="image-button" size={25} />
              <input
                title="Select post"
                className="input-btn"
                onChange={handleChange}
                onClick={handleFileInputClick}
                type="file"
                name="myfile"
                accept=".png, .jpg, .jpeg, .mp4"
              />
            </div>
            {!disabledck && !modalOpenForPostEdit2 && (
              <>
                <div style={{ marginTop: "15px" }}>
                  <Switch
                    {...label}
                    defaultChecked={publicPrivate}
                    onClick={switchPublic}
                    // disabled={!disabled}
                  />
                </div>
              </>
            )}
            {!disabledck && (
              <IconButton
                size="medium"
                className="submit-button"
                disabled={disabled}
                onClick={clearEditor}
                variant="contained"
                color="inherit"
                title="clear Editor"
                style={{ marginTop: "15px" }}
              >
                <FaEraser />
              </IconButton>
            )}
          </FormControl>
        )}
        <div>
          <IconButton
            aria-label="delete"
            size="small"
            className="submit-button"
            disabled={disabled}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            <SendIcon fontSize="small" />
          </IconButton>
          {publicPrivate !== true ? (
            <>
              {disabledck !== true && (
                <div style={{ marginTop: "18px" }}>
                  <RiGitRepositoryPrivateLine
                    style={{ marginLeft: "5px" }}
                    title="Private Post"
                    fontSize="25px"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {disabledck !== true && (
                <div style={{ marginTop: "18px" }}>
                  <MdPublic
                    style={{ marginLeft: "5px" }}
                    title="Public Post"
                    fontSize="25px"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {disabledck ? (
        <></>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "4%",
              fontSize: 10,
            }}
          >
            {descriptionCount}
          </div>
        </>
      )}
      <div>
        {file?.length > 0 && (
          <>
            {previewUrl?.length > 0 &&
              previewUrl?.map((pre, index) => (
                <div onClick={() => cancel(index)} className="images">
                  <figure>
                    {file[index]?.type == "video/mp4" ? (
                      <video controls style={{ maxHeight: "193px" }}>
                        <source src={pre} type="video/ogg" />
                      </video>
                    ) : (
                      <img
                        className="imagesUnderImage"
                        src={pre}
                        alt="sample-image"
                      />
                    )}
                  </figure>
                </div>
              ))}
          </>
        )}

        <div class="clearfix"></div>
      </div>
      <div>
        {modalOpenForPostEdit2 && (
          <>
            {ImageForEdit?.length > 0 &&
              ImageForEdit.map((url, index) => {
                const fileExtension = url.split(".").pop().toLowerCase(); // Get the file extension
                return (
                  <div onClick={() => cancel(index, url)} className="images">
                    <figure>
                      {fileExtension === "mp4" ? ( // Check if file extension is mp4 (case-insensitive)
                        <video controls style={{ maxHeight: "193px" }}>
                          <source src={url} type="video/ogg" />
                        </video>
                      ) : (
                        <img
                          className="imagesUnderImage"
                          src={url}
                          alt="sample-image"
                        />
                      )}
                    </figure>
                  </div>
                );
              })}
          </>
        )}
        <div class="clearfix"></div>
      </div>
    </div>
  );
}

export default MessageSender;
