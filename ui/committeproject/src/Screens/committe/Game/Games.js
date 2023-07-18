import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { MenuItem, Modal, Box } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import ToasterGlobal from '../../../TosterGlobal/ToasterGlobal';
import clsstyle from './Game.module.css';
import { axiosPrivate } from '../../../api/Interceptor/commiteeIntercepters'
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../api/API_URL"


const useStyles = makeStyles(theme => ({
    menuPaper: {
        maxHeight: 300
    }
}));


const Games = ({ handleCloseModals, openModals, reload }) => {

    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')
    const [eventid, setEventId] = useState('')
    const [data, setData] = useState([]);
    const [value, setValue] = useState(null);
    const [nameerr, setNameError] = useState(" ");
    const [descErr, setDescerror] = useState(" ");
    const [fileError, setFileError] = useState(" ");
    const [filelength, setfilelength] = useState(0);
    const [startdateErr, setStartDateerror] = useState("");
    const [eventErr, setEventErr] = useState("");
    const classes = useStyles();
    const [startDDate, setstartDate] = useState(moment(new Date()).format('yyyy-MM-DD'))
    const [endDDate, setendDate] = useState(moment(new Date()).format('yyyy-MM-DD'))
    const [EventIdValues, setEventIdValues] = useState();
    const [enddateErr, setendDateerror] = useState(" ");
    const [disabled, setDisabled] = useState(false);
    const [endDateValError, setEndDateValError] = useState(null);


    useEffect(() => {
        axiosPrivate.get(api.GET_ALL_EVENT).then((response) => {
            setData(response.data);

        });

    }, []);

    useEffect(() => {
        const storedValue = window.localStorage.getItem("Profile");

        const pasedValue = JSON.parse(storedValue);
        setValue(pasedValue.data._id);
        // ).format('yyyy-MM-dd'))
    }, []);

    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = JSON.parse(localStorage.getItem("Profile")).Token;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );


    function handleSubmit(event) {
     
        event.preventDefault()
        const formData = new FormData();
        formData.append('RulesPdf', file);
        formData.append('GameName', name);
        formData.append('GameDesc', description);
        formData.append('StartDate', startDate);
        formData.append('EndDate', endDate);
        formData.append('UserId', value);
        formData.append('EventId', EventIdValues);
        

        if (name.trim().length === 0) {
            setNameError('Name is required')
           
        }
        if (description.trim().length === 0) {
            setDescerror('Description is required')
            
        }
        if (startDate === '') {
            setStartDateerror('Start Date is required')
            
        }

        if (endDate === '') {
            setendDateerror('End Date is required')
            
        }

        if (filelength === 0) {
            setFileError('File is required')
        

        }
        if (eventid === '') {
            setEventErr('Please select event name')
            
        }

        if (nameerr !== null || descErr != null || startdateErr !== null || enddateErr !== null || fileError != null || eventErr != null) {
            return;
        }

    
        try {
            setDisabled(true);  
            axiosPrivate
                .post(api.POST_CREATE_GAME, formData)
                .then((res) => {
                    reload();
                    ToasterGlobal("Game added successfully!", 1,["success"]);

                    handleCloseModals();

                })
                .catch((err) => {
                    ToasterGlobal("Unsuccessful", 2,["warning"]);

                });

        }
        catch (error) {
        }
    }
   
    const handleEventChange = event => {
        event.preventDefault();
        let eventname = event.target.value._id
        if (eventname.trim() === "") {
            setEventErr("Event name is required")
            setEventIdValues(0)
        }
        else {

            setEventErr(null)
            setEventId(event.target.value);
            setEventIdValues(event.target.value?._id)        
            setstartDate(moment(event.target.value?.StartDate).format('yyyy-MM-DD'))
            setendDate(moment(event.target.value?.EndDate).format('yyyy-MM-DD'))
        }
    }

    const onInputNameChange = e => {
        e.preventDefault();
        let gamename = e.target.value
        let nameCheck = new RegExp(/^[0-9a-zA-Z. ]+$/).test(gamename);

        if (gamename === '') {
            setNameError("Name is required");
        } else if (!gamename.trim()) {
            setNameError('Name is required')
        }

        else if (!nameCheck) {
            setNameError('Please enter valid name')
        }
        else if (gamename.length >= 30 || gamename.length <= 1) {
            setNameError("Please enter the name between 1 and 30")
        }
        else {
            setNameError(null);
            setName(e.target.value)
        }
    }

    const onInputGameDescChange = e => {

        e.preventDefault();
        let descName = e.target.value

        if (descName === '') {
            setDescerror("Description is required");
            
        } else if (!descName.trim()) {
            setDescerror('Please Enter valid Description')
        }

        else if (descName.length >= 250 || descName.length <= 1) {
            setDescerror("Please enter the characters between 1 and 250")
        }
        else {
            setDescerror(null);
            setDescription(e.target.value)
        }
    }

    const onStartDateChange = (e) => {
        e.preventDefault();

        let newstartDate = e.target.value

        if (newstartDate === "") {
            setStartDateerror("startDate is required");
            setStartDate(e.target.value)
            
        }
         else {
            setStartDateerror(null);
            setStartDate(e.target.value)
        }
        if (newstartDate && moment(endDate).isBefore(newstartDate)) {
            setEndDateValError("End date is before start date");
            setStartDate(e.target.value)
            
        } else {
            // End date is valid, clear error message
            setStartDateerror(null);
            setEndDateValError(null);
            setStartDate(e.target.value)
        }
    }

    const onEndDateChange = (event) => {
        // Set end date

        let newEndDate = event.target.value;
        if (newEndDate === "") {
            setendDateerror("End date is required");
          } 
        // Validate end date
      else  if (startDate && moment(newEndDate).isBefore(startDate)) {
            // End date is before start date, show error message
            setEndDateValError("End date must be after start date");
            setendDateerror(null);
            setEndDate(event.target.value)
            
        } else {
            // End date is valid, clear error message
            setendDateerror(null);
            setEndDateValError(null);
            setEndDate(event.target.value)
            
        }
    };

    function handleChanges(event) {
        const fileType = event.target.files[0].type;
        const fileSize = event.target.files[0].size / 1024 / 1024;

        if (fileType === 'application/pdf' || fileType === 'text/plain' || fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
            if (fileSize > 5) {
                setFileError("file size should be less than 5MB")
            }
            else {
                setFile(event.target.files[0])
                setfilelength(event.target.files.length);
                setFileError(null);
            }
        }
        else {
            setFileError('Files only support pdf,doc,docx,txt and image format');
        }
    }
    

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    

    return (
        <div>
            <Modal
                open={openModals} onClose={handleCloseModals}
                center
                >
                <Box sx={{
                    position: 'absolute',
                    top: '51%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: '20px',
                    boxShadow: 24,
                    paddingLeft: "30px",
                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                    minWidth: '500px',
                    minHeight: '700px',
                    maxWidth: '500px',
                    maxHeight: '800px',
                    p: 4,

                }}>
                    <div>
                        <span onClick={handleCloseModals} style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '50 %',
                            right: '0 %',
                            padding: '0px 0px',
                            marginLeft: '76%',
                            transform: 'translate(0 %, -50 %)'
                        }}
                        ><CloseIcon style={{ marginTop: "14px", color: "white" }} /></span>
                        <div className={clsstyle.texttype} ><h5 style={{ padding: "13px", color: "white" }}><b>Create Game</b></h5></div>
                    </div>
                    <form sx={{ textAlign: 'center', }}>
                        <FormControl fullWidth sx={{ m: 2 }} >
                            <InputLabel id="demo-simple-select-label" style={{ height: "28px" }} >Event Name</InputLabel>
                            <Select labelId="demo-simple-select-label"
                                label="EVent Name"
                                sx={{

                                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 50,

                                    },

                                }}
                                value={eventid}
                                onChange={handleEventChange}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                               >   
                                {data.length !== 0 ? data.map(event => {
                                    return (
                                        <MenuItem key={data.id} value={event}>
                                            {event.EventName}
                                        </MenuItem>

                                    )
                                }) : <div>No data AVailable</div>}
                               
                            </Select>
                            {eventErr != null ? <p style={{ color: "red", marginLeft: '9px', fontSize: "12px" }}>{eventErr}</p> : ''}
                        </FormControl>
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="text" sx={{
                                width: { sm: 400, md: 400, lg: 400, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 54
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='GameName' onChange={(e) => onInputNameChange(e)}
                                label="Game Name" />
                        </FormControl>
                        {nameerr != null ? <p style={{ color: "red", marginLeft: '20px', marginTop: "-7px", fontSize: "12px" }}>{nameerr}</p> : ''}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="text" sx={{
                                width: { sm: 400, md: 400, lg: 400, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 54
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='GameDesc' onChange={(e) => onInputGameDescChange(e)} label="Game Description" />
                        </FormControl>
                        {descErr != null ? <p style={{ color: "red", marginLeft: '20px', marginTop: "-7px", fontSize: "12px" }}>{descErr}</p> : ''}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="Date"
                                onKeyDown={onKeyDown}
                                sx={{
                                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 54
                                    }
                                }}
                                InputProps={{ inputProps: { min: startDDate } }}
                                autoComplete="off" 
                                size="small"
                                id="exampleFormControlInput1" name='Date'
                                onChange={(e) => onStartDateChange(e)}
                                label="StartDate"
                                InputLabelProps={{ shrink: true }} />
                        </FormControl>
                        {startdateErr != null ? <p style={{ color: "red", marginLeft: '20px', marginTop: "-7px", fontSize: "12px" }}>{startdateErr}</p> : ''}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="Date"
                                onKeyDown={onKeyDown}
                                sx={{
                                    width: { sm: 400, md: 400, lg: 400, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 54
                                    }
                                }}
                                InputProps={{ inputProps: { max: endDDate } }}
                                autoComplete="off"
                                size="small"
                                id="exampleFormControlInput1"
                                name='Date'
                                onChange={(e) => onEndDateChange(e)}
                                label="EndDate"
                                InputLabelProps={{ shrink: true }} />
                        </FormControl>
                        {enddateErr != null ? <p style={{ color: "red", marginLeft: '20px', marginTop: "-7px", fontSize: "12px" }}>{enddateErr}</p> : ''}
                        {endDateValError != null ? (
              <p
                style={{
                  color: "red",
                  marginLeft: '20px', marginTop: "-7px", fontSize: "12px"
                }}
              >
                {endDateValError}
              </p>
            ) : (
              ""
            )}
                        <input type="file" name="File" id="fileInput" onChange={handleChanges} style={{ marginLeft: "15px",maxWidth:"300px"}} />
                        {fileError != null ? <p style={{ color: "red", marginLeft: '20px', fontSize: "12px" }}>{fileError}</p> : ''}
                        <Button className={clsstyle.submitbtns} sx={{ m: 2, width: '20%', height: 35, marginLeft: '50%' }} type='button' variant='contained' size="small" onClick={handleSubmit} disabled={disabled}>Submit</Button>
                        
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Games