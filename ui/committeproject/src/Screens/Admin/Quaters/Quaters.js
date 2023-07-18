import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GroupsStyles from "../Groups/Group/Groups.module.css";
import grouppointcss from "../Points/GroupPoints/GroupPoints.module.css";
import EventHistoryStyles from "../AllEvents/EventHisory/EventHistory.module.css";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
  addQuaters,
  editQuaters,
  listQuaters,
  resetQuaters,
  resetYearly,
} from "../../../api/ServiceFile/ApiService";
import moment from "moment";

import Iconify from "src/components/iconify/Iconify";
import QuatersModal from "./QutersModal";
import ToasterGlobal from "../../../TosterGlobal/ToasterGlobal";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "Qno", label: "Qno", minWidth: 50 },
  { id: "qName", label: "Quater Name", minWidth: 150 },
  { id: "sDate", label: "Start Date", minWidth: 100 },
  { id: "eDate", label: "End Date", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "Action", label: "", minWidth: 50 },
];

const validateEndDate = (startDate, endDate) => {
  const formattedStartDate = moment(startDate, "YYYY/MM/DD");
  const formattedEndDate = moment(endDate, "YYYY/MM/DD");
  console.log("5");
  if (formattedEndDate.isBefore(formattedStartDate)) {
    console.log("6");
    return "End date must be after start date";
  } else {
    return "";
  }
};

const status = (sDate, eDate) => {
  let color, statusText;
  switch (true) {
    case moment().isSameOrAfter(sDate, "day") &&
      moment().isSameOrBefore(eDate, "day"):
      color = "green";
      statusText = "Active";
      break;
    case moment().isAfter(eDate):
      color = "red";
      statusText = "Completed";
      break;
    case moment().isBefore(sDate):
      color = "orange";
      statusText = "Upcoming";
      break;
    default:
      color = "black";
      statusText = "";
      break;
  }
  return <TableCell style={{ color }}>{statusText}</TableCell>;
};

