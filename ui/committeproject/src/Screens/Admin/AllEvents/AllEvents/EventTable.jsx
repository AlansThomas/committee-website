import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import classes from '../Hover.module.css';
import AllEvenStyles from './AllEvents.module.css';

const EventTable = ({ PointList, page, rowsPerPage, expanded, handleChange, EventClick, gameList }) => {
    console.log("hi", PointList);
    return <div className={AllEvenStyles.alleventcard}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '13%', backgroundColor: 'rgb(155 209 242)', color: 'black' }}>Quarter name</TableCell>
                    <TableCell sx={{ width: '13%', backgroundColor: 'rgb(155 209 242)', color: 'black' }}>Event name</TableCell>
                    <TableCell sx={{ width: '29%', backgroundColor: 'rgb(155 209 242)', color: 'black' }}>Event description</TableCell>
                </TableRow>
            </TableHead>
        </Table>
        <Paper style={{ overflow: 'auto' }} >
            {PointList.length > 0 ? PointList.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <Accordion expanded={expanded === row._id} onChange={handleChange(row._id)} key={row._id} data-testid="accordinBtn_btn"
                    >
                        <AccordionSummary
                            data-testid="accordinBtn_btn1"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id={row._id}
                            onClick={() => EventClick(row._id)}
                            className={classes.accordionHover}

                        >
                            <Typography sx={{ width: '25%', flexShrink: 0 }}>
                                {row?.QuarterId?.QuaterName}
                            </Typography>
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {row.EventName}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', width: '50%', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{
                                __html: row?.EventDescription,
                            }}></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table sx={{ marginTop: '25px' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: 'rgb(198 232 253);', color: 'black' }}>Group name</TableCell>
                                        <TableCell sx={{ backgroundColor: 'rgb(198 232 253);', color: 'black' }}>Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameList?.length > 0 ? gameList.map((rows) => {
                                        return (
                                            <TableRow key={rows._id}>
                                                <TableCell>{rows.grouplist[0].GroupName}</TableCell>
                                                <TableCell>{rows.count}</TableCell>
                                            </TableRow>
                                        );
                                    }) :
                                        <TableRow>
                                            <TableCell><p style={{ textAlign: 'center' }}> No Data Available</p></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                );
            }) : <img src="/favicon/logo_comittee.png" className={AllEvenStyles.AllEventsPageLoding} alt="Committee logo" width="300" height="300" />}
        </Paper>
    </div>;
}

export default EventTable