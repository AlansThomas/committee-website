import { Avatar, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { FcAddImage } from "react-icons/fc";
import InputEmoji from "react-input-emoji";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/commiteeIntercepters";
import "./MessageSender.css";
import "../../../Innovature/components/PstSender/MessageSender.css";

import ToasterGlobal from "../../../../TosterGlobal/ToasterGlobal";

function MessageSender({ reload }) {
  const MAX_IMAGE_SIZE = 5000001;
  const [data, setData] = useState("");
  const [mention, seMention] = useState();
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");
  const [descriptionCount, setDescriptionCount] = useState(10001);

  const [previewUrl, setPreviewUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabledck, setDisabledck] = useState(true);
  const [tagName, setTagName] = useState([]);
  const [isFileContain, setIsFileContain] = useState(false);
  const [prevContentState, setPrevContentState] = useState(null);

  const [unequeHasTag, setUnequeHasTag] = useState([]);
  const [url, setUrl] = useState("");
  const domEditorRef = useRef(null);

  useEffect(() => {
    setUrl(api.POST_POST_IMAGE);
    axiosPrivate.get(api.GET_CURRENT_USER_DETAILS).then((response) => {
      setData(response?.data);
    });
    axiosPrivate.get("users/findByNameRegexForMention").then((response) => {
      seMention(response?.data.searchList);
    });
  }, []);

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

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDisabled(false);

    const contentState = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(contentState);

    if (prevContentState !== html) {
      handleMessage(html);
    }
  };

  const handleMessage = (event) => {
    setPrevContentState(event);

    setDescription(event);

    let withoutTags = event
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&nbsp;/g, " ");

    setDescriptionCount(10001 - withoutTags.length);

    const usernames = extractUserNames(event).map((user) => user.username);
    const uniqueUsernames = [...new Set(usernames)];

    const hashTags = extractHashTags(event).map((hash) => hash.HashTag);
    setUnequeHasTag([...new Set(hashTags)]);

    setTagName(uniqueUsernames);

    if (withoutTags.length < 2) {
      if (file) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }

    if (withoutTags.length > 10001) {
      ToasterGlobal("Description is too long", 999, ["error"]);
    }
  };

  function handleChange(event) {
    console.log("insde this");
    const fileContent = event.target.files[0];
    console.log("fileContain", fileContent);
    if (file.some((existingFile) => existingFile.name === fileContent.name)) {
      ToasterGlobal("The file has already been selected!", 831, ["error"]);
    }

    if (file.length > 4) {
      console.log("More than 5 files");
      return;
    }

    if (fileContent.size < 1) {
      setIsFileContain(false);
    } else {
      setIsFileContain(true);
    }
    if (!fileContent) return;
    if (event.target.files[0].name.length > 100) {
      ToasterGlobal(
        "The file name should be less than 100 characters!!!",
        980,
        ["error"]
      );

      return;
    }

    if (fileContent.size > 500000001) {
      setPreviewUrl([]);
      setDisabled(true);
      ToasterGlobal("The image size should be less than 5 MB", 998, ["error"]);

      return;
    }

    if (
      !fileContent.type.match(/^image\/(jpeg|jpg|png)$/) &&
      !fileContent.type.match(/^video\/(mp4|mov|avi|mkv)$/)
    ) {
      setFile([]);
      setPreviewUrl([]);
      setDisabled(true);
      ToasterGlobal("Please select an image or video file", 997, ["error"]);

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

  const cancel = (index) => {
    setPreviewUrl((pre) =>
      pre.filter((img, indexOfImg) => index !== indexOfImg)
    );
    if (description.length > 8 || previewUrl.length !== 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setFile((pre) => pre.filter((file, indexOfImg) => index !== indexOfImg));
  };

  const validateImageSize = (file) => {
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error("The image size should be less than 5 MB");
    }
  };

  const buildFormData = (
    file,
    formattedDescription,
    userId,
    tagName,
    unequeHasTag
  ) => {
    return formDataCreate(
      file,
      formattedDescription,
      userId,
      tagName,
      unequeHasTag
    );
  };

  const MAX_DESCRIPTION_LENGTH = 10001;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedValue = window.localStorage.getItem("Profile");
      const parsedValue = JSON.parse(storedValue);

      const withoutTags2 = validateDescription(description, isFileContain);
      validateImageSize(file);

      if (withoutTags2.length > MAX_DESCRIPTION_LENGTH) {
        throw new Error("Description is too long");
      }

      const formattedDescription = formatDescription(description);
      const formData = buildFormData(
        file,
        formattedDescription,
        parsedValue.data._id,
        tagName,
        unequeHasTag
      );

      setUrl(api.POST_POST_IMAGE);
      setDisabled(true);

      await axiosPrivate.post(url, formData);

      setDescription("");
      setPreviewUrl([]);
      setFile([]);
      reload();
      setEditorState("");
      setDisabled(true);
      ckDisable();
      setIsFileContain(false);

      ToasterGlobal("Posted successfully!", 995, ["success"]);
    } catch (error) {
      if (error.response) {
        ToasterGlobal(
          error.response.data.message || "Something went wrong!!",
          994,
          ["error"]
        );
      } else {
        ToasterGlobal(error.message || "Something went wrong!!", 994, [
          "error",
        ]);
      }
    }
  };

  const theme = createMuiTheme({
    props: {
      MuiTextField: {
        variant: "outlined",
      },
    },
  });

  useEffect(() => {
    if (domEditorRef.current) {
      domEditorRef.current.focusEditor();
    }
  }, [disabledck]);

  const handleFileInputClick = (event) => {
    event.target.value = null; // Reset the file input value
  };

  return (
    <div className="messageSenderPost">
      <div
        className={
          disabledck === true ? "messageSender_top100px" : "messageSender_top"
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
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
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
                  fontFamily: {
                    inDropdown: true,
                    options: [
                      "Arial",
                      "Georgia",
                      "Impact",
                      "Tahoma",
                      "Times New Roman",
                      "Verdana",
                    ],
                  },

                  list: { inDropdown: true },

                  textAlign: { inDropdown: true },
                  history: { inDropdown: false },
                }}
                mention={{
                  separator: " ",
                  trigger: "@",
                  suggestions: mention,
                }}
                hashtag={{}}
              />
            </>
          )}
        </MuiThemeProvider>

        {/* <IconButton
          aria-label="delete"
          size="small"
          className="submit-button"
          onClick={ckDisable}
          variant="contained"
        >
          <TbEdit title="switch input" size={24} />
        </IconButton> */}
        {file.length <= 4 && (
          <FormControl sx={{ m: -0.6 }}>
            <div class="upload-btn-wrapperA">
              <FcAddImage className="image-button" size={25} />

              <input
                title="Select Post"
                className="input-btn"
                onChange={handleChange}
                onClick={handleFileInputClick}
                type="file"
                name="myfile"
                accept=".png, .jpg, .jpeg, .mp4"
              />
            </div>
          </FormControl>
        )}
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
        {file.length > 0 && (
          <>
            {previewUrl.length > 0 &&
              previewUrl.map((pre, index) => (
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
    </div>
  );
}

export default MessageSender;

function formDataCreate(
  file,
  formattedDescription,
  userId,
  tagName,
  unequeHasTag
) {
  const formData = new FormData();

  file.forEach((specFile) => {
    formData.append("PostImage", specFile);
  });
  formData.append("PostDescription", formattedDescription);
  formData.append("UserId", userId);

  for (const tag of tagName) {
    formData.append("Tags[]", tag);
  }

  for (const hashtag of unequeHasTag) {
    formData.append("HashTags[]", hashtag);
  }

  return formData;
}

const formatDescription = (description) => {
  return description.replace(
    /(#\w+)/g,
    (match, p1) =>
      `<a href="${api.GET_UI_BASE_URL}dashboardInno/feed?search=${p1.slice(
        1
      )}">${p1}</a>`
  );
};
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
function extractHashTags(text) {
  const regex = /#(\w+)/g;
  return (text.match(regex) || []).map((match, index) => ({
    id: index,
    HashTag: match.substr(1),
  }));
}

const validateDescription = (description, isFileContain) => {
  const withoutTags2 = description
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&nbsp;/g, " ");
  const onlySpacesAndPTags = /^((&nbsp;|\s|<p><\/p>)+)$/;

  if (!isFileContain && onlySpacesAndPTags.test(withoutTags2)) {
    throw new Error(
      "Only whitespace without image is not allowed in the description"
    );
  }

  return withoutTags2;
};
