import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";

import AppBar from "@mui/material/AppBar";
import { Helmet } from "react-helmet-async";
import SwipeableViews from "react-swipeable-views";
import PointTableGroups from "./pointTableGroups";
import tableStyle from "./pointTableInn.module.css";
// @mui
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Scrollbar from "../../../../components/scrollbar";
import api from "../../../../api/API_URL";
import AllEvents from "./AllEvents";
import AllEventWithGame from "./AllEventWithGame";
import EventWiseWinner from "./EventWiseWinner";
import GameWiseWinner from "./GameWiseWinners";
import { useLocation } from "react-router-dom";

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "dummy2", label: "", alignRight: false },
  { id: "name", label: "Event Name", alignRight: false },
  { id: "role", label: "Points", alignRight: false },
  { id: "dummy3", label: "", alignRight: false },

  { id: "date", label: "Date", alignRight: false },
];

// ----------------------------------------------------------------------

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function PointTableLive() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const location = useLocation();
  const currentPath = location.pathname;
  const lastSlashIndex = currentPath.lastIndexOf("/");
  const urlBeforeLastSegment = currentPath.substring(0, lastSlashIndex + 14);

  const myCurrentUrl = `/dashboardInno/eventPoints/gropStandings`;

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [selected] = useState([]);

  const [USERLIST, setUSERLIST] = useState([]);

  useEffect(() => {
    if (urlBeforeLastSegment === myCurrentUrl) {
      setValue(3);
    }
  }, []);

  useEffect(() => {
    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);

    axiosPrivate
      .post(api.GET_CURRENT_EVENT_SWITCH_GROUP, {
        GroupId: pasedValue.data.GroupId,
      })
      .then((response) => {
        setUSERLIST(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <>
      <div className={tableStyle.tableSize}>
        <Helmet>
          <title> Point Table </title>
        </Helmet>

        <div className={tableStyle.tabCard}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            width="70vw"
          >
            <Box sx={{ width: "70vw" }}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  style={{ backgroundColor: "white" }}
                  indicatorColor="secondary"
                  textColor="primary"
                  variant="standard"
                  aria-label="full width tabs example"
                >
                  <Tab label="Live" {...a11yProps(0)} />
                  <Tab label="All" {...a11yProps(1)} />
                  <Tab label="own" {...a11yProps(2)} />
                  <Tab label="Group Standings" {...a11yProps(3)} />
                  <Tab label="Event Wise Winner" {...a11yProps(4)} />
                  <Tab label="Game Wise Winner" {...a11yProps(5)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Card sx={{ borderRadius: "5px" }}>
                    <Scrollbar>
                      <TableContainer>
                        <Table>
                          <TableRow>
                            {TABLE_HEAD.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  color: "white",
                                  backgroundColor: "#060660",
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableBody>
                            {USERLIST.length > 0 ? (
                              USERLIST.map((row) => {
                                const { _id, TotalPoint, eventlist } = row;
                                const selectedUser =
                                  selected.indexOf(_id) !== -1;

                                return (
                                  eventlist.length > 0 && (
                                    <TableRow
                                      hover
                                      key={_id}
                                      tabIndex={-1}
                                      role="checkbox"
                                      selected={selectedUser}
                                      // className={tableStyle.tableHover}
                                    >
                                      <TableCell></TableCell>
                                      <TableCell>
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          spacing={2}
                                        >
                                          {eventlist.map((val) => (
                                            <Typography
                                              key={eventlist.id}
                                              variant="subtitle2"
                                              noWrap
                                            >
                                              {val?.EventName}
                                            </Typography>
                                          ))}
                                        </Stack>
                                      </TableCell>

                                      <TableCell align="left">
                                        {TotalPoint}
                                      </TableCell>
                                      <TableCell align="left"></TableCell>

                                      {eventlist.map((val) => (
                                        <TableCell key={val.id} align="left">
                                          {new Date(
                                            val.createdAt
                                          ).toLocaleDateString(
                                            "en-us",
                                            options
                                          )}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  )
                                );
                              })
                            ) : (
                              <TableRow style={{ height: 53 }}>
                                <TableCell
                                  colSpan={6}
                                  style={{ textAlign: "center" }}
                                >
                                  Not Participating any Event
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Scrollbar>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <AllEvents />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <AllEventWithGame />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <PointTableGroups />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <EventWiseWinner />
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                  <GameWiseWinner />
                </TabPanel>
              </SwipeableViews>
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
}
