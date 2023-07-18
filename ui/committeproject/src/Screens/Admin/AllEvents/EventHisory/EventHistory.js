import CloseIcon from "@mui/icons-material/Close";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ScoreboardOutlinedIcon from "@mui/icons-material/ScoreboardOutlined";
import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import EventHistoryStyles from "./EventHistory.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  getEventGroupGameList,
  GetEventWiseGroup,
  GsetQuarterEvents,
  updatPoint,
} from "../../../../api/ServiceFile/ApiService";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 300,
  },
}));

const columns = [
  { id: "Events", label: "Events", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 150 },
  { id: "file", label: "Files", minWidth: 100 },
];
export default function EventHistory() {
  const classes = useStyles();
  // validations===========================================================================================
  const [gameNameError, SetGameNameError] = useState(null);

  //Pagination==============================================================================================
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [event, setEventList] = useState([]);
  const maxItemsPerPage = event?.length <= 5 ? 1 : Math.ceil(event?.length / 5);

  const handleChangePage = (event4, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // Modal opening===========================================================================================
  const [GameEditModal, setEditGameModalOpen] = useState(false);
  const handleEditGameModalOpen = () => {
    setEditGameModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditGameModalOpen(false);
    setGroupId(null);
    SetGameNameError(null);
    setGames(null);
    setGamePoint({ ...gamePoint, EventId: "", GroupId: "", data: [] });
    setPointError({});
    setEditGameData([]);
    sessionStorage.clear();
  };
  const [publishFlag, setPublisFlag] = useState(true);
  // Event list =============================================================================================

  const EventList = () => {
    GsetQuarterEvents().then((response) => {
      setEventList(response.data);
    });
  };

  //Listing Groups ================================================================================================

  const [groupList, setGroupList] = useState([]);
  const listGroups = (eId) => {
    GetEventWiseGroup(eId).then((response) => {
      setGroupList(response.data);
    });
  };

  const EventClick = (eId) => {
    listGroups(eId);
    sessionStorage.setItem("eventId", eId);
  };

  const [groupID, setGroupId] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    let groupIDs = e.target.value._id.GroupId;
    if (groupIDs === null) {
      SetGameNameError("Please Select a group");
    } else {
      setGroupId(groupIDs);
      SetGameNameError(null);
      setGames(null);
    }
    getEditGroupId(groupIDs);
  };

  const [grpPoints] = useState({
    EventId: "",
    GroupId: "",
  });

  const [games, setGames] = useState(null);

  const getEditGroupId = (id) => {
    sessionStorage.setItem("groupId", id);
    grpPoints.EventId = sessionStorage.getItem("eventId");
    grpPoints.GroupId = sessionStorage.getItem("groupId");
    getEventGroupGameList(grpPoints).then((response) => {
      setGames(response.data);

      if (response.data.length > 0) {
        setPublisFlag(true);
      } else {
        setPublisFlag(false);
      }
    });
  };
  const [pointError, setPointError] = useState({});

  const onInputChangeEdit = (e, index) => {
    switch (true) {
      case !/^[0-9]*$/.test(e.target.value):
        setPointError({
          ...pointError,
          [`${index}`]: "Enter a valid number",
        });
        break;
      case e.target.value.length > 4:
        setPointError({
          ...pointError,
          [`${index}`]: "Maximum 4 entries are allowed",
        });
        break;
      case e.target.value.length === 0:
        setPointError({
          ...pointError,
          [`${index}`]: "Please enter a score",
        });
        break;
      default:
        const error = pointError;
        delete error[index];
        setPointError(error);
        break;
    }
    e.preventDefault();
  };

  const ini = useRef();
  const [gamePoint, setGamePoint] = useState({
    EventId: sessionStorage.getItem("eventId"),
    GroupId: sessionStorage.getItem("groupId"),
    data: [],
  });
  const getEditGameId = (value, gameId) => {
    sessionStorage.setItem("EditGameId", gameId);
  };
  ini.current = gamePoint;
  const [gameEditData, setEditGameData] = useState([]);

  // Submit Points======================================================================================

  const publishPoints = () => {
    setGamePoint([]);
    setGamePoint({
      ...gamePoint,
      EventId: sessionStorage.getItem("eventId"),
    });
    setGamePoint({
      ...gamePoint,
      GroupId: sessionStorage.getItem("groupId"),
    });
    let dataset = [];
    for (const [key, value] of Object.entries(gameEditData)) {
      dataset.push({ GameId: key, TotalPoint: value });
    }
    let obj = {};

    obj = {
      GroupId: sessionStorage.getItem("groupId"),
      EventId: sessionStorage.getItem("eventId"),
      Data: dataset,
    };
    setGamePoint({ ...gamePoint, data: dataset });
    updatPoint(obj)
      .then((response) => {
        ToasterSuccessGlobal("Point published to committee", 69, ["success"]);
        EventList();
        setGames(null);
        setGroupId(null);
        SetGameNameError(null);
        setPointError({});
        setGamePoint({
          ...gamePoint,
          EventId: "",
          GroupId: "",
          data: [],
        });
        setEditGameData([]);
        setEditGameModalOpen(false);
        sessionStorage.clear();
        dataset = [];
        obj = {};
      })
      .catch((err) => {
        ToasterSuccessGlobal("Oops Something went wrong", 68, ["error"]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        publishPoints();
      }
    } catch (error) {
      SetGameNameError(error.message);
    }
  };

  const isFormValid = () => {
    if (groupID === null) {
      throw new Error("Please Select a group");
    }
    const { length: pointErrorLength } = Object.keys(pointError);
    return pointErrorLength === 0;
  };

  useEffect(() => {
    EventList();
  }, []);

  // Point Table =================================================================================================
  return (
    <>
      <Helmet>
        <title> Admin | Point Table </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      ></Stack>
      <div className={EventHistoryStyles.eventhistorycard}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "rgb(155 209 242)",
                        color: "black",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ backgroundColor: "rgb(155 209 242)" }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {event?.length > 0 ? (
                  event
                    .slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      return (
                        <TableRow
                          key={row._id}
                          className={EventHistoryStyles.accordionHover}
                        >
                          <TableCell>{row.EventName}</TableCell>
                          <TableCell
                            sx={{ wordWrap: "break-word", maxWidth: "250px" }}
                            dangerouslySetInnerHTML={{
                              __html: row?.EventDescription,
                            }}
                          ></TableCell>
                          <TableCell>
                            <a href={row.File} download>
                              <FileCopyIcon
                                className={EventHistoryStyles.fileIcon}
                              />
                            </a>
                          </TableCell>
                          <TableCell
                            onClick={() => EventClick(row._id)}
                            title="add,edit or publish points"
                          >
                            <Button
                              onClick={handleEditGameModalOpen}
                              data-testid="modalopn_btn"
                            >
                              <ScoreboardOutlinedIcon
                                className={EventHistoryStyles.editIcon}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "left" }}>
                      <img
                        alt="committee icon"
                        src="/favicon/logo_comittee.png"
                        className={EventHistoryStyles.EentHistoryPageLoding}
                        width="300"
                        height="300"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {event.length > 0 && (
            <Stack
              spacing={2}
              style={{ position: "absolute", right: "16%", marginTop: "1%" }}
            >
              <Pagination
                siblingCount={0}
                count={maxItemsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                color="primary"
              />
            </Stack>
          )}
        </Paper>
      </div>

      <Modal open={GameEditModal} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Typography
            id="spring-modal-title"
            variant="h6"
            component="h3"
            sx={{ textAlign: "left" }}
          >
            Update Points
            <span
              onClick={handleEditModalClose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "50 %",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "70%",
                transform: "translate(0 %, -50 %)",
              }}
              data-testid="modalclose_btn"
            >
              <CloseIcon className={EventHistoryStyles.eventhistorycloseIcon} />
            </span>
          </Typography>

          <FormControl sx={{ m: 0, minWidth: "100%" }} size="small">
            <label>Groups</label>
            <Select
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
              data-testid="Select_btn"
            >
              {groupList.length > 0 ? (
                groupList.map((row) => {
                  return (
                    <MenuItem
                      data-testid="grpSelect_btn"
                      value={row}
                      key={row._id}
                    >
                      {" "}
                      {row.grouplist[0]?.GroupName}{" "}
                    </MenuItem>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No Data Available</p>
              )}
            </Select>

            <p style={{ color: "red" }}>{gameNameError}</p>
          </FormControl>
          <br />
          <form>
            <TableContainer sx={{ maxHeight: 460, marginBottom: "0%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "rgb(155 209 242)",
                        color: "black",
                      }}
                    >
                      Games
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "rgb(155 209 242)",
                        color: "black",
                      }}
                    >
                      {" "}
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games?.length > 0 ? (
                    games?.map((row, index) => {
                      return (
                        <TableRow key={row?._id}>
                          <TableCell>{row?.gamelist[0]?.GameName} </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              placeholder="Score"
                              defaultValue={row?.TotalPoint}
                              maxLength="4"
                              data-testid="score"
                              onChange={(e) => {
                                onInputChangeEdit(e, index);
                                getEditGameId(
                                  e.target.value,
                                  row?.gamelist[0]?._id
                                );
                                setEditGameData({
                                  ...gameEditData,
                                  [row?.gamelist[0]?._id]: e.target.value,
                                });
                              }}
                            />
                            <br />
                            <p style={{ color: "red" }}>
                              {pointError?.[index]}
                            </p>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} style={{ textAlign: "center" }}>
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {publishFlag ? (
              <Button
                sx={{
                  width: "40%",
                  height: 35,
                  marginLeft: "60%",
                  marginTop: "10%",
                }}
                type="button"
                className={EventHistoryStyles.submitPointButton}
                variant="contained"
                size="small"
                style={{ backgroundColor: "#144399" }}
                onClick={handleSubmit}
                data-testid="pub_btn"
              >
                Publish To Committee
              </Button>
            ) : (
              <Button
                sx={{ width: "40%", height: 35, marginLeft: "60%" }}
                type="button"
                className={EventHistoryStyles.submitPointButton1}
                variant="contained"
                size="small"
                style={{ backgroundColor: "darkgray" }}
                disable
              >
                {" "}
                No Games{" "}
              </Button>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
}
