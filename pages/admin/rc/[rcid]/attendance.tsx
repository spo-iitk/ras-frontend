import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "@styles/adminPhase.module.css";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InactiveButton from "@components/Buttons/InactiveButton";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "CompanyName",
    headerName: "Company Name",
    width: 200,
  },
  {
    field: "EventName",
    headerName: "Event Name",
    width: 200,
  },
  {
    field: "StartTime",
    headerName: "Start Time",
    width: 200,
  },
  {
    field: "EndTime",
    headerName: "End Time",
    width: 200,
  },
  {
    field: "Venue",
    headerName: "Venue",
    width: 200,
  },
  {
    field: "ViewStudentsWiseDetails",
    headerName: "View Students' wise details",
    width: 300,
    renderCell: (cellValues) => {
      if (cellValues.row.ViewStudentsWiseDetails === "CLICK HERE")
        return (
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <ActiveButton sx={{ height: 30 }}>
              {cellValues.row.ViewStudentsWiseDetails}
            </ActiveButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        );
      return (
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <InactiveButton sx={{ height: 30 }}>
            {cellValues.row.ViewStudentsWiseDetails}
          </InactiveButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    CompanyName: "Company 1",
    EventName: "PPT",
    StartTime: "11:AM 12/03/2022",
    EndTime: "11:AM 12/03/2022",
    Venue: "L-20",
    ViewStudentsWiseDetails: "CLICK HERE",
  },
  {
    id: 2,
    CompanyName: "Company 2",
    EventName: "Test",
    StartTime: "11:AM 12/03/2022",
    EndTime: "11:AM 12/03/2022",
    Venue: "NCL",
    ViewStudentsWiseDetails: "ATTENDANCE IS DISABLED",
  },
];

function Index() {
  return (
    <div className={styles.container}>
      <Meta title="Attendance" />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1>Manage Attendance</h1>
            <Stack direction="row" spacing={3}>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridAttendance}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Grid>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
