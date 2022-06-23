import { Box, FormControl, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "900px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  alignItems: "center",
  overflowY: "scroll",
  maxHeight: "100vh",
};
function EventModal() {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [startTime, setStartTime] = React.useState<Date | null>(new Date());
  const [endTime, setEndTime] = React.useState<Date | null>(new Date());

  return (
    <Box sx={boxStyle}>
      <h1 style={{ textAlign: "center" }}>View Event Details</h1>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ padding: { xs: 1, md: 5 }, width: "100%" }}
      >
        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Name</p>
            <TextField disabled id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Name</p>
            <TextField disabled id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Date</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled
                label="Basic example"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Start Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                disabled
                label="Basic example"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event End Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                disabled
                label="Basic example"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Venue</p>
            <TextField disabled id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Description</p>
            <TextField
              disabled
              id="Cname"
              multiline
              minRows={4}
              variant="standard"
            />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Main POC</p>
            <TextField disabled id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>COCO POCs</p>
            <TextField
              disabled
              id="Cname"
              minRows={3}
              multiline
              variant="standard"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventModal;
