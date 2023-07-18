import axios from "axios";
import Label from "../../../components/label";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  FormControl,
  TextField,
  Button,
  Modal,
  Tooltip,
  Typography,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Iconify from "../../../components/iconify";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import ListGame from "./ListGame.module.css";
import Swal from "sweetalert2";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import Games from "../../../Screens/committe/Game/Games";
import api from "../../../api/API_URL";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  if (Array.isArray(array)) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  } else {
    // handle the case when array is not an array
    return null; // for example, you could return null or an empty array
  }
}

const headCells = [
  {
    id: "ae",
    numeric: false,
    disablePadding: true,
    label: "",
    disableSorting: true,
  },
  {
    id: "GameName",
    numeric: false,
    disablePadding: true,
    label: "Game Name",
  },
  {
    id: "GameDesc",
    numeric: false,
    disablePadding: false,
    label: "Game Description",
  },
  {
    id: "EventName",
    numeric: true,
    disablePadding: false,
    label: "Event Name",
  },
  {
    id: "StartDate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "EndDate",
    numeric: true,
    disablePadding: false,
    label: "End Date",
  },
  {
    numeric: true,
    disablePadding: false,
    label: "Status",
    disableSorting: true,
  },
  {
    numeric: true,
    disablePadding: false,
    label: "file",
    disableSorting: true,
  },
  {
    numeric: true,
    disablePadding: false,
    // label: 'Action',
    disableSorting: true,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={ListGame.textstyle}
            style={{ backgroundColor: "rgb(46, 95, 137)", color: "white" }}
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              disabled={headCell.disableSorting}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  // No toolbar needed for this use case
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ListGames() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("GroupRole");
  const [selected, setSelected] = useState([]);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [flag, setflag] = useState(0);

  const [editopen, setEditopen] = useState(false);
  const [EditPatchValues, setEditpatchvalues] = useState({});
  const [pointlist, setPointopen] = useState(false);
  const handlePointClose = () => setPointopen(false);
  const [editGame, setEditGame] = useState({
    GameName: "",
    GameDesc: "",
    StartDate: "",
    EndDate: "",
  });
  const handleEditClose = () => setEditopen(false);
  const [nameErr, setNameerror] = useState("");
  const [descErr, setDescerror] = useState(" ");
  const [startdateErr, setStartDateerror] = useState("");
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [enddateErr, setendDateerror] = useState(" ");
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [startdate, setstardate] = useState();
  const [enddate, setenddate] = useState();
  const [openModals, setOpenModals] = useState(false);

  useEffect(() => {
    getdatafirst();
  }, []);

  function handleCloseModals() {
    setOpenModals(false);
  }
  function handleOpen() {
    setOpenModals(true);
  }
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!editopen) {
      setNameerror("");
      setDescerror("");
      setStartDateerror("");
      setStartDate("");
      setEndDate("");
      setendDateerror("");
    }
  }, [editopen]);

  function handleEditOpen(id) {
    sessionStorage.setItem("id", id);
    axiosPrivate.get(api.GET_SINGLE_GAME.concat(id)).then((response1) => {
      editGame.GameName = response1.data.GameName;
      editGame.GameDesc = response1.data.GameDesc;
      setStartDate(response1.data.StartDate);
      setEndDate(response1.data.EndDate);
      axiosPrivate
        .get(api.GET_SINGLE_EVENT.concat(response1.data.EventId))
        .then((response2) => {
          setstardate(moment(response2.data.StartDate).format("yyyy-MM-DD"));
          setenddate(moment(response2.data.EndDate).format("yyyy-MM-DD"));
        });
      setstardate(moment(response1.data.StartDate).format("yyyy-MM-DD"));
      setenddate(moment(response1.data.EndDate).format("yyyy-MM-DD"));
      const editData = response1.data;
      setEditpatchvalues({
        ...editData,
        StartDate: editData?.StartDate
          ? moment(editData.StartDate).format("YYYY-MM-DD")
          : "",
        EndDate: editData?.EndDate
          ? moment(editData.EndDate).format("YYYY-MM-DD")
          : "",
      });
      setEditopen(true);
    });
  }

  const onEditChanges = (e) => {
    e.preventDefault();
    let gamename = e.target.value;
    let nameCheck = new RegExp(/^[0-9a-zA-Z. g]+$/).test(gamename);

    if (gamename === "") {
      setNameerror("Game name is required");
      setflag(1);
    } else if (!nameCheck.trim()) {
      setNameerror("Please Enter valid Name");
      setflag(1);
    } else if (gamename.length >= 30 || gamename.length <= 1) {
      setNameerror("Please enter a name between 1 and 30");
      setflag(1);
    } else {
      setNameerror(null);
      setflag(0);
      setEditGame({ ...editGame, [e.target.name]: e.target.value });
    }
  };

  const onEditDescChanges = (e) => {
    e.preventDefault();
    let descName = e.target.value;

    if (descName === "") {
      setDescerror("Description is required");
      setflag(1);
    } else if (!descName.trim()) {
      setDescerror("Please Enter valid Description");
    } else if (descName.length >= 250 || descName.length <= 1) {
      setDescerror("Please enter a Description between 1 and 250");
      setflag(1);
    } else {
      setDescerror(null);
      setflag(0);
      setEditGame({ ...editGame, [e.target.name]: e.target.value });
    }
  };

  const onEditSdateChanges = (e) => {
    e.preventDefault();

    const startDateValue = e.target.value;
    if (startDateValue === null) {
      setStartDateerror("startDate is required");
      setflag(1);
    } else {
      setStartDateerror(null);
      setflag(0);
      setStartDate(startDateValue);
    }
    if (startDateValue && moment(endDate).isBefore(startDateValue)) {
      setflag(1);
      setendDateerror("End date is before start date");
    } else {
      // End date is valid, clear error message
      setendDateerror("");
      setflag(0);
      setEditGame({ ...editGame, [e.target.name]: e.target.value });
    }
  };

  const onEditEdateChanges = (event) => {
    // Set end date
    // const endDate = event.target.value;

    let newEndDate = event.target.value;
    // Validate end date
    if (startDate && moment(newEndDate).isBefore(startDate)) {
      // End date is before start date, show error message
      setendDateerror("End date must be after start date");
      setEndDate(event.target.value);
      setflag(1);
    } else {
      // End date is valid, clear error message
      setendDateerror(null);
      setflag(0);
      setEndDate(event.target.value);
      setEditGame({ ...editGame, [event.target.name]: event.target.value });
    }
  };

  const currentDate = Date();

  const EditSubmits = (e) => {
    const id = sessionStorage.getItem("id");
    if (flag === 1) {
      return;
    }
    editGame.EndDate = endDate;
    editGame.StartDate = startDate;
    axiosPrivate
      .put(api.PUT_UPDATE_GAME.concat(id), editGame)
      .then((response) => {
        if (response.data === "Game Started Further Updation Not Possible") {
          ToasterGlobal("Game Started Further Updation Not Possible!", 100, [
            "warning",
          ]);
        } else {
          ToasterGlobal("Game Update successfully!", 3, ["success"]);

          getdatafirst();
          handleEditClose();
          getdatafirst();
        }
      })
      .catch((error) => {
        ToasterGlobal("Game Started Further Updation Not Possible!", 1005, [
          "error",
        ]);
      });
  };

  const getdatafirst = () => {
    axiosPrivate.get(api.GET_ALL_GAME).then((response) => {
      setData(response.data);
    });
  };

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = JSON.parse(
        localStorage.getItem("Profile")
      ).Token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handlePoint = (id) => {
    sessionStorage.setItem("id", id);
    axiosPrivate.get(api.GET_GAME_IN_EVENT + `${id}`).then((response) => {
      setValue(response.data);
      setPointopen(true);
    });
  };

  const deletegame = (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((innerResponse) => {
      if (innerResponse.isConfirmed) {
        axiosPrivate
          .delete(api.DELETE_GAME + `${id}`, { data: { Delete: 1 } })
          .then((response) => {
            ToasterGlobal("Game Deleted successfully!", 20, ["success"]);

            const lastData = data.length - 1;
            const lastDataId = data[lastData]._id;
            if (index === 0 && lastDataId === id && page !== 1) {
              setPage(page - 1);
            }
            getdatafirst();
            ClearData();
          });
      }
    });
  };
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  // serach

  const [searchValue, setSearchValue] = useState({
    GameName: "",
    StartDate: "",
    EndDate: "",
  });

  const [show, setShow] = useState(false);

  const handleCloseSearch = () => {
    setShow((prev) => !prev);
    setSearchValue({
      GameName: "",
      StartDate: "",
      EndDate: "",
    });
    setSearchError();
    getdatafirst();
  };

  const [searchError, setSearchError] = useState(null);

  const handleSearch = (name, e) => {
    const valueSearch = e.target?.value;
    if (
      name === "StartDate" &&
      moment(searchValue.EndDate).isBefore(valueSearch)
    ) {
      setSearchError("End date is before start date");
      setSearchValue({ ...searchValue, [name]: valueSearch });
    } else if (
      name === "EndDate" &&
      moment(valueSearch).isBefore(searchValue.StartDate)
    ) {
      setSearchError("End date is before start date");
      setSearchValue({ ...searchValue, [name]: valueSearch });
    } else {
      setSearchError(null);
      setSearchValue({ ...searchValue, [name]: valueSearch });
    }
    setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams({
      GameName: searchValue.GameName,
      StartDate: searchValue.StartDate,
      EndDate: searchValue.EndDate,
    });
    axiosPrivate
      .get(api.SEARCH_GAME + `?${params}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchValue]);

  const handleStartDateBlur = (e) => {
    const newstartDate = moment(e.target.value);
    const newendDate = moment(searchValue.EndDate);
    if (
      newstartDate.isValid() &&
      newendDate.isValid() &&
      newstartDate.isAfter(endDate)
    ) {
      setSearchValue({ ...searchValue, EndDate: e.target.value });
    }
  };

  const ClearData = () => {
    setSearchValue({
      GameName: "",
      StartDate: "",
      EndDate: "",
    });
    setSearchError();
    getdatafirst();
    const inputFields = document.getElementsByTagName("input");
    for (const inputField of inputFields) {
      inputField.value = "";
    }
  };
  const GameStatus = {
    0: "Inactive",
    1: "Active",
    2: "Completed",
  };
  const statusColors = {
    0: "red",
    1: "green",
    2: "darkblue",
  };

  return (
    <>
      <div className={ListGame.MainContainerflex}>
        <div className={ListGame.ButtonCreate}>
          {" "}
          <Button
            className={ListGame.btn_eventSearch}
            onClick={() => handleCloseSearch()}
            startIcon={<SearchIcon fontSize="small" />}
          >
            Search Table
          </Button>
          <Button
            className={ListGame.btn_Game}
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Games
          </Button>
        </div>

        <Stack spacing={1}>
          {show && (
            <div className={ListGame.searchCard}>
              <Typography
                sx={{
                  flex: "1 1 100%",
                  backgroundColor: "#173F5F",
                  height: "55px",
                  textAlign: "left",
                  lineHeight: "1.5rem",
                  paddingTop: "15px",
                  paddingLeft: "34px",
                  fontSize: "15px",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                  color: "white",
                }}
                // variant="h6"
                id="tableTitle"
                component="div"
              >
                Search
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginBottom: "30px",
                  marginLeft: "100px",
                  marginTop: "20px",
                }}
              >
                <Stack spacing={2}>
                  <TextField
                    id="outlined-name"
                    name="UserName"
                    size="small"
                    label="name"
                    sx={{ width: "300px" }}
                    variant="outlined"
                    onChange={(e) => handleSearch("GameName", e)}
                  />
                </Stack>

                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  onBlur={handleStartDateBlur}
                  autoComplete="off"
                  id="exampleFormControlInput1"
                  name="StartDate"
                  size="small"
                  sx={{ width: "300px" }}
                  label="Start"
                  onChange={(e) => handleSearch("StartDate", e)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  id="exampleFormControlInput1"
                  name="EndDate"
                  sx={{ width: "300px" }}
                  size="small"
                  label="EndDate"
                  min={searchValue.StartDate}
                  onChange={(e) => handleSearch("EndDate", e)}
                  InputLabelProps={{ shrink: true }}
                />
                {searchError != null ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: "0px",
                      marginLeft: "5px",
                      marginBottom: "-6px",
                      textAlign: "left",
                    }}
                  >
                    {searchError}
                  </p>
                ) : (
                  ""
                )}
                <Stack>
                  <Tooltip title="Clear" cursor="pointer">
                    <RestartAltIcon
                      sx={{ marginTop: "8px" }}
                      color="error"
                      onClick={ClearData}
                    />
                  </Tooltip>
                </Stack>
              </Stack>
            </div>
          )}
        </Stack>
        <div className={ListGame.card}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={5}
            justifyContent="end"
          >
            {openModals && (
              <Games
                handleCloseModals={handleCloseModals}
                openModals={openModals}
                reload={getdatafirst}
              />
            )}
          </Stack>
          <Box sx={{ width: "98%" }} justifyContent="center">
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data?.length > 0
                      ? stableSort(data, getComparator(order, orderBy))
                          .slice(
                            (page - 1) * rowsPerPage,
                            (page - 1) * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row?._id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                className={ListGame.listgametablehover}
                                hover
                                onClick={(event) =>
                                  handleClick(event, row?._id)
                                }
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row?._id}
                              >
                                <TableCell />
                                <TableCell
                                  className={ListGame.gamebt1}
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  sx={{ width: "33%", wordBreak: "break-word" }}
                                >
                                  {row?.GameName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ width: "33%", wordBreak: "break-word" }}
                                >
                                  {row?.GameDesc}
                                </TableCell>

                                <TableCell
                                  align="left"
                                  sx={{ width: "33%", wordBreak: "break-word" }}
                                >
                                  {row?.EventId?.EventName}
                                </TableCell>

                                <TableCell align="left">
                                  {moment(row?.StartDate).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(row?.EndDate).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  <Label
                                    style={{ color: statusColors[row?.Status] }}
                                  >
                                    {GameStatus[row?.Status]}
                                  </Label>
                                </TableCell>

                                <TableCell align="left">
                                  <a href={row?.RulesPdf} download>
                                    <FileCopyIcon
                                      className={ListGame.fileIcon}
                                    />
                                  </a>
                                </TableCell>
                                <TableCell align="left">
                                  <Stack direction="row" spacing={2}>
                                    <RemoveRedEyeIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handlePoint(row?._id)}
                                    />
                                    <Tooltip title="Delete">
                                      <DeleteIcon
                                        color="error"
                                        onClick={() =>
                                          deletegame(row?._id, index)
                                        }
                                      />
                                    </Tooltip>
                                    {moment(row?.StartDate).format(
                                      "yyyy-MM-DD"
                                    ) >
                                      moment(currentDate).format(
                                        "yyyy-MM-DD"
                                      ) && (
                                      <Tooltip title="Edit">
                                        <EditIcon
                                          color="primary"
                                          marginTop="4px"
                                          onClick={() =>
                                            handleEditOpen(row?._id)
                                          }
                                        />
                                      </Tooltip>
                                    )}
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            );
                          })
                      : ""}
                  </TableBody>
                </Table>
                {(data?.length === 0 || data?.errorCode) && (
                  <img
                    src="/favicon/logo_comittee.png"
                    className={ListGame.imageLogo}
                    alt="Img"
                    width="300"
                    height="300"
                  />
                )}
              </TableContainer>
              {data?.length > 0 ? (
                <Stack
                  style={{
                    position: "absolute",
                    right: 139,
                    marginTop: "-27px",
                  }}
                >
                  <Pagination
                    sx={{ mt: "55px" }}
                    siblingCount={0}
                    count={Math.ceil(data.length / 5)}
                    rowsPerPage={rowsPerPage}
                    onChange={handleChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    color="primary"
                  />
                </Stack>
              ) : (
                ""
              )}
            </Paper>
          </Box>
        </div>

        <Modal open={editopen} onClose={handleEditClose}>
          <Box
            sx={{
              borderRadius: "20px",
              position: "absolute",
              top: "51%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <span
              onClick={handleEditClose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "50 %",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "76%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon style={{ marginTop: "14px", color: "white" }} />
            </span>

            <form id="gameForm">
              <div className={ListGame.header}>
                <h4 style={{ padding: "13px", color: "white" }}>
                  <b>Edit Game</b>
                </h4>
              </div>
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  type="text"
                  sx={{
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 60,
                    },
                  }}
                  autoComplete="off"
                  size="small"
                  id="exampleFormControlInput1"
                  name="GameName"
                  defaultValue={EditPatchValues.GameName}
                  onChange={(e) => onEditChanges(e)}
                  label="GameName"
                />
              </FormControl>
              {nameErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>{nameErr}</p>
              ) : (
                ""
              )}
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  type="text"
                  sx={{
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 60,
                    },
                  }}
                  autoComplete="off"
                  size="small"
                  id="exampleFormControlInput1"
                  name="GameDesc"
                  defaultValue={EditPatchValues.GameDesc}
                  onChange={(e) => onEditDescChanges(e)}
                  label="GameDescription"
                />
              </FormControl>
              {descErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>{descErr}</p>
              ) : (
                ""
              )}
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  sx={{
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 60,
                    },
                  }}
                  InputProps={{ inputProps: { min: startdate } }}
                  autoComplete="off"
                  name="StartDate"
                  size="small"
                  id="exampleFormControlInput1"
                  defaultValue={EditPatchValues.StartDate}
                  onChange={(e) => onEditSdateChanges(e)}
                  label="Start Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              {startdateErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>
                  {startdateErr}
                </p>
              ) : (
                ""
              )}
              <FormControl fullWidth sx={{ m: 2 }}>
                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  sx={{
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 60,
                    },
                  }}
                  InputProps={{ inputProps: { max: enddate } }}
                  autoComplete="off"
                  name="EndDate"
                  size="small"
                  id="exampleFormControlInput1"
                  defaultValue={EditPatchValues.EndDate}
                  onChange={(e) => onEditEdateChanges(e)}
                  label="End Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              {enddateErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>{enddateErr}</p>
              ) : (
                ""
              )}
              <div className="col-3">
                <Button
                  className={ListGame.gamebtn}
                  sx={{ m: 2, height: 35, width: "40px", marginLeft: "20%" }}
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={() => EditSubmits()}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
        <Modal open={pointlist} onClose={handlePointClose} center>
          <Box
            sx={{
              borderRadius: "20px",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <span
              onClick={handlePointClose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "90 %",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "75%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon style={{ marginTop: "14px", color: "white" }} />
            </span>
            <div className={ListGame.header}>
              <h4 style={{ padding: "13px", color: "white" }}>Points List</h4>
            </div>
            <Paper style={{ maxHeight: 525, overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Groups</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                {value?.length !== 0 ? (
                  <TableBody>
                    {value?.map((point) => (
                      <TableRow key={point?._id}>
                        {point?.grouplist.map((points) => (
                          <TableCell key={point?._id}>
                            {points?.GroupName}
                          </TableCell>
                        ))}
                        <TableCell>{point?.TotalPoint}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
                      <p>No data available</p>
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </Paper>
          </Box>
        </Modal>
      </div>
    </>
  );
}
