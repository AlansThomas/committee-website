import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EventPoint from './EventPoint/ListPoint';
import GroupPoint from './GroupPoint/ListGroupPoint';
import { Stack } from '@mui/material';
import stylePoints from './Point.module.css';



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
MainPOint.propTypes = {
    onOpenNav: PropTypes.func,
};
export default function MainPOint() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Box style={{ width: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                </Stack>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={stylePoints.Tab}>
                        <Tab label= "Event Names"  {...a11yProps(1)} className={stylePoints.Eventmain} />
                        {/* <Tab label="Group Names" {...a11yProps(2)} className={stylePoints.Eventmain} /> */}
                    </Tabs>
                </Box>
               
                <TabPanel value={value} index={0} className={stylePoints.tabItem} >
                    <EventPoint />
                </TabPanel>
                <TabPanel value={value} index={1} className={stylePoints.tabItem} >
                    <GroupPoint />
                </TabPanel>
            </Box>

        </>
    );

}