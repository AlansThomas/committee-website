import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  getEventgameList,
  GetAllEvents,
} from "../../../../api/ServiceFile/ApiService";
import classes from "../Hover.module.css";
import HistoryStyles from "./History.module.css";

export default function History() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [PointList, setPointList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    GetAllEvents().then((response) => {
      setPointList(response.data);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //on Click toggle
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //List Point Table ==========================================================================
  function EventClick(eId) {
    let obj = {
      EventId: eId,
    };
    getEventgameList(obj).then((response) => {
      setGameList(response.data);
    });
  }
  // Point Table =================================================================================================
  return (
    <>
      <Helmet>
        <title> Admin | Event </title>
      </Helmet>
      <div className={HistoryStyles.historycard}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "19%",
                  backgroundColor: "rgb(155 209 242)",
                  color: "black",
                }}
              >
                Quarter name
              </TableCell>
              <TableCell
                sx={{
                  width: "28%",
                  backgroundColor: "rgb(155 209 242)",
                  color: "black",
                }}
              >
                Event name
              </TableCell>
              <TableCell
                sx={{
                  width: "40%",
                  backgroundColor: "rgb(155 209 242)",
                  color: "black",
                }}
              >
                Event description
              </TableCell>
              <TableCell
                sx={{
                  width: "23%",
                  backgroundColor: "rgb(155 209 242)",
                  color: "black",
                }}
              >
                File
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Paper style={{ overflow: "auto" }}>
          {PointList.length > 0 ? (
            PointList.slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            ).map((row) => {
              return (
                <Accordion
                  expanded={expanded === row._id}
                  onChange={handleChange(row._id)}
                  key={row._id}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={row._id}
                    onClick={() => EventClick(row._id)}
                    className={classes.accordionHover}
                    data-testid="accordinBtn_btn"
                  >
                    <Typography
                      sx={{
                        width: "20%",
                        wordWrap: "break-word",
                        flexShrink: 0,
                      }}
                    >
                      {row?.QuarterId?.QuaterName}
                    </Typography>
                    <Typography sx={{ width: "30%", flexShrink: 0 }}>
                      {row.EventName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        width: "37%",
                        wordWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: row?.EventDescription,
                      }}
                    ></Typography>
                    <Typography
                      sx={{ color: "text.secondary", marginLeft: "6%" }}
                    >
                      <a href={row.File} download>
                        <FileCopyIcon className={HistoryStyles.fileIcon} />
                      </a>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper style={{ maxHeight: 450, overflow: "auto" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgb(198 232 253);",
                                color: "black",
                              }}
                            >
                              Game Name
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgb(198 232 253);",
                                color: "black",
                              }}
                            >
                              Description
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgb(198 232 253);",
                                color: "black",
                              }}
                            >
                              Start Date
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgb(198 232 253);",
                                color: "black",
                              }}
                            >
                              End Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {gameList.length > 0 ? (
                            gameList.map((rows) => {
                              return (
                                <TableRow key={rows._id}>
                                  <TableCell>{rows.GameName}</TableCell>
                                  <TableCell>{rows.GameDesc}</TableCell>
                                  <TableCell>
                                    {moment(rows.StartDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {moment(rows.EndDate).format("DD/MM/YYYY")}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>
                                <p style={{ textAlign: "center" }}>
                                  {" "}
                                  No Data Available
                                </p>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <img
              src="/favicon/logo_comittee.png"
              className={HistoryStyles.HistoryPageLoding}
              alt="Committee logo"
              width="300"
              height="300"
            />
          )}
        </Paper>
      </div>
      {PointList.length > 0 && (
        <Stack
          spacing={2}
          style={{ position: "absolute", right: "16%", marginTop: "1%" }}
        >
          <Pagination
            siblingCount={0}
            count={PointList.length <= 5 ? 1 : Math.ceil(PointList.length / 5)}
            rowsPerPage={rowsPerPage}
            page={page}
            onChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
}
