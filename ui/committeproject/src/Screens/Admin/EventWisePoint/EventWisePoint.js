import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import MilitaryTechSharpIcon from "@mui/icons-material/MilitaryTechSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import tablecss from "./EventWisePoint.module.css";

import {
  Box,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  eventWisewinner,
  FindEventgroupList,
} from "../../../api/ServiceFile/ApiService";

export default function EventWisePoint() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [data, setData] = useState([]);
  const [winnerdata, setWinnerData] = useState([]);
  const [winnermodalopen, setWinnermodalopen] = useState(false);

  const columns = [
    { id: "EventName", label: "", minWidth: 10 },
    { id: "EventName", label: "Event", minWidth: 130 },
    { id: "GroupName", label: "Winner", minWidth: 130 },
    { id: "Point", label: "", minWidth: 10 },
  ];
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 130,
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    listeventwinners();
  }, []);
  // find committee id //

  async function listeventwinners() {
    eventWisewinner().then((response) => {
      if (response) {
        setData(response.data);
      }
    });
  }
  async function eventwinners(id) {
    await FindEventgroupList(id).then((response) => {
      if (response) {
        setWinnerData(response.data);
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleeventwinners = (id) => {
    eventwinners(id);

    setWinnermodalopen(true);
  };
  const handleeventwinnersclose = (e) => {
    setWinnermodalopen(false);
    setWinnerData([]);
  };
  return (
    <>
      <Helmet>
        <title> Admin | Home </title>
      </Helmet>
      <Box sx={{}} className="col-md-12">
        <Stack
          data-testid="event-wise-point"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        ></Stack>
        <div className={tablecss.eventwisetablecard}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 75 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
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
                    <TableCell
                      style={{ backgroundColor: "rgb(155 209 242)" }}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0
                    ? data
                        .slice(
                          (page - 1) * rowsPerPage,
                          (page - 1) * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row?._id}>
                              <TableCell />
                              <TableCell
                                sx={{ paddingLeft: "13px" }}
                                component="th"
                                scope="row"
                                padding="none"
                                title={row.EventName}
                                className={classes.wrapper}
                              >
                                {row.EventName}
                              </TableCell>
                              {row.WinnerDEtails.length > 0 ? (
                                <TableCell
                                  className={classes.wrapper}
                                  title={row.WinnerDEtails.reduce(
                                    (accumulator, winnerDetails) => {
                                      return (
                                        accumulator +
                                        winnerDetails?.grouplist[0]?.GroupName +
                                        ","
                                      );
                                    },
                                    ""
                                  ).slice(0, -2)}
                                >
                                  {row.WinnerDEtails.reduce(
                                    (accumulator, winnerDetails) => {
                                      return (
                                        accumulator +
                                        winnerDetails?.grouplist[0]?.GroupName +
                                        ", "
                                      );
                                    },
                                    ""
                                  ).slice(0, -2)}
                                </TableCell>
                              ) : (
                                <TableCell>No winner</TableCell>
                              )}
                              {row.WinnerDEtails.length > 0 ? (
                                <TableCell>
                                  <MilitaryTechSharpIcon
                                    color="error"
                                    direction="row"
                                    alignItems="center"
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                </TableCell>
                              ) : (
                                <TableCell></TableCell>
                              )}
                              <Stack
                                direction="row"
                                spacing={3}
                                title="View group wise standings"
                              >
                                <IconButton
                                  color="primary"
                                  data-testId="modal-Btn"
                                  onClick={() =>
                                    handleeventwinners(
                                      row?.WinnerDEtails[0]?._id?.EventId
                                    )
                                  }
                                >
                                  <RemoveRedEyeIcon
                                    style={{
                                      width: "23",
                                      height: "23",
                                      marginTop: "8",
                                    }}
                                    className={tablecss.Eyeicon}
                                  />
                                </IconButton>
                              </Stack>
                            </TableRow>
                          );
                        })
                    : ""}
                </TableBody>
              </Table>
              {data.length == 0 && (
                <img
                  src="/favicon/logo_comittee.png"
                  alt="committee logo"
                  width="300"
                  height="300"
                  className={tablecss.eventstandingPageLoding}
                />
              )}
            </TableContainer>
            {data.length > 0 && (
              <Stack
                spacing={2}
                style={{
                  position: "absolute",
                  right: "16%",
                  marginTop: "2.4%",
                }}
              >
                <Pagination
                  siblingCount={1}
                  count={data.length <= 8 ? 1 : Math.ceil(data.length / 8)}
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
      </Box>
      <Modal open={winnermodalopen} onClose={handleeventwinnersclose}>
        <Box
          sx={{
            position: "absolute",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            bgcolor: "background.paper",

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
            Event Winners
            <span
              data-testId="modalclose-Btn"
              onClick={handleeventwinnersclose}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "50 %",
                right: "0 %",
                padding: "0px 0px",
                marginLeft: "67%",
                transform: "translate(0 %, -50 %)",
              }}
            >
              <CloseIcon className={tablecss.closemodalicon} />
            </span>
          </Typography>
          <br />
          <form>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: "rgb(155 209 242)",
                        color: "black",
                      }}
                    >
                      Group
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "rgb(155 209 242)",
                        color: "black",
                      }}
                    >
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {winnerdata.length > 0 ? (
                    winnerdata.map((row, index) => {
                      return (
                        <TableRow key={row?._id}>
                          <TableCell>{row?.grouplist[0]?.GroupName}</TableCell>
                          <TableCell>{row?.count}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <p style={{ marginLeft: "55%" }}>No Data Available</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </Box>
      </Modal>
    </>
  );
}
