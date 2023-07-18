
import { Card } from '@material-ui/core';
import { Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import  React,{ useEffect, useState } from 'react';
import Scrollbar from '../../../../components/scrollbar';
import api from "../../../../api/API_URL";
import { axiosPrivate } from '../../../../api/Interceptor/intercepter';
import pointTableStyles from './pointTableInn.module.css';

const TABLE_HEAD = [
    { id: "dummy1", label: "", alignRight: false, },
    { id: "role", label: "Groups", alignRight: false },
    { id: "dummy3", label: "Points", alignRight: false },
];

export default function PointTableGroups() {
    const [points, setPoints] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [page, setPage] = useState(1);
    const pageCount = points.length <= 8 ? 1 : Math.ceil(points.length / 8);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        axiosPrivate.get(api.GET_PUBLISHED_POINT).then((response) => {
            
            setPoints(response?.data)
        });
    }, [])

    return (
        <Card >
            <Scrollbar>
                <TableContainer sx={{ minWidth: 200, maxWidth: 1600 }}>
                    <Table >
                    <TableRow>
                  {TABLE_HEAD.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: 'white', backgroundColor: '#060660',fontSize:'0.875rem',fontWeight:'600'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
                        <TableBody className={pointTableStyles.tableContent}>
                            {points.length > 0 ?
                                points
                                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)?.map((row, index) => {
                                        return (
                                            <TableRow key={row} className={pointTableStyles.tableItems}>
                                                <TableCell></TableCell>
                                                <TableCell>{row?.grouplist[0]?.GroupName}
                                                </TableCell>
                                                <TableCell>{row.TotalPoint}</TableCell>
                                            </TableRow>
                                        );
                                    }) : <TableRow>
                                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
                                        No data available
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
            <div style={{ display: 'grid', justifyContent: 'end' }}>
            {points?.length > 8 ?
                 <Stack spacing={2} style={{ position: 'relative', right: "16%", marginTop: "1%" }}>
                    <Pagination
                        siblingCount={0}
                        count={pageCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        color="primary" />
                </Stack>
                : ''}
                </div>
        </Card>

    )
}