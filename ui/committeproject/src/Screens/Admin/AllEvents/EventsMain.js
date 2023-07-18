import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllEvents from './AllEvents/AllEvents';
import History from './History/History';
import { Stack } from '@mui/material';
import classes from './Hover.module.css';
import CurrentEvents from './AllEvents/CurrentEvents';



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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
EventsMain.propTypes = {
    onOpenNav: PropTypes.func,
};
export default function EventsMain() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Box style={{ width: '85%',marginBottom: "120px" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                </Stack>
                <Box >
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.Tab}>
                        <Tab label="History" {...a11yProps(0)} className={classes.EventMain} />
                        <Tab label="All Events" {...a11yProps(1)} className={classes.EventMain} />
                        <Tab label="Current Events" {...a11yProps(2)} className={classes.EventMain} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} className={classes.tabItem} >
                    <History />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabItem} >
                    <AllEvents />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabItem} >
                    <CurrentEvents />
                </TabPanel>
            </Box>

        </>
    );

}