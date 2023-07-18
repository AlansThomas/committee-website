import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import API_URL from "src/api/API_URL";
import { axiosPrivate } from "src/api/Interceptor/intercepter";
import Polls from "./polls";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: "0px" }}>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ExpiredOrActivePolls() {
  const [value, setValue] = React.useState(0);
  const [pollData, setPollData] = useState([]);
  const [expiredPolls, setExpiredPolls] = useState([]);

  useEffect(() => {
    listPole();
  }, []);

  function listPole() {
    axiosPrivate
      .get(API_URL.GET_POLL_LIST)
      .then((response) => {
        console.log(response);
        const data = response.data;
        const activePollsData = data.filter((poll) => poll.Status === 1);
        const expiredPollsData = data.filter((poll) => poll.Status === 0);

        setPollData(activePollsData);
        setExpiredPolls(expiredPollsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", overflowY: "auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ borderBottom: 1, bgcolor: "#dcdcdc", border: "none" }}
      >
        <Tab label="Active polls" {...a11yProps(0)} />
        <Tab label="Expired polls" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Polls pollData={pollData} reload={listPole} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Polls pollData={expiredPolls} reload={listPole} />
      </TabPanel>
    </Box>
  );
}
