import axios from 'axios';
import Stack from '@mui/material/Stack';
import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { FormControl,  Button, Modal, Tooltip, Pagination } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import ToasterGlobal from '../../../../TosterGlobal/ToasterGlobal';
import ListGm from './Listpoint.module.css';
import Swal from 'sweetalert2';
import { axiosPrivate } from '../../../../api/Interceptor/commiteeIntercepters';
import api from "../../../../api/API_URL";
import { visuallyHidden } from "@mui/utils";




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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'ae',
        numeric: false,
        disablePadding: true,
        label: '',
        disableSorting: true,
    },
    {
        id: 'EventName',
        numeric: false,
        disablePadding: true,
        label: 'Event Name',
    },
    {
        id: 'GroupName',
        numeric: false,
        disablePadding: false,
        label: 'Group Name',
    },
    {
        id: 'GameName',
        numeric: false,
        disablePadding: false,
        label: 'Game Name',
    },
    {
        id: 'TotalPoint',
        numeric: true,
        disablePadding: false,
        label: 'Total Point',
    },
    {

        numeric: true,
        disablePadding: false,
        // label: 'Actions',
        disableSorting: true,
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        className={ListGm.textstyle}
                        style={{ backgroundColor: "rgb(46, 95, 137)", color: 'white' }}
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            disabled={headCell.disableSorting}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden} >
                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                               </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  // No toolbar needed for this use case

}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function ListPoint() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('GroupRole');
    const [Report, setReport] = useState('');
    const [selected, setSelected] = useState([]);
    const [dense] = React.useState(false);
    const [rowsPerPage,setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [editopen, setEditopen] = useState(false);
    
    const handleEditClose = () => {
        setReport("");
        setEditopen(false);
    }
    const [nameErr, setNameerror] = useState("");
    const [data, setData] = useState([]);
    const [flag,setflag] = useState(0);
    console.log(flag);

    useEffect(() => {
        getdatafirst()
    }, []);

    useEffect(() => {
        if (!editopen) {
            setNameerror('')

        }

    }, [editopen])
    
    function handleEditOpen(id) {
        setReport("");
        setEditopen(true);
        localStorage.setItem("TotalPointId", id);
    }
    
    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const onEditChanges = e => {
        e.preventDefault();
        let ReportValue = e.target.value
         setReport(e.target.value);

        if (ReportValue === '') {
            setNameerror("Feedback is required");
            setflag(1)
        }
       
        else if (ReportValue.length >= 30 || ReportValue.length <= 3) {
            setNameerror("Please enter the characters between 3 and 30")
            setflag(1)
        }
        else {
            setNameerror(null);
            setflag(1)
            setReport(e.target.value)
        }
    }

 
    const ReportSubmit = (e) => {
        
        if (!Report) {
          setNameerror("Feedback is required");
          return
        }
         if (Report.length >= 30 || Report.length <= 3) {
          setNameerror("Please enter the characters between 3 and 30");
          return
        } 
        if (Report?.trim()?.length === 0) {
          setNameerror("Feedback is required");
          return
        } else {
          setNameerror("");
        }
    
        if (nameErr !== null) {
          return;
        }

        let ReportData = { "Report": Report, "_id": localStorage.getItem("TotalPointId") }
        let TotalId = localStorage.getItem("TotalPointId")
        axiosPrivate.post(api.POST_REPORT_POINT_LIST+`${TotalId}`, ReportData).then((response) => {
            ToasterGlobal("Issue reported successfully!", 25,["success"]);
            handleEditClose();
            setNameerror("");
            setReport("");
        });
    }
   


    const Verify = (id, index) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to confirm this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify it!'
        }).then((response) => {
            if (response.isConfirmed) {
                axiosPrivate.post(api.POST_VERIFY_POINT+`${id}`).then((responses) => {
                    ToasterGlobal("Point verify successfully!", 366,["success"]);

                    const lastData = data.length - 1;
                    const lastDataId = data[lastData]._id;
                    if (index === 0 && lastDataId === id && page !== 1) {
                      setPage(page - 1);
                    }
                    getdatafirst();
                });
            }
        })
    }
    const getdatafirst = () => {
        axiosPrivate.post(api.POST_POINTS_PUBLISHED_TO_COMMITTEE).then((response) => {
            setData(response.data)
        });
    }

    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = JSON.parse(localStorage.getItem("Profile")).Token;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    
    return (
        <>
            <div className={ListGm.card}>
                <Box sx={{ width: '98%' }} justifyContent="center">
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data.length}
                                />
                               <TableBody >
                                    { data?.length > 0
                                     ? stableSort(data, getComparator(order, orderBy))
                                        .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            const GroupList = row?.grouplist[0]
                                            const gameList = row?.gameList[0]
                                            return (
                                                <TableRow
                                                    className={ListGm.listgametablehover}
                                                    hover
                                                    onClick={(event) => handleClick(event, row._id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                >
                                                    <TableCell />
                                                    <TableCell
                                                        align='left'
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row?.Eventlist[0]?.EventName}
                                                    </TableCell>
                                                    <TableCell align='left'>{GroupList?.GroupName}</TableCell>
                                                    <TableCell align='left'>{gameList?.GameName}</TableCell>
                                                    <TableCell align='left'>{row?.TotalPoint}</TableCell>
                                                    <TableCell align='left' sx={{ marginLeft: "-22px" }}>
                                                        <Stack direction="row" spacing={2}>
                                                            <Button color='primary' onClick={() => {
                                                                Verify(row?._id,index)
                                                            }} >Verify</Button>

                                                            <Tooltip title="Report"><ReportIcon color='error' style={{ marginTop: 4 }} onClick={() => handleEditOpen(row?._id)} /></Tooltip>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    : "" }
                                </TableBody>
                            </Table>
                            {(data?.length === 0) && (
                           <img src="/favicon/logo_comittee.png" className={ListGm.imageLogoPoint} alt="Img" width="300" height="300" />
                           )}
                        </TableContainer>
                        {data?.length > 0 ? (
                            <Stack style={{ position: 'absolute', right: 139, marginTop:"-25px" }}>
                                <Pagination sx={{ mt: '55px' }}
                                    siblingCount={0}
                                    count={Math.ceil(data.length / 5)}
                                    rowsPerPage={rowsPerPage}
                                    onChange={handleChange}
                                    onRowsPerPageChange={handleChangeRowsPerPage}

                                     color="primary" />
                            </Stack>
                          )  : (
                            ""
                          )}
                    </Paper>
                </Box>
            </div>
            <Modal open={editopen} onClose={handleEditClose} >
                <Box sx={{
                    borderRadius: "20px",
                    position: 'absolute',
                    top: '51%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <span onClick={handleEditClose} style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '50 %',
                        right: '0 %',
                        padding: '0px 0px',
                        marginLeft: '76%',
                        transform: 'translate(0 %, -50 %)'
                    }}
                    ><CloseIcon /></span>
                    <h5><b>Report</b></h5>
                    <form id='regForm'>
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <textarea rows="4" cols="39" placeholder='Feedback'
                               style={{ border: "solid" ,overflow:"auto",resize:"none"}}
                                type="text" sx={{
                                    width: { sm: 200, md: 200, lg: 480, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 54
                                    }
                                }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='Report' label="Feedback" onChange={(e) => onEditChanges(e)} />
                        </FormControl>
                        {nameErr != null ? <p style={{ color: "red", marginLeft: '20px', marginTop: "-7px", fontSize: "12px" }}>{nameErr}</p> : ''}

                        <div>
                            <Button sx={{ m: 2, width: '17%', height: 35, marginLeft: '75%' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={(e) => ReportSubmit(e)} >Feedback</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}