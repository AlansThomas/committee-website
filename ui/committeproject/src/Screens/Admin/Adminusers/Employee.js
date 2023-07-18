import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button, MenuItem,
  Modal,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow, Typography
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import TextField from '@mui/material/TextField';
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  AddUserAdmin, AdminPassChange, AdminUserSearch, CSVUpload, DeleteUser,
  listDesignationAPI, ListUsers
} from "../../../../src/api/ServiceFile/ApiService";
import Iconify from "../../../components/iconify";
import ToasterSuccessGlobal from "../../../TosterGlobal/ToasterGlobal";
import employeeStyle from "./employee.module.css";
import EnhancedTableHead from "./EmployeeTableHead";

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// Add GRoup member routing

export default function Employee() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("updatedAt");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [opens, setOpens] = useState(false);
  const [userOpen, setUserOpens] = useState(false);
  const init = useRef();
  const [designation, setDesignation] = useState([null]);
  const [csvModal, setCsvModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [fileError, setFileError] = useState(null);
  const filetypeRef = useRef();
  const [data, setData] = useState([]);
  const [fileLength, setFileLength] = useState(0);

  const [user, setUser] = useState({
    UserName: "",
    Email: "",
    DOB: "",
    Designation: "",
  });
  init.current = user;

  const [NameError, setNameError] = useState(null);
  const [EmailError, setEmailError] = useState(null);
  const [DobError, setDobError] = useState(null);
  const [DesignationError, setDesignationError] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [ChangeUserPasswordId, setChangeUserPasswordId] = useState(null);
  let confirmPassword;
  const [changePss, setChangePass] = useState({ Email: "", newPassword: "" });
  const [ConfirmPass, setConfirmPass] = useState(null);
  const [newPassErr, setNewPassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);
  const [dateFieldColor, setDateFieldColor] = useState("gray");
  const [EndDateFieldColor, setEndDateFieldColor] = useState("gray");
  const [changePassFlag, setChangePassFlag] = useState(0);
  const userNameRef = useRef();
  const emailRef = useRef();
  const dobRef = useRef();
  const designationRef = useRef();
  const modalRef = useRef(null);

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
    listUsers();
    listDesignation();
  }, []);
  function handleCsvModalOpen() {
    setCsvModalOpen(true);
    handleClose();
  }

  const handleModalClose = () => {
    setFileError(null);
    setFileLength(0);
    setSelectedFile(null);
    setCsvModalOpen(false);
  };
  const changeHandler = (e) => {
    setFileError(null);
    setFileLength(0);
    setSelectedFile(null);
    setSelectedFile(e.target?.files[0]);
    const fileSelected = e.target?.files[0]?.type;
    const fileSize = e.target?.files[0]?.size / 1024 / 1024;

    if (
      fileSelected === "text/csv" ||
      fileSelected === "csv" ||
      fileSelected === "application/vnd.ms-excel"
    ) {
      if (fileSize > 2) {
        setFileError("file size should be less than 2MB");
      } else {
        setSelectedFile(e.target?.files[0]);
        setFileLength(e.target?.files?.length);
        setSelectedFileName(e.target?.files[0]?.name);
        setFileError(null);
      }
    } else {
      if (e.target?.files?.length === 0) {
        setFileError("This felid is  required");
      } else {
        setFileError("Files only support CSV format");
      }
    }
  };

  const handleSubmission = () => {
    if (fileError?.length > 0) {
      return;
    }
    const formData = new FormData();
    formData.append("csv", selectedFile);
    if (fileLength === 0) {
      setFileError("This field is required");
      filetypeRef.current.focus();
    } else if (selectedFileName.length > 100) {
      setFileError("File name length should less than 100 characters");
      filetypeRef.current.focus();
    } else {
      CSVUpload(formData)
        .then((response) => {
          listUsers();
          ClearData();

          if (response?.data[0]) {
            ToasterSuccessGlobal("File Uploaded!", 9012, ["success"]);
          } else {
            if (response.data.writeErrors) {
              ToasterSuccessGlobal(
                "Employee details duplicated, File upload failed",
                2389,
                ["error"]
              );
            } else {
              ToasterSuccessGlobal("File Upload failed!", 9012, ["error"]);
            }
          }
          handleModalClose();
        })
        .catch((error) => {
          ToasterSuccessGlobal("File Upload failed!", 1232, ["error"]);
        });
    }
    if (fileError != null) {
      return;
    }
  };

  // list members API calling//
  const listUsers = () => {
    ListUsers().then((response) => {
      setData(response?.data);
    });
  };
  const listDesignation = async () => {
    const listDesignations = [];
    await listDesignationAPI().then((response) => {
      const designationdata = response?.data;
      for (const element of designationdata) {
        listDesignations.push(element.Designation);
      }
      setDesignation(listDesignations);
    });
  };
  // Delete API //
  const deleteUser = (id, index) => {
    const body = {
      Delete: 1,
      GroupId: 0,
      CommitteeId: 0,
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
        DeleteUser(id, body).then((responses) => {
          ToasterSuccessGlobal("User Deleted Successfully", 8912, ["success"]);
          const lastData = data.length - 1;
          const lastDataId = data[lastData]._id;

          if (index === 0 && lastDataId === id && page !== 1) {
            setPage(page - 1);
          }
          ClearData();
          listUsers();
        });
      }
    });
  };

  // edit API //
  const onInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "UserName") {
      let username = e.target.value;
      let nameCheck = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(username.trim());
      // /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/
      if (username === "") {
        setNameError("Name is required");
      } else if (!nameCheck) {
        setNameError("Please Enter valid Name");
      } else if (username.length > 35) {
        setNameError("Maximum character length is 35");
      } else {
        if (e.target.name === "UserName") {
          setNameError(null);
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      }
    }

    if (e.target.name === "Email") {
      let email = e.target.value;
      let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(
        email
      );
      if (email === "") {
        setEmailError("Email is required");
      } else if (!emailCheck) {
        setEmailError("Enter valid Email");
      } else if (email.length > 100) {
        setEmailError("Maximum mail id length is 100");
      } else {
        if (e.target.name === "Email") {
          setEmailError(null);
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      }
    }

    if (e.target.name === "DOB" && e.target.value === "") {
      setDobError("Date of Bith is required");
    } else {
      if (e.target.name === "DOB") {
        setDobError(null);
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    }
    if (e.target.name === "Designation" && e.target.value === "") {
      setDesignationError("Designation is required");
    } else {
      if (e.target.name === "Designation") {
        setDesignationError(null);
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    }
  };
  // add single user API//
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = 0;

    if (user.UserName.trim().length === 0) {
      setNameError("Name is required");
      flag = 1;
      userNameRef.current.focus();
    }
    if (user.Email.trim().length === 0) {
      setEmailError("Email is required");
      flag = 1;
      emailRef.current.focus();
    }
    if (user.DOB === null || user.DOB === "") {
      setDobError("Date of birth is required");
      flag = 1;
      dobRef.current.focus();
    }
    if (user.Designation === null || user.Designation === "") {
      setDesignationError("Designation is required");
      flag = 1;
      designationRef.current.focus();
    }

    if (NameError || EmailError || DobError || DesignationError) {
      return;
    }

    if (flag === 0) {
      AddUserAdmin(user)
        .then((response) => {
          handleCloseUser();
          ToasterSuccessGlobal("User added successfully!", 234, ["success"]);
          listUsers();
          ClearData();
        })
        .catch((error) => {
          let errorcode = error.response.data.code;
          if (errorcode === 11000) {
            ToasterSuccessGlobal("This user already exist!", 234, ["error"]);
          } else if (
            NameError === null ||
            EmailError === null ||
            DobError === null ||
            DesignationError === null
          ) {
            let organizationmail = error.response.data.errors[0].msg;
            ToasterSuccessGlobal(organizationmail, 40, ["error"]);
          }
        });
    }
  };

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

  // Add user modal open //

  const handleOpen = (event) => {
    setOpens(event.currentTarget);
  };

  const handleClose = () => {
    setOpens(false);
  };
  // add user modal //
  function handleOpenUser() {
    setUserOpens(true);
    handleClose();
  }
  const handleCloseUser = () => {
    setNameError(null);
    setEmailError(null);
    setDobError(null);
    setDesignationError(null);
    setUserOpens(false);
    setUser({
      UserName: "",
      Email: "",
      DOB: "",
      Designation: "",
    });
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  // disable typig in date field

  const onKeyDown = (e) => {
    e.preventDefault();
  };
  const changeUserpasswordopen = (Email) => {
    setChangeUserPasswordId(Email);
    setChangePasswordOpen(true);
  };
  const changeUserPasswordClose = (id) => {
    setConfirmPass(null);
    setNewPassError(null);
    setConfirmPassError(null);
    setChangePass({
      Email: "",
      Password: "",
    });
    setChangePasswordOpen(false);
  };
  const onInputpasswordChange = (e) => {
    e.preventDefault();
    setChangePass({ ...changePss, [e.target.name]: e.target.value });
    if (e.target.name === "newPassword") {
      let Password = e.target.value;
      Password = Password.replace(/\s+/g, "");
      if (Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/)) {
        setNewPassError("invalid password");
      }

      if (Password === "") {
        setNewPassError("Please enter new password");
        setChangePassFlag(1);
      } else if (Password.trim().length > 16) {
        setNewPassError("Maximum length is 16");
      } else if (Password.trim().length < 8) {
        setNewPassError("Minimum length is 8");
      } else if (!Password.trim()) {
        setNewPassError("Please enter a valid password");
      } else {
        if (e.target.name === "newPassword") {
          setNewPassError(null);
          setChangePassFlag(0);
          setChangePass({ ...changePss, [e.target.name]: e.target.value });
        }
      }
    }
  };

  const ConfirmPasswordChange = (e) => {
    e.preventDefault();
    confirmPassword = e.target.value;
    if (confirmPassword === "") {
      setConfirmPassError("Please enter password");
    } else {
      setConfirmPassError(null);
      setConfirmPass(e.target.value);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    let submitFlag = 0;

    if (changePss.newPassword.trim().length === 0) {
      setNewPassError("Please enter new password");
    }

    if (changePss.newPassword !== ConfirmPass) {
      setConfirmPassError("Passwords does not match");
      submitFlag = 1;
    } else {
      setConfirmPassError(null);
    }
    if (ConfirmPass === null) {
      setConfirmPassError("Please enter confirm password");
      submitFlag = 1;
    }

    if (changePassFlag === 1 || submitFlag === 1) {
      return;
    } else {
      changePss.Email = ChangeUserPasswordId;
      const body = {
        Email: changePss.Email,
        Password: changePss.newPassword,
      };
      AdminPassChange(body).then((response) => {
        changeUserPasswordClose();
        ToasterSuccessGlobal("Password changed Successfully!", 41, ["success"]);
      }).catch((error)=>{
        setNewPassError(error.response?.data?.errMsg);
      } );
    }
  };

  // search

  const [searchValue, setSearchValue] = useState({
    UserName: "",
    Email: "",
    Designation: "",
    fromDOB: "",
    toDOB: "",
    Type: "",
  });

  const [searchError, setSearchError] = useState(null);

  const [show, setShow] = useState(false);
  const types = {
    0: "Innovator",
    1: "Committee",
    2: "Admin",
  };

  const handleCloseSearch = (preview) => {
    setShow((prev) => !prev);
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
      fromDOB: "",
      toDOB: "",
      Type: "",
    });
    setSearchError(null);
    listUsers();
    setDateFieldColor("gray");
    setEndDateFieldColor("gray");
    setTypeValue(null);
  };

  const [typeValues, setTypeValue] = useState(null);

  const handleSearch = (name, e) => {
    const value = e.target?.value;
    if (name === "Type") {
      setTypeValue(e.target.value);
      setSearchValue({ ...searchValue, [name]: value });
    } else if (
      name === "fromDOB" &&
      moment(searchValue.toDOB).isBefore(value)
    ) {
      setSearchError("End date is before start date");
      setDateFieldColor("black");
    } else if (
      name === "toDOB" &&
      moment(value).isBefore(searchValue.fromDOB)
    ) {
      setSearchError("End date is beforeee start date");
    } else {
      setSearchError(null);
      setSearchValue({ ...searchValue, [name]: value });
    }

    if (name === "fromDOB") {
      setDateFieldColor("black");
      setSearchValue({ ...searchValue, [name]: value });
    }
    if (name === "toDOB") {
      setEndDateFieldColor("black");
      setSearchValue({ ...searchValue, [name]: value });
    }
    setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams({
      UserName: searchValue.UserName,
      Email: searchValue.Email,
      Designation: searchValue.Designation,
      fromDOB: searchValue.fromDOB,
      toDOB: searchValue.toDOB,
      Type: searchValue.Type,
    });
    AdminUserSearch(params)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchValue]);

  const ClearData = () => {
    setSearchValue({
      UserName: "",
      Email: "",
      Designation: "",
      fromDOB: "",
      toDOB: "",
      Type: "",
    });
    setDateFieldColor("gray");
    setEndDateFieldColor("gray");
    setSearchError(null);

    setTypeValue(null);
    const inputFields = document.getElementsByTagName("input");

    listUsers();
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

  const type = ["Innovator", "Admin", "Committee"];

  return (
    <>
      <Helmet>
        <title>Admin | Innovators</title>
      </Helmet>
      <Box
        sx={{
          width: "92%",
          marginBottom: "120px",
          marginTop: "70px",
          marginLeft: "-22px",
        }}
      >
        <Stack
          data-testid="employee-id"
          direction="row"
          alignItems="center"
          spacing={1}
          mt={-5}
          mb={5}
          justifyContent="end"
        >
          <Button
            data-testid="Employee-search-btn"
            className={employeeStyle.btn_grad}
            onClick={(prev) => handleCloseSearch(prev)}
            startIcon={<SearchIcon fontSize="small" />}
          >
            Search Table
          </Button>
          <Button
            data-testid="Employee-add-Btn"
            className={employeeStyle.btn_grad}
            onClick={handleOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>
        <Stack spacing={1}>
          {show && (
            <div className={employeeStyle.searchCard}>
              <Typography
                sx={{
                  flex: "1 1 100%",
                  backgroundColor: "rgb(155 209 242)",
                  height: "55px",
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
                <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
                  <TextField
                    inputProps={{ "data-testid": "search-employee-name" }}
                    id="outlined-name"
                    name="UserName"
                    size="small"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => handleSearch("UserName", e)}
                  />
                  <TextField
                    inputProps={{ "data-testid": "search-employee-email" }}
                    id="outlined-basic"
                    name="Email"
                    size="small"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => handleSearch("Email", e)}
                  />
                </Stack>
                <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
                  <Autocomplete
                    id="combo-box-demo"
                    name="Designation"
                    size="small"
                    options={designation}
                    value={searchValue.Designation}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        data-testid="designation-employee-field"
                        label="Designation"
                        onBlur={(e) => handleSearch("Designation", e)}
                      />
                    )}
                    onSelect={(e) => handleSearch("Designation", e)}
                  />

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="Type"
                    size="small"
                    options={type}
                    value={typeValues}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        data-testid="type-employee-field"
                        label="Type"
                        onBlur={(e) => handleSearch("Type", e)}
                      />
                    )}
                    onSelect={(e) => handleSearch("Type", e)}
                  />
                </Stack>
                <Stack spacing={2} flexGrow={1} sx={{ width: "20%" }}>
                  <TextField
                    type="Date"
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    id="exampleFormControlInput1"
                    name="fromDOB"
                    size="small"
                    label="Start"
                    inputProps={{ "data-testid": "search-employee-startDate" }}
                    onBlur={handleBlur}
                    InputProps={{
                      style: { color: dateFieldColor },
                    }}
                    onChange={(e) => handleSearch("fromDOB", e)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="Date"
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    inputProps={{ "data-testid": "search-employee-endDate" }}
                    id="exampleFormControlInput1"
                    name="toDOB"
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
                </Stack>
                <Stack title="Clear" cursor="pointer">
                  {/* <Tooltip title="Clear" cursor="pointer"> */}
                  <RestartAltIcon
                    sx={{ marginTop: "64px" }}
                    color="error"
                    cursor="pointer"
                    onClick={ClearData}
                  />
                  {/* </Tooltip> */}
                </Stack>
              </Stack>
            </div>
          )}
          <div className={employeeStyle.empcard}>
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
                            <>
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(event, row?._id)
                                }
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row?._id}
                              >
                                {" "}
                                <TableCell />
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  title={row?.UserName}
                                  className={classes.wrapper}
                                >
                                  {row?.UserName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  title={row?.Email}
                                  className={classes.wrapper}
                                >
                                  {row?.Email}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.Designation}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(row?.DOB).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  {types[row?.Type]}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.wrapper}
                                  title={
                                    row?.grouplist &&
                                      row?.grouplist?.length === 0
                                      ? "group not allocted"
                                      : row?.grouplist &&
                                      row?.grouplist[0]?.GroupName
                                  }
                                >
                                  {row?.grouplist &&
                                    row?.grouplist?.length === 0 ? (
                                    <> group not allocted </>
                                  ) : (
                                    row?.grouplist &&
                                    row?.grouplist[0]?.GroupName
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 0 }}
                                  >
                                    <Tooltip title="Change password">
                                      <IconButton
                                        onClick={() =>
                                          changeUserpasswordopen(row?.Email)
                                        }
                                        color="primary"
                                        className={employeeStyle.deleteIcon}
                                        data-testid="change-user-pass-word"
                                      >
                                        <EditOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        onClick={() =>
                                          deleteUser(row?._id, index)
                                        }
                                        color="error"
                                        className={employeeStyle.deleteIcon}
                                        data-testid="delete-button"
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })
                      : ""}
                  </TableBody>
                </Table>
                {(data?.length === 0 || data?.errorCode) && (
                  <img
                    src="/favicon/logo_comittee.png"
                    className={employeeStyle.employeePageLoding}
                    alt="CommitteeImage"
                    width="300"
                    height="300"
                  />
                )}
              </TableContainer>
              {data?.length > 0 && (
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
      {/* New use Popover */}
      <Popover
        open={Boolean(opens)}
        anchorEl={opens}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleCsvModalOpen()}
          data-testid="csv-upload-Btn"
        >
          <Iconify icon={"eos-icons:csv-file"} sx={{ mr: 2 }} />
          Csv Upload
        </MenuItem>
        <MenuItem
          onClick={() => handleOpenUser()}
          data-testid="add-user-manual"
        >
          <Iconify icon={"uiw:user-add"} sx={{ mr: 2 }} />
          Add user
        </MenuItem>
      </Popover>

      {/* Add single user modal */}

      <Modal
        open={userOpen}
        onClose={handleCloseUser}
        initialFocusRef={modalRef}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event);
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",

            boxShadow: 24,
            p: 4,
          }}
        >
          <div>
            <span
              onClick={handleCloseUser}
              data-testid="add-user-modal-close"
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
              <CloseIcon className={employeeStyle.addusercloseIcon} />
            </span>
            <h4>Add User</h4>
          </div>
          <form sx={{ textAlign: "center" }}>
            <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
              <TextField
                ref={userNameRef}
                type="text"
                sx={{ height: "20%" }}
                autoComplete="off"
                size="medium"
                id="exampleFormControlInput1"
                inputProps={{ "data-testid": "add-user-name" }}
                name="UserName"
                onChange={(e) => onInputChange(e)}
                label="Name"
              />
            </FormControl>
            {NameError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  marginLeft: "20px",
                  textAlign: "left",
                }}
              >
                {NameError}
              </p>
            ) : (
              ""
            )}
            <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
              <TextField
                ref={emailRef}
                type="text"
                sx={{ height: "20%" }}
                autoComplete="off"
                size="medium"
                id="exampleFormControlInput1"
                inputProps={{ "data-testid": "add-user-Email" }}
                name="Email"
                onChange={(e) => onInputChange(e)}
                label="Email"
              />
            </FormControl>
            {EmailError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  marginLeft: "20px",
                  textAlign: "left",
                }}
              >
                {EmailError}
              </p>
            ) : (
              ""
            )}
            <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
              <TextField
                inputProps={{
                  max: moment().subtract(1, "days").format("YYYY-MM-DD"),
                  "data-testid": "add-user-dob",
                }}
                ref={dobRef}
                type="Date"
                onKeyDown={onKeyDown}
                sx={{ height: "20%" }}
                autoComplete="off"
                size="medium"
                id="exampleFormControlInput1"
                name="DOB"
                onChange={(e) => onInputChange(e)}
                label="Dob"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            {DobError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginBottom: "-6px",
                  marginLeft: "20px",
                  textAlign: "left",
                }}
              >
                {DobError}
              </p>
            ) : (
              ""
            )}

            <FormControl fullwidth sx={{ m: 2 }}>
              <Box
                sx={{
                  width: { sm: 200, md: 200, lg: 480, xl: 400 },
                  "& .MuiInputBase-root": {
                    height: 54,
                  },
                }}
              >
                <InputLabel ref={designationRef} id="demo-simple-select-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="Designation"
                  label="Designation"
                  data-testid="add-user-Designation"
                  sx={{
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 54,
                    },
                  }}
                  onChange={(e) => onInputChange(e)}
                >
                  {designation?.map((dataVal, value) => {
                    return (
                      <MenuItem
                        value={dataVal}
                        data-testid="designation-select"
                      // inputProps={{ "data-testid": "designation-select" }}
                      >
                        {dataVal}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
            </FormControl>
            {DesignationError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginLeft: "20px",
                  marginBottom: "-6px",
                  textAlign: "left",
                }}
              >
                {DesignationError}
              </p>
            ) : (
              ""
            )}
            <div>
              <Button
                sx={{ m: 2, width: "17%", height: 35, marginLeft: "80%" }}
                className={employeeStyle.submituserbutton}
                type="submit"
                variant="contained"
                data-testid="add-user-submit-btn"
                size="small"
                style={{ backgroundColor: "#144399" }}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* add user modal */}
      <Modal
        open={csvModal}
        onClose={handleModalClose}
        center
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSubmission();
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: "10px",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h4>
            Upload CSV{" "}
            <span
              onClick={handleModalClose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "50 %",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "60%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon className={employeeStyle.addusercloseIcon} />
            </span>{" "}
          </h4>
          <br />
          <ul>
            <li>Csv file size should be less than 2 MB</li>
            <li>
              {" "}
              Csv file should contain fields (Username,Email,DOB,Designation)
            </li>
            {/* <li> Email domain name must be '@innovaturelabs.com' </li> */}
          </ul>
          <br />
          <input
            data-testid="csv-upload-field"
            ref={filetypeRef}
            type="file"
            accept="text/csv"
            name="file"
            id="inputTag"
            onChange={changeHandler}
            style={{ maxWidth: "25vw" }}
          />
          {fileError != null ? <p style={{ color: "red" }}>{fileError}</p> : ""}
          <Button
            sx={{ m: 2, width: "15%", height: 35, marginLeft: "80%" }}
            type="button"
            data-testid="Csv-submit-btn"
            onClick={() => handleSubmission()}
            className={employeeStyle.submituserbutton}
            variant="contained"
            size="small"
            style={{ backgroundColor: "#144399" }}
          >
            Upload
          </Button>
          <br />
        </Box>
      </Modal>
      <Modal
        open={changePasswordOpen}
        onClose={changeUserPasswordClose}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handlePasswordSubmit(event);
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div>
            <span
              onClick={changeUserPasswordClose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "12%",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "80%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon className={employeeStyle.addusercloseIcon} />
            </span>
            <h3 style={{ marginLeft: '9px', fontSize: 'x-large' }}>Reset Password</h3>
          </div>
          <div className={employeeStyle.modalContent}>
            <Stack>
              {/* <FormControl fullwidth sx={{ m: 2 }} autocomplete="off">
                <TextField
                  type="password"
                  sx={{ width: "100%" }}
                  autocomplete="new-password"
                  size="medium"
                  id="exampleFormControlInput1"
                  name="newPassword"
                  onChange={(e) => onInputpasswordChange(e)}
                  label="Enter password"
                />
              </FormControl> */}
              <FormControl sx={{ m: 1, width: '33ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password"> New Password</InputLabel>
                <OutlinedInput
                  onChange={(e) => onInputpasswordChange(e)}
                  name="newPassword"
                  inputProps={{ "data-testid": "pass-change-new-pass" }}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label=" New Password"
                />
              </FormControl>

              {/* <input type='password' placeholder='Enter new password' name='Password' onChange={e => onInputpasswordChange(e)} /> */}
              {newPassErr != null ? (
                <p
                  style={{
                    color: "red",
                    marginTop: "-6px",
                    marginLeft: "20px",
                    marginBottom: "-6px",
                    textAlign: "left",
                  }}
                >
                  {newPassErr}
                </p>
              ) : (
                ""
              )}

              <FormControl sx={{ m: 1, width: '33ch',mt:2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password"> Confirm Password</InputLabel>
                <OutlinedInput
                  onChange={(e) => ConfirmPasswordChange(e)}
                  name="confirmPass"
                  inputProps={{ "data-testid": "pass-change-confirm" }}
                  id="outlined-adornment-password"
                  type={showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label=" Confim Password"
                />
              </FormControl>
            </Stack>
            {/* <input type='password' placeholder='confirm new password' name='confirmPass' onChange={e => ConfirmPasswordChange(e)} /> */}
            {confirmPassError != null ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-6px",
                  marginLeft: "20px",
                  marginBottom: "-6px",
                  textAlign: "left",
                }}
              >
                {confirmPassError}
              </p>
            ) : (
              ""
            )}
            <div>
              <Button
                type="submit"
                sx={{ m: 2, width: "30%", height: 35 }}
                className={employeeStyle.submituserbutton}
                variant="contained"
                size="small"
                data-testid="change-pass-submit"
                style={{ backgroundColor: "#144399" }}
                onClick={(e) => handlePasswordSubmit(e)}
              >
                Update
              </Button>
            </div>
            {/* <button type='submit' className={employeeStyle.subBtn} onClick={(e) => handlePasswordSubmit(e)}>Update</button> */}
          </div>
        </Box>
      </Modal>
    </>
  );
}
