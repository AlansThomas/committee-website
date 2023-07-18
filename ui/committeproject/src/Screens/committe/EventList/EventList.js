import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Label from "../../../components/label";
import Stack from "@mui/material/Stack";
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
import ListGames from "./EventList.module.css";
import Swal from "sweetalert2";
import { axiosPrivate } from "../../../api/Interceptor/commiteeIntercepters";
import Event from "../../../Screens/committe/Event/Event";
import api from "../../../api/API_URL";
import { visuallyHidden } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  ContentState,
  convertToRaw,
  EditorState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { throttle } from "lodash";
import { stateFromHTML } from "draft-js-import-html";

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
    id: "QuarterName",
    numeric: false,
    disablePadding: true,
    label: "Quarter Name",
  },
  {
    id: "EventName",
    numeric: false,
    disablePadding: true,
    label: "Event Name",
  },
  {
    id: "EventDescription",
    numeric: false,
    disablePadding: false,
    label: "Event Description",
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
            className={ListGames.textstyle}
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

export default function EventList() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("GroupRole");
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [editopen, setEditopen] = useState(false);
  const [EditPatchValues, setEditpatchvalues] = useState({});
  const [editEvent, setEditEvent] = useState({
    EventName: "",
    EventDescription: "",
    StartDate: "",
    EndDate: "",
    quarterId: "",
  });
  const handleEditClose = () => setEditopen(false);
  const [nameErr, setNameerror] = useState("");
  const [descErr, setDescerror] = useState(" ");
  const [startdateErr, setStartDateerror] = useState("");
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [enddateErr, setendDateerror] = useState(" ");
  const [data, setData] = useState([]);
  const [flag, setflag] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState({
    EventName: "",
    StartDate: "",
    EndDate: "",
  });
  const [searchError, setSearchError] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getdatafirst();
  }, []);

  function handleCloseModal() {
    setOpenModal(false);
  }
  function handleCloseOpen() {
    setOpenModal(true);
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

  function convertHTMLToContentState(html) {
    const contentState = stateFromHTML(html);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  }

  const [quarterStartDateEdit, setQuarterStartDateEdit] = useState(null);
  const [quarterEndDateEdit, setquarterEndDateEdit] = useState(null);

  console.log(quarterStartDateEdit);
  console.log(quarterEndDateEdit);

  function handleEditOpen(id) {
    sessionStorage.setItem("id", id);
    axiosPrivate.get(api.GET_SINGLE_EVENT.concat(id)).then((response) => {
      console.log(response, "responseeeeeeeeeeeeeeeeeeeeee");
      editEvent.EventName = response.data.EventName;
      editEvent.EventDescription = response.data.EventDescription;
      setStartDate(response.data.StartDate);
      setEndDate(response.data.EndDate);
      editEvent.quarterId = response?.data?.QuarterId?._id;
      setQuarterStartDateEdit(
        moment(response?.data?.QuarterId?.StartDate).format("YYYY-MM-DD")
      );
      setquarterEndDateEdit(
        moment(response?.data?.QuarterId?.EndDate).format("YYYY-MM-DD")
      );
      const editData = response.data;
      setEditpatchvalues({
        ...editData,
        StartDate: editData?.StartDate
          ? moment(editData.StartDate).format("YYYY-MM-DD")
          : "",
        EndDate: editData?.EndDate
          ? moment(editData.EndDate).format("YYYY-MM-DD")
          : "",
      });
      const htmlContent = response.data.EventDescription || "";
      const editorState = convertHTMLToContentState(htmlContent);

      setEditorState(editorState);
      setEditopen(true);
    });
  }

  const onEditChanges = (e) => {
    e.preventDefault();
    let eventName = e.target.value;
    let nameCheck = new RegExp(/^[0-9a-zA-Z. ]+$/).test(eventName);
    if (eventName === "") {
      setNameerror("Event name is required");
      setflag(1);
    } else if (!nameCheck) {
      setNameerror("Please Enter valid Name");
      setflag(1);
    } else if (!eventName.trim()) {
      setNameerror("Please Enter valid EventName");
    } else if (eventName.length >= 30 || eventName.length <= 1) {
      setNameerror("Please enter a name between 1 and 30");
      setflag(1);
    } else {
      setNameerror(null);
      setflag(0);
      setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    }
  };

  // const onEditDescChanges = (e) => {
  //   e.preventDefault();
  //   let descName = e.target.value;

  //   if (descName === "") {
  //     setDescerror("Description is required");
  //     setflag(1);
  //   } else if (!descName.trim()) {
  //     setDescerror("Please Enter valid Description");
  //   } else if (descName.length >= 250 || descName.length <= 1) {
  //     setDescerror("Please enter the characters between 1 and 250");
  //     setflag(1);
  //   } else {
  //     setDescerror(null);
  //     setflag(0);
  //     setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  //   }
  // };

  const onEditSdateChanges = (e) => {
    e.preventDefault();
    let newStartDate = e.target.value;

    if (newStartDate === null) {
      setStartDateerror("startDate is required");
      setflag(1);
    } else {
      setStartDateerror(null);
      setflag(0);
      setStartDate(e.target.value);
    }
    if (newStartDate && moment(endDate).isBefore(newStartDate)) {
      setendDateerror("End date is before start date");
      setflag(1);
    } else if (newStartDate.isBefore(quarterStartDateEdit)) {
      setStartDateerror("startDate is required");
      setflag(1);
    } else {
      // End date is valid, clear error message
      setendDateerror("");
      setflag(0);
      setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
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
    } else if (moment(newEndDate).isAfter(quarterEndDateEdit)) {
      setendDateerror("Event must be in this quarter");
      setEndDate(event.target.value);
      setflag(1);
    } else {
      // End date is valid, clear error message
      setendDateerror(null);
      setflag(0);
      setEndDate(event.target.value);
      setEditEvent({ ...editEvent, [event.target.name]: event.target.value });
    }
  };

  const currentDate = Date();

  const EditSubmits = (e) => {
    const id = sessionStorage.getItem("id");
    if (flag === 1) {
      return;
    }
    editEvent.EndDate = endDate;
    editEvent.StartDate = startDate;
    // editEvent.quarterId =editEvent.quarterId;

    axiosPrivate
      .put(api.PUT_EVENT_UPDATE_EVENT.concat(id), editEvent)
      .then((response) => {
        if (
          response?.response?.data ===
          "Event Started Further Updation Not Possible"
        ) {
          ToasterGlobal("Event Started Further Updation Not Possible!", 65, [
            "warning",
          ]);
        } else {
          ToasterGlobal("Event update successfully!", 35, ["success"]);

          getdatafirst();
          handleEditClose();
          getdatafirst();
        }
      })
      .catch((error) => {
        ToasterGlobal("Oops! something went wrong", 121, ["error"]);
      });
  };

  const getdatafirst = () => {
    axiosPrivate.get(api.GET_ALL_EVENT).then((response) => {
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

  const deleteevent = (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosPrivate.delete(api.DELETE_EVENT.concat(id)).then((response) => {
          ToasterGlobal("Event deleted successfully!", 65, ["success"]);

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

  // serach

  const handleCloseSearch = (prev) => {
    setShow((previous) => !previous);
    setSearchValue({
      EventName: "",
      StartDate: "",
      EndDate: "",
    });
    setSearchError();
    getdatafirst();
  };

  const handleSearch = (name, e) => {
    const inputValue = e.target?.value;
    if (
      name === "StartDate" &&
      moment(searchValue.EndDate).isBefore(inputValue)
    ) {
      setSearchError("End date is before start date");
      setSearchValue({ ...searchValue, [name]: inputValue });
    } else if (
      name === "EndDate" &&
      moment(inputValue).isBefore(searchValue.StartDate)
    ) {
      setSearchError("End date is before start date");
      setSearchValue({ ...searchValue, [name]: inputValue });
    } else {
      setSearchError(null);
      setSearchValue({ ...searchValue, [name]: inputValue });
    }
    setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams({
      EventName: searchValue.EventName,
      StartDate: searchValue.StartDate,
      EndDate: searchValue.EndDate,
    });
    axiosPrivate
      .get(api.EVENT_FIELD_SEARCH + `?${params}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchValue]);

  const handleStartDateBlur = (e) => {
    const newStartDate = moment(e.target.value);
    const newEndDate = moment(searchValue.EndDate);
    if (
      newStartDate.isValid() &&
      newEndDate.isValid() &&
      newStartDate.isAfter(newEndDate)
    ) {
      setSearchValue({ ...searchValue, EndDate: e.target.value });
    }
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const ClearData = () => {
    setSearchValue({
      EventName: "",
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

  const EventStatus = {
    0: "Inactive",
    1: "Active",
    2: "Completed",
  };
  const statusColors = {
    0: "red",
    1: "green",
    2: "darkblue",
  };

  // Editor

  const [editorState, setEditorState] = useState(() => {
    const eventDescription = EditPatchValues.EventDescription || ""; // Set default value to empty string if it's null or undefined

    // Convert HTML to ContentState
    const contentBlocks = convertFromHTML(eventDescription);
    const contentState = ContentState.createFromBlockArray(contentBlocks);

    return EditorState.createWithContent(contentState);
  });

  const [isFirstRun, setIsFirstRun] = useState(true);

  const onEditorStateChange = useCallback(
    throttle((editorState) => {
      if (isFirstRun) {
        setIsFirstRun(false);
      }
      setEditorState(editorState);
      const contentState = convertToRaw(editorState.getCurrentContent());
      const html = draftToHtml(contentState);
      console.log(html);
      const withoutTags = html
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;/g, " ");
      if (html === "") {
        setDescerror("Description is required");
        setflag(1);
      } else if (!html.trim()) {
        setDescerror("Please Enter valid Description");
      } else if (
        withoutTags.length >= 250 ||
        (withoutTags.length <= 1 && !isFirstRun)
      ) {
        setDescerror("Please enter the characters between 1 and 250");
        setflag(1);
      } else {
        setDescerror(null);
        setflag(0);
        setEditEvent({ ...editEvent, EventDescription: html });
      }
    }, 500)
  );

  return (
    <>
      <div className={ListGames.MainContainerflex}>
        <div className={ListGames.ButtonCreate}>
          <Button
            className={ListGames.btn_eventSearch}
            onClick={(prev) => handleCloseSearch(prev)}
            startIcon={<SearchIcon fontSize="small" />}
          >
            Search Table
          </Button>
          <Button
            className={ListGames.btn_Game}
            onClick={handleCloseOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Event
          </Button>
        </div>
        <Stack spacing={1}>
          {show && (
            <div className={ListGames.searchCard}>
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
                    onChange={(e) => handleSearch("EventName", e)}
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
                  label="End"
                  min={searchValue.StartDate}
                  onChange={(e) => handleSearch("EndDate", e)}
                  InputLabelProps={{ shrink: true }}
                />
                <Stack>
                  <Tooltip title="Clear" cursor="pointer">
                    <RestartAltIcon
                      sx={{ marginTop: "8px" }}
                      color="error"
                      onClick={ClearData}
                    />
                  </Tooltip>
                </Stack>
                {searchError != null && (
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
                )}
              </Stack>
            </div>
          )}
        </Stack>

        <div className={ListGames.card}>
          {openModal && (
            <Event
              handleCloseModal={handleCloseModal}
              openModal={openModal}
              reload={getdatafirst}
            />
          )}

          <Box sx={{ width: "98%" }} justifyContent="center">
            <Paper sx={{ width: "100%", mb: 2 }}>
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
                                className={ListGames.listgametablehover}
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
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {row?.QuarterId?.QuaterName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {row?.EventName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ width: "33%", wordBreak: "break-word" }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: row?.EventDescription,
                                    }}
                                  ></div>
                                </TableCell>
                                <TableCell align="left">
                                  {row?.StartDate
                                    ? moment(row.StartDate).format("DD/MM/YYYY")
                                    : "null"}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.EndDate
                                    ? moment(row.EndDate).format("DD/MM/YYYY")
                                    : "null"}
                                </TableCell>

                                <TableCell align="left">
                                  <Label
                                    style={{ color: statusColors[row?.Status] }}
                                  >
                                    {EventStatus[row?.Status]}
                                  </Label>
                                </TableCell>
                                <TableCell l align="left">
                                  <Stack direction="row" spacing={2}>
                                    <Tooltip title="Delete">
                                      <DeleteIcon
                                        color="error"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() =>
                                          deleteevent(row?._id, index)
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
                                          sx={{ cursor: "pointer" }}
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
                    className={ListGames.imageLogo}
                    alt="Img"
                    width="300"
                    height="300"
                  />
                )}
              </TableContainer>
              {data?.length > 0 ? (
                <Stack style={{ position: "absolute", right: 139 }}>
                  <Pagination
                    sx={{ mt: "33px" }}
                    count={data.length <= 5 ? 1 : Math.ceil(data.length / 5)}
                    page={page}
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
              width: 700,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "700px",
              overflowY: "auto",
              overflowX: "hidden",
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
                marginLeft: "84%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon style={{ marginTop: "14px", color: "white" }} />
            </span>

            <form id="gameForm" style={{marginRight:"-76px"}}>
              <div className={ListGames.header}>
                <h4 style={{ padding: "13px", color: "white" }}>
                  <b>Edit Event</b>
                </h4>
              </div>
              <FormControl fullWidth sx={{ m: 2, width: "84.5%" }}>
                <TextField
                  type="text"
                  autoComplete="off"
                  size="medium"
                  id="exampleFormControlInput1"
                  name="EventName"
                  defaultValue={EditPatchValues.EventName}
                  onChange={(e) => onEditChanges(e)}
                  label="Event Name"
                />
              </FormControl>
              {nameErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>{nameErr}</p>
              ) : (
                ""
              )}
              <div style={{ marginLeft: "11px"}}>
                <Editor
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
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    history: { inDropdown: false },
                  }}
                />
              </div>
              {descErr != null ? (
                <p style={{ color: "red", marginLeft: "20px" }}>{descErr}</p>
              ) : (
                ""
              )}
              <FormControl fullWidth sx={{ m: 2, width: "83.5%" }}>
                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  InputProps={{
                    inputProps: {
                      min: moment(new Date()).format("yyyy-MM-DD"),
                    },
                  }}
                  autoComplete="off"
                  name="StartDate"
                  size="medium"
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
              <FormControl fullWidth sx={{ m: 2, width: "83.5%" }}>
                <TextField
                  type="Date"
                  onKeyDown={onKeyDown}
                  InputProps={{
                    inputProps: {
                      min: moment(new Date()).format("yyyy-MM-DD"),
                    },
                  }}
                  autoComplete="off"
                  name="EndDate"
                  size="medium"
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
                  className={ListGames.gamebtn}
                  sx={{ height: 35, width: "130px" }}
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
      </div>
    </>
  );
}
