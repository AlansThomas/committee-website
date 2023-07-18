import React from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventHistoryStyles from "../AllEvents/EventHisory/EventHistory.module.css";
import GroupsStyles from "../Groups/Group/Groups.module.css";
import moment from "moment";

export default function QuatersModal({
  open,
  onClose,
  quater,
  alwin,
  onInputChange,
  formErr,
  handleSubmit,
  onKeyDown,
}) {
  const currentYear = moment().year();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "51%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "20px",
          p: 4,
        }}
      >
        <Typography
          id="spring-modal-title"
          variant="h6"
          component="h3"
          sx={{ textAlign: "left" }}
        >
          Edit quater
          <span
            onClick={onClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50 %",
              right: "3 %",
              padding: "0px 0px",
              marginLeft: "65%",
              transform: "translate(0 %, -50 %)",
            }}
            data-testid="modalclose_btn"
          >
            <CloseIcon className={EventHistoryStyles.eventhistorycloseIcon} />
          </span>
        </Typography>

        <form sx={{ textAlign: "center" }}>
          <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
            <TextField
              type="text"
              sx={{ height: "20%" }}
              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="quaterName"
              onChange={onInputChange}
              label="Quater name"
              defaultValue={alwin?.QuaterName}
            />
          </FormControl>
          <p style={{ color: "red", marginLeft: "10px", marginBottom: 0 }}>
            {formErr?.quaternameErr}
          </p>
          <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
            <TextField
              type="Date"
              onKeyDown={onKeyDown}
              sx={{ height: "20%" }}
              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="startDate"
              onChange={onInputChange}
              label="Start date"
              InputLabelProps={{ shrink: true }}
              defaultValue={moment(alwin?.StartDate).format("YYYY-MM-DD")}
              InputProps={{
                inputProps: {
                  min: moment(new Date()).format("yyyy-MM-DD"),
                  max: `${currentYear}-12-31`,
                },
                title:
                  moment(alwin?.StartDate).isSameOrBefore(moment()) &&
                  "Disabled field: Start date is in the past",
              }}
              disabled={moment(alwin?.StartDate).isSameOrBefore(moment())}
            />
          </FormControl>
          <p style={{ color: "red", marginLeft: "10px", marginBottom: 0 }}>
            {formErr?.quaterSdateErr}
          </p>
          <FormControl fullwidth sx={{ m: 2, width: "93%" }}>
            <TextField
              type="Date"
              onKeyDown={onKeyDown}
              sx={{ height: "20%" }}
              autoComplete="off"
              size="medium"
              id="exampleFormControlInput1"
              name="endDate"
              onChange={onInputChange}
              label="End date"
              InputLabelProps={{ shrink: true }}
              defaultValue={moment(alwin?.EndDate).format("YYYY-MM-DD")}
              InputProps={{
                inputProps: {
                  min: moment(new Date()).format("yyyy-MM-DD"),
                  max: `${currentYear}-12-31`,
                },
              }}
            />
          </FormControl>
          <p style={{ color: "red", marginLeft: "10px", marginBottom: 0 }}>
            {formErr?.quaterEdateErr}
          </p>
          <Button
            sx={{ m: 2, width: "17%", height: 35, marginLeft: "79%" }}
            className={GroupsStyles.submitGroupButton}
            type="submit"
            variant="contained"
            size="small"
            style={{ backgroundColor: "#144399" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
