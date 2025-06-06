import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

import { Event } from "@callbacks/admin/rc/overview";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import useStore from "@store/store";
import eventsRequest from "@callbacks/student/rc/events";
import calendarLinks from "@components/Utils/calendarUtils";
import { errorNotification } from "@callbacks/notifcation";
import {  parse } from 'date-fns';
const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "company_name",
    headerName: "Company Name",
  },
  {
    field: "role",
    headerName: "Role",
    hide: true,
  },
  {
    field: "profile",
    headerName: "Profile",
  },
  {
    field: "name",
    headerName: "Event Name",
  },
  {
    field: "CreatedAt",
    headerName: "Created At",
    renderCell: (params) =>
      new Date(params.row.CreatedAt).toLocaleDateString("en-GB"),
    hide: true,
  },
  {
    field: "UpdatedAt",
    headerName: "Updated At",
    renderCell: (params) =>
      new Date(params.row.UpdatedAt).toLocaleDateString("en-GB"),
    hide: true,
  },
  {
    field: "duration",
    headerName: "Event Duration",
  },
  {
    field: "start_time",
    headerName: "Start Time",
    renderCell: (params) =>
      new Date(params.row.start_time).toLocaleTimeString(),
  },
  {
    field: "View Details",
    renderCell: (params) => (
      <Button
        href={`/student/rc/${params.row.recruitment_cycle_id}/events/${params.row.ID}`}
        variant="contained"
        style={{ width: "100%" }}
      >
        View Details
      </Button>
    ),
  },
];
const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

function Calendar() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [activity, setActivity] = useState<Event[]>([]);
  const [rows, setRows] = useState<Event[]>([]);

  const [events, setEvents] = useState<Event[]>([]);

  const router = useRouter();
  const { rcid } = router.query;
  const rid = rcid as string;

  const { token } = useStore();

  const handleClick = () => {
    if (calendarLinks.get(rid) !== undefined) {
      window.open(calendarLinks.get(rid) as string, "_blank");
    } else {
      errorNotification("Error", "Calendar link not found");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        let response = await eventsRequest.getAll(token, rid);
        response = response.map((e) => ({
          ...e,
          recruitment_cycle_id: rid,
          start_time: Number(e.start_time), 
  end_time: Number(e.end_time),
        }));
        setEvents(response);
      }
    };
    if (router.isReady) fetchData();
  }, [rid, router.isReady, token]);

useEffect(() => {
  const filtered = events.filter((e, i) => {
    const eventDate = new Date(e.start_time);
    const match = isSameDay(eventDate, value as Date);
 return match;
  });
  setActivity(filtered);
  setRows(filtered);
}, [value, events]);

  return (
    <div>
      <h2>Calendar</h2>
      <Meta title="RC - Events - Calendar" />
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item xs={12} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker<Date>
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
                const d = newValue?.toDateString();
                setActivity(
                  events.filter(
                    (e) => new Date(e.start_time).toDateString() === d
                  )
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            style={{ width: "100%" }}
            onClick={handleClick}
          >
            Import Google Calendar
          </Button>
        </Grid>
        <Grid item xs={12} lg={8}>
          {activity.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.ID}
              heighted
            />
          ) : (
            <h2>No event scheduld</h2>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
Calendar.layout = "studentPhaseDashboard";
export default Calendar;
