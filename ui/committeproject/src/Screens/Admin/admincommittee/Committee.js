import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import Multiselect from "multiselect-react-dropdown";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  AddCommitteeMember,
  CommitteeEmailSearch,
  CommitteeSearch,
  DeleteCommitteeMember,
  FindCommittee,
  ListCommitteeMember,
  ListDesignation,
  ListUserToAddCommittee,
} from "../../../api/ServiceFile/ApiService";
import Iconify from "../../../components/iconify";
import ToasterSuccessGlobal from "../../../TosterGlobal/ToasterGlobal";
import committeeStyle from "./committee.module.css";

import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table headings //

const headCells = [
  {
    id: "UserName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "Designation",
    numeric: true,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "DOB",
    numeric: true,
    disablePadding: false,
    label: "DOB",
  },
  {
    id: "Type",
    numeric: true,
    disablePadding: false,
    label: "Type",
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
        <TableCell
          style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
        />
        {headCells.map((headCell) => (
          <TableCell
            style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell style={{ backgroundColor: "rgb(155 209 242)" }} />
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

// Add GRoup member routing

const Committee = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const init = useRef();
  const [GetGroupType, setGetGroupId] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupMember] = useState("select");
  const [userList, setUserList] = useState([]);
  const [objects, setObjects] = useState([]);
  const [mailList, setMailList] = useState([]);
  const [groupMemberError, setGroupMemberError] = useState(null);
  const [designation, setDesignation] = useState([null]);
  const [user] = useState({
    UserName: "",
    Email: "",
    DOB: "",
    Designation: "",
  });
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 150,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    checkGroupType();
    FilteredUser();
    listDesignation();
  }, []);

  // find committee id //

  async function checkGroupType() {
    const body = {
      GroupType: 1,
      Delete: 0,
    };
    await FindCommittee(body).then((response) => {
      console.log(response);
      if (response) {
        setGetGroupId(response.data[0]._id);
        if (response.data[0]._id) {
          const dataValue = response.data[0]._id;
          ListCommitteeMember(dataValue).then((responses) => {
            setData(responses.data);
          });
        }
      }
    });
  }

  // Delete API //
  const deleteUser = (id, index) => {
    const body = {
      CommitteeId: 0,
      Type: 0,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        DeleteCommitteeMember(id, body).then((responses) => {
          if (responses) {
            ToasterSuccessGlobal("Committee member deleted", 55, ["success"]);
            const lastData = data.length - 1;
            const lastDataId = data[lastData]._id;
            if (index == 0 && lastDataId == id && page !== 1) {
              setPage(page - 1);
            }
            FilteredUser();
            checkGroupType();
            FilteredUser();
          }
        });
      }
    });
  };

  // add single user API//
  init.current = user;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  // close and open of modal for add user //

  const handleAddMembers = (e) => {
    setOpen(true);
  };
  const handleAddMemberClose = () => {
    setOpen(false);
    setGroupMemberError(null);
    setMailList([]);
    FilteredUser();
  };

  const selectedEmail = (e) => {
    const dataEmail = e;
    setMailList(dataEmail);
    if (dataEmail.length > 0) {
      setGroupMemberError(null);
    }
    FilteredUser();
  };
  ////  list filtered users ////
  const FilteredUser = () => {
    const listGroupUsers = [];
    const listObject = [];

    const getUserList = async () => {
      await ListUserToAddCommittee().then((response) => {
        const reqsData = response.data;

        for (const reqData of reqsData) {
          listGroupUsers.push(reqData.Email);
          listObject.push(reqData);
        }

        setUserList(listGroupUsers);
        setObjects(listObject);
      });
    };

    getUserList();
  };
  /// finish /////
  const GroupMemberSubmit = async () => {
    const empList = [];
    for (const element of mailList) {
      for (const object of objects) {
        if (element === object.Email) {
          empList.push(object._id);
        }
      }
    }

    if (empList.length == 0) {
      setGroupMemberError("Please choose at least one user");
      return;
    }
    if (groupMemberError != null) {
      return;
    }
    AddCommitteeMember(GetGroupType, empList).then((response) => {
      ToasterSuccessGlobal("Committee members added!", 56, ["success"]);
      handleAddMemberClose();
      FilteredUser();
      ClearData();
    });
    checkGroupType();
    FilteredUser();
  };

  const handleSearchs = (event) => {
    const listGroupUsers = [];
    const listObject = [];
    if (event === "") {
      FilteredUser();
    }
    CommitteeEmailSearch(event).then((response) => {
      const requestData = response.data;

      for (const reqData of requestData) {
        listGroupUsers.push(reqData.Email);
        listObject.push(reqData);
      }

      setUserList(listGroupUsers);
      setObjects(listObject);
    });
  };

  // search
  const [dateFieldColor, setDateFieldColor] = useState("gray");
  const [EndDateFieldColor, setEndDateFieldColor] = useState("gray");
  const [searchValue, setSearchValue] = useState({
    UserName: "",
    Email: "",
    Designation: "",
    fromDOB: "",
    toDOB: "",
  });

  const [show, setShow] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleCloseSearch = (preview) => {
    setShow((prev) => !prev);
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
      fromDOB: "",
      toDOB: "",
    });
    setSearchError();
    setDateFieldColor("gray");
    setEndDateFieldColor("gray");
    checkGroupType();
  };

  const handleSearch = (name, e) => {
    const value = e.target?.value;
    if (name === "fromDOB" && moment(searchValue.toDOB).isBefore(value)) {
      setSearchError("End date is before start date");
    } else if (
      name === "toDOB" &&
      moment(value).isBefore(searchValue.fromDOB)
    ) {
      setSearchError("End date is before start date");
    } else {
      setSearchError(null);
      setSearchValue({ ...searchValue, [name]: value });
    }
    if (name === "fromDOB") {
      setDateFieldColor("black");
    }
    if (name === "toDOB") {
      setEndDateFieldColor("black");
    }
    setPage(1);
  };

  useEffect(() => {
    const body = {
      Committee: 1,
      CommitteeId: GetGroupType,
    };
    const params = new URLSearchParams({
      UserName: searchValue.UserName,
      Email: searchValue.Email,
      Designation: searchValue.Designation,
      fromDOB: searchValue.fromDOB,
      toDOB: searchValue.toDOB,
    });
    CommitteeSearch(params, body).then((response) => {
      setData(response?.data);
    });
  }, [searchValue]);

  const listDesignation = async () => {
    const listDesignations = [];
    await ListDesignation().then((response) => {
      const designationData = response?.data;
      for (const element of designationData) {
        listDesignations.push(element.Designation);
      }
      setDesignation(listDesignations);
    });
  };
  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const ClearData = () => {
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
      fromDOB: "",
      toDOB: "",
    });
    setSearchError();
    setDateFieldColor("gray");
    setEndDateFieldColor("gray");
    checkGroupType();
    const inputFields = document.getElementsByTagName("input");

    for (const inputField of inputFields) {
      inputField.value = "";
    }
  };

  const handleBlur = (event) => {
    const value = event.target.value;
    if (!value) {
      setDateFieldColor("gray");
    }
  };
  const handleBlurs = (event) => {
    const value = event.target.value;
    if (!value) {
      setEndDateFieldColor("gray");
    }
  };

  const UpdateSearchUerlist = () => {
    FilteredUser();
  };
  const types = {
    0: "Innovator",
    1: "Committee",
    2: "Admin",
  };
  return (
    <>
      <Helmet>
        <title> Admin | Committee </title>
      </Helmet>
      <Box
        data-testid="committee-id"
        sx={{
          width: "92%",
          marginBottom: "120px",
          marginTop: "70px",
          marginLeft: "-22px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          mt={-5}
          mb={5}
          justifyContent="end"
          spacing={1}
        >
          <Button
            data-testid="Close-btn-Search"
            className={committeeStyle.btn_addcommittee}
            onClick={(prev) => handleCloseSearch(prev)}
            startIcon={<SearchIcon fontSize="small" />}
          >
            Search Table
          </Button>
          <Button
            data-testid="New-member-btn"
            className={committeeStyle.btn_addcommittee}
            onClick={(e) => handleAddMembers(e)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Member
          </Button>
        </Stack>

        <Stack spacing={1}>
          {show && (
            <div className={committeeStyle.searchCard}>
              <Typography
                sx={{
                  flex: "1 1 100%",
                  backgroundColor: "rgb(155 209 242)",
                  height: "55px",
                  textAlign: "left",
                  lineHeight: "1.5rem",
                  paddingTop: "15px",
                  paddingLeft: "34px",
                  fontSize: "15px",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                }}
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
                  marginTop: "20px",
                  width: "100",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2} flexGrow={1} sx={{ width: "30%" }}>
                  <TextField
                    id="outlined-name"
                    name="UserName"
                    size="small"
                    label="Name"
                    // sx={{ width: "80%" }}
                    variant="outlined"
                    inputProps={{ "data-testid": "Textfield-search-name" }}
                    onChange={(e) => handleSearch("UserName", e)}
                  />
                  <TextField
                    id="outlined-basic"
                    name="Email"
                    // sx={{ width: "120%" }}
                    size="small"
                    label="Email"
                    variant="outlined"
                    inputProps={{ "data-testid": "Textfield-search-email" }}
                    onChange={(e) => handleSearch("Email", e)}
                  />
                </Stack>
                <Stack spacing={2} flexGrow={1} sx={{ width: "30%" }}>
                  <TextField
                    type="Date"
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    id="exampleFormControlInput1"
                    name="fromDOB"
                    size="small"
                    inputProps={{ "data-testid": "Textfield-search-startDate" }}
                    // sx={{ width: "130%" }}
                    label="Start"
                    onBlur={handleBlur}
                    InputProps={{
                      style: { color: dateFieldColor },
                    }}
                    onChange={(e) => {
                      console.log(e);
                      handleSearch("fromDOB", e);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="Date"
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    id="exampleFormControlInput1"
                    inputProps={{ "data-testid": "Textfield-search-EndDate" }}
                    name="toDOB"
                    // sx={{ width: "100%" }}
                    size="small"
                    label="End"
                    onBlur={handleBlurs}
                    InputProps={{
                      style: { color: EndDateFieldColor },
                    }}
                    min={searchValue.fromDOB}
                    onChange={(e) => handleSearch("toDOB", e)}
                    InputLabelProps={{ shrink: true }}
                  />
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
                <Stack spacing={2} flexGrow={1} sx={{ width: "30%" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="Designation"
                    size="small"
                    options={designation}
                    value={searchValue.Designation}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        data-testid="designation-field"
                        label="Designation"
                        onBlur={(e) => handleSearch("Designation", e)}
                      />
                    )}
                    onSelect={(e) => handleSearch("Designation", e)}
                  />
                </Stack>
                <Stack title="Clear" cursor="pointer">
                  {/* <Tooltip title="Clear" cursor="pointer"> */}
                  <RestartAltIcon
                    sx={{ marginTop: "64px" }}
                    data-testid="clearData-committee"
                    color="error"
                    cursor="pointer"
                    onClick={ClearData}
                  />
                  {/* </Tooltip> */}
                </Stack>
              </Stack>
            </div>
          )}

          <div className={committeeStyle.admincommkitteecard}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
 rows.sort(getComparator(order, orderBy)).slice() */}
                    {data.length > 0
                      ? stableSort(data, getComparator(order, orderBy))
                          .slice(
                            (page - 1) * rowsPerPage,
                            (page - 1) * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row._id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              <TableRow
                                hover
                                onClick={(event) => handleClick(event, row._id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row._id}
                              >
                                <TableCell />
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  title={row.UserName}
                                  className={classes.wrapper}
                                >
                                  {row.UserName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.wrapper}
                                  title={row.Email}
                                >
                                  {row.Email}
                                </TableCell>
                                <TableCell align="left">
                                  {row.Designation}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(row.DOB).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  {types[row?.Type]}
                                </TableCell>
                                <TableCell>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 1.2 }}
                                  >
                                    <Tooltip title="Delete">
                                      <IconButton
                                        onClick={() =>
                                          deleteUser(row._id, index)
                                        }
                                        color="error"
                                        className={
                                          committeeStyle.committeeDeleteIcon
                                        }
                                        data-testid="delete-committee-member"
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            );
                          })
                      : ""}
                  </TableBody>
                </Table>
                {(data.length == 0 || data?.errorCode) && (
                  <img
                    src="/favicon/logo_comittee.png"
                    className={committeeStyle.committeePageLoading}
                    alt="Image"
                    width="300"
                    height="300"
                  />
                )}
              </TableContainer>
              {data.length > 0 ? (
                <Stack
                  spacing={2}
                  style={{
                    position: "absolute",
                    right: "10%",
                    marginTop: "2%",
                  }}
                >
                  <Pagination
                    siblingCount={0}
                    count={Math.ceil(data.length / 5)}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    color="primary"
                  />
                </Stack>
              ) : (
                ""
              )}
            </Paper>
          </div>
        </Stack>
      </Box>
      <Modal
        open={open}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            GroupMemberSubmit();
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 590,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",

            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            onClick={handleAddMemberClose}
            data-testid="add-member-modal-close"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "80%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon className={committeeStyle.addCommitteeCloseIcon} />
          </span>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h5" gutterBottom>
                Add Committee Member
              </Typography>
            </Stack>
            <Stack
              spacing={5}
              onClick={UpdateSearchUerlist}
              data-testid="update-search-values"
            >
              <Multiselect
                value={groupMember}
                inputProps={{ "data-testid": "add-member-select" }}
                onSearch={(event) => handleSearchs(event)}
                avoidHighlightFirstOption={true}
                isObject={false}
                onRemove={(event) => {
                  selectedEmail(event);
                }}
                onSelect={(event) => {
                  selectedEmail(event);
                }}
                options={userList}
                // showCheckbox
              />
              {groupMemberError != null ? (
                <p
                  style={{
                    color: "red",
                    marginTop: "10px",
                    textAlign: "left",
                    marginLeft: "5px",
                  }}
                >
                  {groupMemberError}
                </p>
              ) : (
                ""
              )}
              <div>
                <Button
                  sx={{ m: 2, width: "17%", height: 35, marginLeft: "85%" }}
                  type="submit"
                  className={committeeStyle.submitCommitteeButton}
                  data-testid="add-committee-member-btn"
                  variant="contained"
                  size="small"
                  style={{ backgroundColor: "#144399" }}
                  onClick={() => GroupMemberSubmit()}
                >
                  Submit
                </Button>
              </div>
            </Stack>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
export default Committee;
