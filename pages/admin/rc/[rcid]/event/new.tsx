import { Card, FormControl, Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useState } from "react";

import Meta from "@components/Meta";
import useStore from "@store/store";

function Event() {
  const { rcName } = useStore();
  const [date, setDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());

  return (
    <div>
      <Meta title={`New Event - ${rcName}`} />
      <Card
        elevation={5}
        sx={{
          padding: 3,
          width: { xs: "330px", md: "500px", margin: "0px auto" },
        }}
      >
        <Stack spacing={3}>
          <h2>Add Event Details</h2>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Company Name</p>
            <TextField id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Name</p>
            <TextField id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Date</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Start Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Basic example"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event End Time</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Basic example"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Event Venue</p>
            <TextField id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Description</p>
            <TextField id="Cname" multiline minRows={4} variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>Main POC</p>
            <TextField id="Cname" multiline variant="standard" />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <p style={{ fontWeight: 300 }}>COCO POCs</p>
            <TextField id="Cname" minRows={3} multiline variant="standard" />
          </FormControl>
        </Stack>
      </Card>
      <br />
    </div>
  );
}

Event.layout = "adminPhaseDashBoard";
export default Event;
