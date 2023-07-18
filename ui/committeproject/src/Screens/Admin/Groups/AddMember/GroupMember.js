import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import MilitaryTechSharpIcon from "@mui/icons-material/MilitaryTechSharp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Multiselect from "multiselect-react-dropdown";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/AdminIntercepter";
import Iconify from "../../../../components/iconify";
import buttonstyle from "./groupmember.module.css";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import {
  searchGroupMember,
  groupMemberList,
  UserListToCommitteeAdd,
  listUserChangeRole,
  ListDesignation,
  DeleteGroupMember,
} from "../../../../api/ServiceFile/ApiService";

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
    id: "GroupRole",
    numeric: false,
    label: "Group Role",
    disableSorting: true,
  },
  {
    id: "Designation",
    numeric: true,
    disablePadding: false,
    label: "Designation",
  },
  {
    id: "Email",
    numeric: true,
    disablePadding: false,
    label: "Email",
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
              disabled={headCell.disableSorting}
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
        <TableCell
          style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
        />
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
function EnhancedTableToolbar() {
  return <></>;
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 300,
  },
  wrapper: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: 150,
  },
}));

const GroupMember = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [Addopen, setAddopen] = useState(false);
  const [userList, setUserlist] = useState([]);
  const [objects, setObjects] = useState([]);
  const [mailist, setMaillist] = useState([]);
  const [groupmembererror, setGroupmembererror] = useState(null);
  const [captainOpen, setCaptainOpen] = useState(false);
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [userError, setUserError] = useState(null);
  const classes = useStyles();
  const [roleErr, setRoleErr] = useState(null);
  const [show, setShow] = useState(false);
  const [designation, setDesignation] = useState([null]);
  const [searchValues, setSearchValues] = useState("");
  const [searchValue, setSearchValue] = useState({
    UserName: "",
    Email: "",
    Designation: "",
  });
  const [role, setRole] = useState({
    GroupRole: "",
  });
  const [Roledata, setRoleData] = useState(null);

  useEffect(() => {
    UserlistT0AddGroup();
    listgroupmember();
    listToSelectRole();
    listDesignation();
  }, []);

  // /FindUsersOfAGroupWithoutCommitteeMember

  const listToSelectRole = () => {
    const Gid = sessionStorage.getItem("Gid");
    listUserChangeRole(Gid).then((response) => {
      setRoleData(response.data);
    });
  };

  const handleAddMembers = (e) => {
    setAddopen(true);
  };
  const handleAddmemberclose = () => {
    setMaillist([]);
    setAddopen(false);
    setGroupmembererror(null);
    UserlistT0AddGroup();
  };
  const disp = (e) => {
    const MemberData = e;
    setMaillist(MemberData);
    if (MemberData.length > 0) {
      setGroupmembererror(null);
    }
    UserlistT0AddGroup();
  };

  const UserlistT0AddGroup = () => {
    const listgroupusers = [];
    const listobject = [];
    const getUserlist = async () => {
      const reqData = await UserListToCommitteeAdd();
      const reqsData = await reqData.data;

      for (let requestData of reqsData) {
        listgroupusers.push(requestData.Email);
        listobject.push(requestData);
      }

      setUserlist(listgroupusers);
      setObjects(listobject);
    };
    getUserlist();
  };

  const Groupmembersubmit = async () => {
    const emplist = [];
    for (let mail of mailist) {
      for (let obj of objects) {
        if (mail === obj.Email) {
          emplist.push(obj._id);
        }
      }
    }
    const Gid = sessionStorage.getItem("Gid");
    if (emplist.length == 0) {
      setGroupmembererror("Please choose atleast one user");
      return;
    }
    if (groupmembererror != null) {
      return;
    }
    axiosPrivate
      .put(api.PUT_ADD_GROUP_MEMBER.concat(Gid), emplist)
      .then((response) => {
        ToasterSuccessGlobal("Members added successfully!", 49, ["success"]);

        handleAddmemberclose();
        listgroupmember();
        ClearData();
        UserlistT0AddGroup();
        listToSelectRole();
      });
  };

  // list members API calling//
  const listgroupmember = () => {
    const Gid = sessionStorage.getItem("Gid");
    groupMemberList(Gid).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    if (user !== undefined && user !== "") {
      data.forEach((element) => {
        if (element._id === user)
          setRole({ ...role, GroupRole: element.GroupRole });
      });
    }
  }, [user]);
  // Delete API //
  const deleteUser = (id, index) => {
    const body = {
      GroupIdObj: null,
      GroupId: 0,
      GroupRole: 0,
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
        DeleteGroupMember(id, body).then((responses) => {
          ToasterSuccessGlobal("Member deleted successfully!", 50, ["success"]);

          listgroupmember();
          UserlistT0AddGroup();
          listToSelectRole();

          const lastData = data.length - 1;
          const lastDataId = data[lastData]._id;

          if (index == 0 && lastDataId == id && page !== 1) {
            setPage(page - 1);
          }
        });
      }
    });
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const handleCaptainOpen = () => {
    setCaptainOpen(true);
  };
  const handleCaptainClose = () => {
    setCaptainOpen(false);
    setRole({
      GroupRole: "",
    });
    setUser("");
    setUserError(null);
    setRoleErr(null);
  };

  const handleChange = (event) => {
    event.preventDefault();

    setUser(event.target.value);

    if (event.target.name === null || event.target.value === "") {
      setUserError("username is required");
    } else {
      setUser(event.target.value);
      setUserError(null);
      setRoleErr(null);
    }
  };

  const onEditChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });

    if (e.target.role === null || e.target.role === "") {
      setRoleErr("role is required");
    } else {
      setRoleErr(null);
      setRole(e.target.role.value);
    }
  };
  const roleSubmit = (e) => {
    if (user === null || user === "") {
      setUserError("Please select a user");
    }
    if (role.GroupRole === null || role.GroupRole === "") {
      setRoleErr("Please select a Role");
    }
    if (userError !== null || roleErr !== null) {
      return;
    }
    const Gid = sessionStorage.getItem("Gid");

    axiosPrivate
      .put(api.PUT_CHANGE_GROUP_ROLE.concat(user), {
        role: role.GroupRole,
        GroupId: Gid,
      })
      .then((response) => {
        setUser("");
        setRole("");
        ToasterSuccessGlobal("Role Update successfully!", 41, ["success"]);

        handleCaptainClose();
        listgroupmember();
      });
  };

  const handlesearch = (event) => {
    const listgroupusers = [];
    const listobject = [];

    setSearchValues(event);

    if (event === "") {
      UserlistT0AddGroup();
    }
    axiosPrivate.get(api.GET_EMAIL_SEARCH.concat(event)).then((response) => {
      const reqsData = response.data;

      for (let reqData of reqsData) {
        listgroupusers.push(reqData.Email);
        listobject.push(reqData);
      }

      setUserlist(listgroupusers);
      setObjects(listobject);
    });
    setPage(1);
  };

  // search

  const handleCloseSearch = (preview) => {
    setShow((prev) => !prev);
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
    });
    listgroupmember();
  };
  const handleSearch = (name, e) => {
    setSearchValue({ ...searchValue, [name]: e.target?.value });
  };
  useEffect(() => {
    const Gid = sessionStorage.getItem("Gid");

    const body = {
      GroupId: Gid,
    };
    const params = new URLSearchParams({
      UserName: searchValue.UserName,
      Email: searchValue.Email,
      Designation: searchValue.Designation,
    });
    searchGroupMember(params, body).then((response) => {
      setData(response?.data);
    });
  }, [searchValue]);

  const listDesignation = async () => {
    const listDesignations = [];
    await ListDesignation().then((response) => {
      const designationdata = response?.data;
      for (const element of designationdata) {
        listDesignations.push(element.Designation);
      }
      setDesignation(listDesignations);
    });
  };

  const ClearData = () => {
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
    });
    listgroupmember();
    const designationInput = document.querySelectorAll(
      'input[name="Designation"]'
    );
    const typeInput = document.querySelectorAll('input[name="Type"]');
    if (designationInput.length > 0) {
      designationInput[0].value = "";
    }
    if (typeInput.length > 0) {
      typeInput[0].value = "";
    }
    const formElement = document.getElementById("search-form");
    if (formElement) {
      formElement.reset();
    }
  };

  const UpdateSearchValue = () => {
    UserlistT0AddGroup();
  };

  return (
    <>
      <Helmet>
        <title> Admin | Group Member</title>
      </Helmet>
      <Box
        data-testid="groupMember-add"
        sx={{
          width: "92%",
          textAlign: "center",
          marginBottom: "100px",
          marginTop: "70px",
          marginLeft: "-22px",
        }}
      >
        <Stack direction="row" spacing={1} mt={-5} mb={5} justifyContent="end">
          <Button
            className={buttonstyle.btn_changecaptain}
            data-testid="search-add-groupMember"
            onClick={(prev) => handleCloseSearch(prev)}
            startIcon={<SearchIcon fontSize="small" />}
          >
            Search Table
          </Button>
          <Button
            className={buttonstyle.btn_changecaptain}
            data-testid="manage-role-group-member"
            onClick={handleCaptainOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Manage role
          </Button>
          <Button
            className={buttonstyle.btn_addgroupmember}
            onClick={(e) => handleAddMembers(e)}
            startIcon={<Iconify icon="eva:plus-fill" />}
            data-testid="add-group-member"
          >
            New members
          </Button>
        </Stack>
        <Stack spacing={1}>
          {show && (
            <div className={buttonstyle.searchCard}>
              <Typography
                sx={{
                  flex: "1 1 100%",
                  backgroundColor: "rgb(155 209 242)",
                  height: "55px",
                  textAlign: "left",
                  lineHeight: "1.5rem",
                  paddingTop: "15px",
                  paddingLeft: "48px",
                  fontSize: "15px",
                  fontWeight: "800",
                  fontFamily: "sans-serif",
                }}
                id="tableTitle"
                component="div"
              >
                Search
              </Typography>
              <form id="search-form">
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
                  <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
                    <TextField
                      id="outlined-name"
                      name="UserName"
                      size="small"
                      label="Name"
                      inputProps={{ "data-testid": "search-groupMember-name" }}
                      variant="outlined"
                      onChange={(e) => handleSearch("UserName", e)}
                    />
                  </Stack>
                  <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
                    <TextField
                      id="outlined-basic"
                      name="Email"
                      size="small"
                      inputProps={{ "data-testid": "search-groupMember-email" }}
                      label="Email"
                      variant="outlined"
                      onChange={(e) => handleSearch("Email", e)}
                    />
                  </Stack>
                  <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
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
                          data-testid="designation-groupMember-search-field"
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
                      sx={{ marginTop: "8px" }}
                      data-testid="clearData-search-data"
                      color="error"
                      cursor="pointer"
                      onClick={ClearData}
                    />
                    {/* </Tooltip> */}
                  </Stack>
                </Stack>
              </form>
            </div>
          )}
          <div className={buttonstyle.groupmembercard}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
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
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                  />
                  <TableBody>
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

                                <TableCell align="left">
                                  {(() => {
                                    let roleText, roleIcon;
                                    if (row.GroupRole === 1) {
                                      roleText = "Vice captain";
                                      roleIcon = (
                                        <MilitaryTechSharpIcon
                                          color="error"
                                          direction="row"
                                          style={{
                                            height: "20px",
                                            width: "20px",
                                          }}
                                        />
                                      );
                                    } else if (row.GroupRole === 2) {
                                      roleText = "Captain";
                                      roleIcon = (
                                        <img
                                          src="/favicon/crown.png"
                                          alt="Image"
                                          width="20"
                                          height="20"
                                          marginTop="20px"
                                          className={buttonstyle.forBlock}
                                        />
                                      );
                                    } else {
                                      roleText = "Group member";
                                    }

                                    return (
                                      <div>
                                        {roleText}
                                        {roleIcon}
                                      </div>
                                    );
                                  })()}
                                </TableCell>

                                <TableCell align="left">
                                  {row?.Designation}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  title={row.Email}
                                  className={classes.wrapper}
                                >
                                  {row.Email}
                                </TableCell>
                                <TableCell title="Delete">
                                  {/* <Tooltip title="Delete"> */}
                                  <IconButton
                                    onClick={() => deleteUser(row._id, index)}
                                    color="error"
                                    className={buttonstyle.groupmemdeleteIcon}
                                    data-testid="delete-group-member"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  {/* </Tooltip> */}
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
                    className={buttonstyle.groupMemberLoading}
                    alt="Image"
                    width="300"
                    height="300"
                  />
                )}
              </TableContainer>
              {data.length > 0 && (
                <Stack
                  spacing={2}
                  style={{
                    position: "absolute",
                    right: "10%",
                    marginTop: "2%",
                  }}
                >
                  <Pagination
                    siblingCount={1}
                    count={data.length <= 5 ? 1 : Math.ceil(data.length / 5)}
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
        </Stack>
      </Box>
      <Modal
        open={Addopen}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            Groupmembersubmit();
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
            onClick={handleAddmemberclose}
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
            <CloseIcon className={buttonstyle.addgroupmembercloseIcon} />
          </span>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h5" gutterBottom>
                Add Group Member
              </Typography>
            </Stack>
            <Stack spacing={6} onClick={UpdateSearchValue}>
              <Multiselect
                avoidHighlightFirstOption={true}
                onSearch={(event) => handlesearch(event)}
                isObject={false}
                onRemove={(event) => {
                  disp(event);
                }}
                onSelect={(event) => {
                  disp(event);
                }}
                options={userList}
                searchValues={searchValues}
                value={searchValues}
              />
              {groupmembererror != null ? (
                <p
                  style={{
                    color: "red",
                    marginTop: "11px",
                    marginBottom: "-22px",
                    textAlign: "left",
                    marginLeft: "5px",
                  }}
                >
                  {groupmembererror}
                </p>
              ) : (
                ""
              )}
              <div>
                <Button
                  sx={{ m: 2, width: "17%", height: 35, marginLeft: "85%" }}
                  type="submit"
                  className={buttonstyle.submitgroupmemberbutton}
                  variant="contained"
                  size="small"
                  data-testid="add-member-submit-btn"
                  style={{ backgroundColor: "#144399" }}
                  onClick={() => Groupmembersubmit()}
                >
                  Submit
                </Button>
              </div>
            </Stack>
          </Container>
        </Box>
      </Modal>
      <Modal open={captainOpen} onClose={handleCaptainClose} center>
        <Box
          sx={{
            position: "absolute",
            top: "41%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            onClick={handleCaptainClose}
            data-testid="role-change-modal-close"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "0 %",
              padding: "0px 0px",
              marginLeft: "82%",
              transform: "translate(0 %, -50 %)",
            }}
          >
            <CloseIcon
              style={{ marginTop: "14px" }}
              className={buttonstyle.eventhistorycloseIcon}
            />
          </span>

          <form id="CaptainForm">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography variant="h5" gutterBottom>
                Role change
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>  
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="Users"
                  onChange={handleChange}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                  variant="outlined"
                  sx={{ listStyle: "inside" }}
                >
                  {Roledata?.length > 0 ? (
                    Roledata.map((value) => {
                      return (
                        <MenuItem value={value?._id} key={value?._id}>
                          {value?.UserName}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <p style={{ textAlign: "center" }}>No Data Available</p>
                  )}
                </Select>
              </FormControl>
              {userError != null ? (
                <p
                  style={{
                    color: "red",
                    marginBottom: "-10px",
                    textAlign: "left",
                    marginTop: "3px",
                  }}
                >
                  {userError}
                </p>
              ) : (
                ""
              )}
              <FormControl>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="GroupRole"
                  value={role.GroupRole}
                  onChange={(e) => onEditChange(e)}
                >
                  <MenuItem value={2}>Captain</MenuItem>
                  <MenuItem value={1}>Vice Captain</MenuItem>
                  <MenuItem hidden value={0}>
                    Group Member
                  </MenuItem>
                </Select>
              </FormControl>
              {roleErr != null ? (
                <p
                  style={{
                    color: "red",
                    marginBottom: "-10px",
                    textAlign: "left",
                    marginTop: "3px",
                  }}
                >
                  {roleErr}
                </p>
              ) : (
                ""
              )}
            </Stack>
            <Button
              sx={{ m: 2, width: "26%", height: 35, marginLeft: "74%" }}
              variant="contained"
              onClick={roleSubmit}
              data-testid="role-change-submit"
              className={buttonstyle.submitgroupmemberbutton}
            >
              set role
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default GroupMember;
