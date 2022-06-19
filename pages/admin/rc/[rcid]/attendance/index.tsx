import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { Button, IconButton, Popover, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";

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

const buttonstyle = {
  borderRadius: 0,
  color: "black",
  background: "white",
  "&:hover": { backgroundColor: "#cfd4d1" },
};

function Index() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
      renderCell: (cellValues) => (
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Button sx={{ height: 30 }}>
            {cellValues.row.ViewStudentsWiseDetails}
          </Button>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack direction="column">
              <Button sx={buttonstyle}>View Profile</Button>
              <Button sx={buttonstyle}>See History</Button>
              <Button sx={buttonstyle}>Freeze/Unfreeze</Button>
            </Stack>
          </Popover>
        </Stack>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <Meta title="Attendance" />
      <Grid container alignItems="center">
        <h1>Internship 2022-23 Phase 1</h1>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <h2>Manage Attendance</h2>
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