export default function Quaters() {
  const [showBtn, setShowBtn] = useState(false);
  const [showBtn2, setShowBtn2] = useState(false);
  const [year, setYear] = useState(2023);
  const [quterList, setQuterList] = useState([]);
  const [alwin, setAlwin] = useState([]);
  const [quaternameErr, setQuaternameErr] = useState([]);
  const [quaterSdateErr, setQuaterSdateErr] = useState([]);
  const [quaterEdateErr, setQuaterEdateErr] = useState([]);
  const startYear = 2005;
  const endYear = new Date().getFullYear();
  const years = [];
  const Navigate = useNavigate();
  const [quater, setQuater] = useState({
    quaterNumber: "",
    quaterName: "",
    startDate: "",
    endDate: "",
  });
  const [addQuater, setAddQuater] = useState(false);

  const formErr = {
    quaternameErr,
    quaterSdateErr,
    quaterEdateErr,
  };

  const createQuater = () => {
    addQuaters()
      .then((response) => {
        ToasterGlobal("Quarters created successfully", 12, ["success"]);
        fetchQuaterList();
      })
      .catch((error) => {
        ToasterGlobal(error?.response?.data?.errMsg, 12, ["error"]);
      });
  };

  const endQuaterModal = (row) => {
    setAlwin(row);
    handleQuaterModalOpen();
  };
  const handleQuaterModalOpen = () => {
    setAddQuater(true);
  };

  const handleQuaterModalClose = () => {
    setQuater({ quaterNumber: "", quaterName: "", startDate: "", endDate: "" });
    setAddQuater(false);
    setQuaternameErr([]);
    setQuaterSdateErr([]);
    setQuaterEdateErr([]);
    setAlwin([]);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const getYearwise = (e) => {
    setYear(e);
  };

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const fetchQuaterList = async () => {
    let body = {
      year: year,
    };
    await listQuaters(body).then((response) => {
      setQuterList(response.data);
      console.log(response.data.length);

      if (response?.data?.length > 2 || year !== endYear) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }

      if (
        response?.data?.length === 0 ||
        year == endYear ||
        response?.data[0]?.YearlyResetStatus == 0
      ) {
        setShowBtn2(false);
      } else {
        setShowBtn2(true);
      }
    });
  };
  console.log(showBtn2);
  const detaileView = (id) => {
    Navigate(`/dashboard/quaters/detailedView?mange=${id}`);
  };

  const onInputChange = (e) => {
    e.preventDefault();
    const Qno = e.target.value;

    switch (e.target.name) {
      case "quaterName":
        setQuaternameErr(Qno.length === 0 ? "Please enter quarter name" : "");
        break;
      case "startDate":
        setQuaterSdateErr(Qno.length === 0 ? "Please select start date" : "");
        break;
      case "endDate":
        setQuaterEdateErr(Qno.length === 0 ? "Please select end date" : "");
        break;
      default:
    }
    setQuater({ ...quater, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let endDateError;
    if (quater?.startDate === "") {
      console.log("1");
      endDateError = validateEndDate(alwin.StartDate, quater.endDate);
    } else if (quater?.endDate === "") {
      console.log("2");
      endDateError = validateEndDate(quater.startDate, alwin.EndDate);
    } else {
      console.log("3");
      endDateError = validateEndDate(quater.startDate, quater.endDate);
    }
    console.log(endDateError);
    if (endDateError) {
      setQuaterEdateErr(endDateError);
      return;
    }
    if (
      quaterEdateErr.length !== 0 ||
      quaterSdateErr.length !== 0 ||
      quaternameErr.length !== 0
    ) {
      return;
    }
    let body = {
      quaterName:
        quater.quaterName === "" ? alwin.QuaterName : quater.quaterName,
      startDate:
        quater?.startDate === ""
          ? moment(alwin.StartDate).format("YYYY-MM-DD")
          : quater?.startDate,
      endDate:
        quater?.endDate === ""
          ? moment(alwin.EndDate).format("YYYY-MM-DD")
          : quater?.endDate,
      quarterId: alwin._id,
    };
    editQuaters(body)
      .then((response) => {
        ToasterGlobal("Quarter edited successfully ", 1, ["success"]);
        handleQuaterModalClose();
        fetchQuaterList();
      })
      .catch((error) => {
        ToasterGlobal(error?.response?.data?.errMsg, 15, ["error"]);
      });
  };

  const yearlyReset = () => {
    let body = {
      year: year,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reset this year",
    }).then((response) => {
      resetYearly(body)
        .then((response) => {
          console.log(response);
          ToasterGlobal("Year rested successfully", 11, ["success"]);
        })
        .catch((error) => {
          ToasterGlobal(error?.response?.data?.errMsg, 12, ["error"]);
        });
    });
  };

  const resetQuater = (id) => {
    let body = { quarterId: id };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reset this quater",
    }).then((response) => {
      if (response.isConfirmed) {
        resetQuaters(body)
          .then((response) => {
            ToasterGlobal("Quater reseted successfully", 12, ["success"]);
            fetchQuaterList();
          })
          .catch((error) => {
            ToasterGlobal(error?.response?.data?.errMsg, 12, ["error"]);
          });
      }
    });
  };

  useEffect(() => {
    fetchQuaterList();
  }, [year]);

  return (
    <>
      <Helmet>
        <title>Admin | Quater management</title>
      </Helmet>
      <div
        style={{
          width: "100%",
          marginLeft: "-7.8%",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "end",
            marginBottom: "40px",
          }}
        >
          {showBtn2 && (
            <Button
              startIcon={<RestartAltIcon />}
              title="Yearly reset"
              onClick={yearlyReset}
            >
              Yearly reset
            </Button>
          )}
          {showBtn && (
            <Button
              className={GroupsStyles.btn_group}
              startIcon={<Iconify icon="eva:plus-fill" />}
              title="Add new quarters"
              onClick={createQuater}
            >
              Quarters
            </Button>
          )}
          <Typography sx={{ padding: "6px" }}>Select year :</Typography>
          <select
            defaultValue={new Date().getFullYear()}
            onChange={(e) => {
              getYearwise(e.target.value);
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div
          className={grouppointcss.eventhistorycard}
          style={{ maxHeight: "500px" }}
        >
          <TableContainer sx={{ maxHeight: 700 }}>
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
                {quterList?.length > 0 ? (
                  quterList?.map((row, index) => (
                    <TableRow
                      key={index}
                      className={grouppointcss.accordionHover}
                    >
                      <TableCell>{row?.QuaterNumber}</TableCell>
                      <TableCell>{row?.QuaterName}</TableCell>
                      <TableCell>
                        {moment(row?.StartDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row?.EndDate).format("DD/MM/YYYY")}
                      </TableCell>
                      {status(row?.StartDate, row?.EndDate)}
                      <TableCell>
                        {row?.ResetStatus === 0 && (
                          <IconButton
                            color="primary"
                            title="Detailed view"
                            onClick={() => detaileView(row?._id)}
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                        )}
                        {moment().isSameOrBefore(row?.EndDate,"day") && (
                          <IconButton
                            color="primary"
                            title="Edit quater"
                            onClick={() => endQuaterModal(row)}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        )}

                        {moment(row?.EndDate).isBefore("day") &&
                          row?.ResetStatus === 1 && (
                            <IconButton
                              color="primary"
                              title="reset quater"
                              onClick={() => resetQuater(row?._id)}
                            >
                              <RestartAltIcon />
                            </IconButton>
                          )}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
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
        </div>
      </div>
      <QuatersModal
        open={addQuater}
        onClose={handleQuaterModalClose}
        alwin={alwin}
        quater={quater}
        onInputChange={onInputChange}
        formErr={formErr}
        handleSubmit={handleEditSubmit}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
