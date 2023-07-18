import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import React, { useEffect, useState } from "react";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import classes from "../../../Admin/AllEvents/Hover.module.css";
import AllEvenStyles from "./AllEvents.module.css";

export default function AllEvents() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [PointList, setPointList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [gameList, setGameList] = useState([]);
  const maxItemsPerPage =
    PointList.length <= 5 ? 1 : Math.ceil(PointList.length / 5);
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
  useEffect(() => {
    axiosPrivate.get(api.GET_ALL_EVENTS).then((response) => {
      setPointList(response.data);
    });
  }, []);

  async function EventClick(id) {
    await axiosPrivate
      .post(api.POST_GAME_LIST_EVENT_WINNER.concat(id))
      .then((response) => {
        if (response) {
          setGameList(response.data);
        }
      });
  }
  // Point Table =================================================================================================

  return (
    <div className={AllEvenStyles.alleventcard} style={{ borderRadius: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "1%",
                backgroundColor: "#060660",
                color: "white",
                borderTopLeftRadius: "5px",
              }}
            ></TableCell>
            <TableCell
              sx={{ width: "13%", backgroundColor: "#060660", color: "white" }}
            >
              Event Name
            </TableCell>
            <TableCell
              sx={{
                width: "29%",
                backgroundColor: "#060660",
                color: "white",
                padding: "14px",
                borderTopRightRadius: "5px",
              }}
            >
              Event Description
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Paper style={{ maxHeight: 460, overflow: "auto" }}>
        {PointList.length > 0 ? (
          PointList.slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          ).map((row) => {
            return (
              <Accordion
                expanded={expanded === row?._id}
                onChange={handleChange(row?._id)}
                key={row?._id}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={row?._id}
                  onClick={() => EventClick(row?._id)}
                  className={classes.accordionHover}
                  style={{ width: "100%" }}
                >
                  <Typography
                    sx={{ width: "45px", flexShrink: 0 }}
                  ></Typography>
                  <Typography sx={{ width: "30.3%", flexShrink: 0 }}>
                    {row?.EventName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      width: "55%",
                      wordWrap: "break-word",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: row?.EventDescription,
                    }}
                  ></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Table sx={{ marginTop: "25px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{ backgroundColor: "#060660", color: "white" }}
                          >
                            Group Name
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#060660", color: "white" }}
                          >
                            Points
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {gameList.length > 0 ? (
                          gameList.map((rows) => {
                            return (
                              <TableRow key={rows?._id}>
                                <TableCell>
                                  {rows?.grouplist[0]?.GroupName}
                                </TableCell>
                                <TableCell>{rows?.count}</TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell>
                              <p style={{ textAlign: "center" }}>
                                {" "}
                                No Data Available
                              </p>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              fontFamily: "Public Sans,sans-serif",
              fontWeight: "400",
              marginTop: 18,
              paddingBottom:'1rem',
            }}
          >
            No data available
          </p>
        )}
      </Paper>
      <div style={{ display: "grid", justifyContent: "end" }}>
        {PointList?.length > 5 && (
          <Stack
            spacing={2}
            style={{ position: "relative", right: "16%", marginTop: "1%" }}
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
      </div>
    </div>
  );
}
