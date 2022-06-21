import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Card, Grid, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";

import DataGrid from "@components/DataGrid";
import styles from "@styles/studentInternPhase.module.css";
import Meta from "@components/Meta";
import EventModal from "@components/Modals/EventModal";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "eventName",
    headerName: "Event Name",
    width: 400,
  },
  {
    field: "eventStartTime",
    headerName: "Start Time",
    width: 100,
  },
  {
    field: "eventEndTime",
    headerName: "End Time",
    width: 100,
  },
  {
    field: "eventLocation",
    headerName: "Location",
    width: 200,
  },
];

type Events = {
  id: string;
  companyName: string;
  eventName: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventDescription: string;
  contact: string;
};

const events: Events[] = [
  {
    id: "1",
    companyName: "Google",
    eventName: "Google Summer of Code",
    eventDate: new Date(2022, 4, 29),
    eventStartTime: "9:00 AM",
    eventEndTime: "5:00 PM",
    eventLocation: "Google Headquarters",
    eventDescription:
      "Google Summer of Code is a program for students to learn about Google's software development process and to apply their skills to the real world. Students will work on a variety of projects, including web and mobile apps, games, and other software. The program is open to all students in the United States.",
    contact: "https://www.google.com/summerofcode/",
  },
  {
    id: "3",
    companyName: "Julia",
    eventName: "Julia Summer of Code",
    eventDate: new Date(2022, 4, 29),
    eventStartTime: "9:00 AM",
    eventEndTime: "5:00 PM",
    eventLocation: "Google Headquarters",
    eventDescription:
      "Google Summer of Code is a program for students to learn about Google's software development process and to apply their skills to the real world. Students will work on a variety of projects, including web and mobile apps, games, and other software. The program is open to all students in the United States.",
    contact: "https://www.google.com/summerofcode/",
  },
  {
    id: "2",
    companyName: "Apple",
    eventName: "Apple Conf",
    eventDate: new Date(2022, 4, 30),
    eventStartTime: "9:00 AM",
    eventEndTime: "5:00 PM",
    eventLocation: "Apple Headquarters",
    eventDescription: "Conference o Apple products",
    contact: "https://www.google.com/summerofcode/",
  },
];

function Calendar() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [activity, setActivity] = React.useState<Events[]>([]);
  const [rows, setRows] = React.useState<Events[]>([]);
  const [, setAct] = React.useState<Events>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setActivity(
      events.filter((e) => e.eventDate.toDateString() === value?.toDateString())
    );
    setRows(
      events.filter((e) => e.eventDate.toDateString() === value?.toDateString())
    );
  }, [value]);
  return (
    <div className={styles.container}>
      <h1>Calender</h1>
      <Meta title="Calendar - Intern Season" />
      <Card>
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} wi>
              <StaticDatePicker<Date>
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  const d = newValue?.toDateString();
                  setActivity(
                    events.filter((e) => e.eventDate.toDateString() === d)
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ padding: "0px 15px" }}>
              <Stack alignItems="flex-start" justifyContent="flex-start">
                {activity.length > 0 ? (
                  <div
                    style={{ height: 300, margin: "0px auto" }}
                    className={styles.datagridEvents}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      onCellClick={(e) => {
                        handleOpen();
                        setAct(activity.find((a) => a.id === e.row.id));
                      }}
                    />
                    <div>
                      <Modal open={open} onClose={handleClose}>
                        <EventModal />
                      </Modal>
                    </div>
                  </div>
                ) : (
                  <h2>No event scheduled</h2>
                )}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
Calendar.layout = "studentPhaseDashboard";
export default Calendar;
