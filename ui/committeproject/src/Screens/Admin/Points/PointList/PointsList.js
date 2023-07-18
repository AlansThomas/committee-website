import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import EventHistory from "../../AllEvents/EventHisory/EventHistory";
import GroupPoints from "../GroupPoints/Grouppoints";
import PendingList from "../PendingAndReported/PendingList";
import Reported from "../PendingAndReported/Reported";
import PointListcss from "./PointList.module.css";

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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
PointsList.propTypes = {
  onOpenNav: PropTypes.func,
};
export default function PointsList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box style={{ width: "85%", marginBottom: "120px" }}>
        <Stack
          data-testid="point-list-page"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        ></Stack>
        <Box>
          <Tabs
            data-testId="point-Tab"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={PointListcss.Tab}
          >
            <Tab
              label="Event wise points"
              {...a11yProps(0)}
              className={PointListcss.EventMain}
            />
            <Tab
              label="Group wise points"
              {...a11yProps(1)}
              className={PointListcss.EventMain}
            />
            <Tab
              label="Pending"
              {...a11yProps(2)}
              className={PointListcss.EventMain}
            />
            <Tab
              label="Reported"
              {...a11yProps(3)}
              className={PointListcss.EventMain}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className={PointListcss.tabItem}>
          <EventHistory />
        </TabPanel>
        <TabPanel value={value} index={1} className={PointListcss.tabItem}>
          <GroupPoints />
        </TabPanel>
        <TabPanel value={value} index={2} className={PointListcss.tabItem}>
          <PendingList />
        </TabPanel>
        <TabPanel value={value} index={3} className={PointListcss.tabItem}>
          <Reported />
        </TabPanel>
      </Box>
    </>
  );
}
